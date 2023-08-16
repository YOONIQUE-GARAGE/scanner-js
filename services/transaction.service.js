const { TransactionModel } = require("../models/index");

// insertAlbum
const insertTxs = async (blockDetail) => {
  const { transactions, timestamp } = blockDetail;
  const date = new Date(Number(timestamp) * 1000);
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };
  const blockTime = new Intl.DateTimeFormat("en-US", options).format(date);
  try {
    for (let tx of transactions) {
      const {
        hash,
        from,
        to,
        gasPrice,
        maxFeePerGas,
        gas,
        value,
        blockHash,
        blockNumber,
      } = tx;

      const receipt = await web3.eth.getTransactionReceipt(hash);
      let status;
      if (Number(receipt.status) == 1) {
        status = "success"; // 1 for success, 0 for failure
      } else {
        status = "fail";
      }

      const transactionFee = maxFeePerGas * gas;
      const Transaction = new TransactionModel({
        hash,
        status,
        time: blockTime,
        from,
        to,
        value: Number(value),
        transactionFee: Number(transactionFee),
        gasPrice: Number(gasPrice),
        gasUsed: Number(receipt.gasUsed.toString()),
        blockHash,
        blockNumber: Number(blockNumber),
      });
      return await Transaction.save();
    }
  } catch (e) {
    logger.debug("transactionService error: ", e);
    throw Error(e);
  }
};

module.exports = {
  insertTxs,
};
