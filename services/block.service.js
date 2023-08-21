const { BlockModel } = require('../models/index')

// insertBlock
const insertBlock = async (blockDetail) => {
  try {
    const {
      number,
      miner,
      size,
      gasUsed,
      gasLimit,
      baseFeePerGas,
      extraData,
      hash,
      stateRoot,
      transactions,
    } = blockDetail

    // Check if a block with the same blockNumber exists
    const existingBlock = await BlockModel.findOne({
      blockNumber: Number(number),
    })

    if (existingBlock) {
      return 'Block with the same blockNumber already exists' // or handle it as needed
    }

    let burntFees = BigInt(baseFeePerGas) * BigInt(gasUsed)
    let txHashArr = []
    for (const tx of Object.values(transactions)) {
      txHashArr.push(tx.hash)
    }
    const Block = new BlockModel({
      blockNumber: Number(number),
      miner,
      blockSize: Number(size),
      gasUsed: Number(gasUsed),
      gasLimit: Number(gasLimit),
      baseFeePerGas: Number(baseFeePerGas),
      burntFees: Number(burntFees),
      extraData,
      blockHash: hash,
      stateRoot,
      transactions: txHashArr,
    })
    await Block.save()
    return 'Insert Block Success'
  } catch (e) {
    logger.debug('blockService error: ', e)
    throw Error(e)
  }
}

const getLatestBlockNumber = async () => {
  try {
    const latestBlock = await BlockModel.findOne()
      .sort({ blockNumber: -1 })
      .limit(1)
    if (latestBlock) {
      return latestBlock.blockNumber
    } else {
      return null // No blocks found in the database
    }
  } catch (e) {
    logger.debug('getLatestBlockNumber error: ', e)
    throw Error(e)
  }
}

module.exports = {
  insertBlock,
  getLatestBlockNumber,
}
