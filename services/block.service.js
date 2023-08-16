const { BlockModel } = require("../models/index");

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
    } = blockDetail;
    const burntFees = baseFeePerGas * gasUsed;
    let txHashArr = [];
    for (tx of transactions) {
      txHashArr.push(tx.hash);
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
    });
    return await Block.save();
  } catch (e) {
    logger.debug("blockService error: ", e);
    throw Error(e);
  }
};

module.exports = {
  insertBlock,
};
