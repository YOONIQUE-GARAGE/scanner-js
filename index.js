require('dotenv').config()
const mongodb = require('./db/mongodb')
const { Web3 } = require('web3')
const logger = require('./logger/logger')
const HeaderCtrl = require('./controller/header.controller')
const BlockModelCtrl = require('./controller/block.controller')
const TransactionCtrl = require('./controller/transaction.controller')

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
      console.log(blockheader)
      const blockDetail = await getBlockDetails(blockheader.number)
      if (blockDetail != {}) {
        await TransactionCtrl.txs_insert(blockDetail)
          .then(HeaderCtrl.header_insert(blockheader))
          .then(BlockModelCtrl.block_insert(blockDetail))
      }
    })
  } catch (subscriptionError) {
    logger.error('Error when setting up subscription:', subscriptionError)
  }
}
// block & txs detail
async function getBlockDetails(blockIdentifier) {
  try {
    const block = await web3.eth.getBlock(blockIdentifier, true)
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
