require('dotenv').config()
const mongodb = require('./db/mongodb')
const { Web3 } = require('web3')
const logger = require('./logger/logger')
const HeaderCtrl = require('./controller/header.controller')
const BlockModelCtrl = require('./controller/block.controller')
const TransactionCtrl = require('./controller/transaction.controller')
const { getLatestBlockNumber } = require('./services/block.service')
const blockModel = require('./models/block.model')

const web3 = new Web3(
  new Web3.providers.WebsocketProvider(
    `wss://${process.env.ETHEREUM_NETWORK}.infura.io/ws/v3/${process.env.INFURA_API_KEY}`,
  ),
)
global.web3 = web3
global.logger = logger

// blcokHedaer 구독
async function getBlocks() {
  try {
    const newBlocksSubscription = await web3.eth.subscribe('newBlockHeaders')

    newBlocksSubscription.on('data', async (blockheader) => {
      let latestBlockNumber = blockheader.number
      let latestBlockNumberDB = await BlockModelCtrl.block_select()
      if (latestBlockNumber > latestBlockNumberDB) {
        for (let i = latestBlockNumberDB + 1; i <= latestBlockNumber; i++) {
          let blockDetail = await getBlockDetails(i)
          await TransactionCtrl.txs_insert(blockDetail)
            .then(HeaderCtrl.header_insert(blockheader))
            .then(BlockModelCtrl.block_insert(blockDetail))
        }
        // DB에 저장된 블록넘버를 최신 블록 넘버로 저장
        latestBlockNumberDB = latestBlockNumber
      }
    })
  } catch (subscriptionError) {
    logger.error('Error when setting up subscription:', subscriptionError)
  }
}
// block & txs detail
async function getBlockDetails(blockNumber) {
  try {
    const block = await web3.eth.getBlock(blockNumber, true)
    if (block) {
      return block
    } else {
      return {}
    }
  } catch (error) {
    logger.error('Error:', error)
  }
}

function main() {
  logger.debug('>>>> daemon start')
  mongodb()
  getBlocks()
}

main()
