const TransactionService = require("../services/transaction.service");

exports.txs_insert = async (blockDetail) => {
  try {
    const isOk = await TransactionService.insertTxs(blockDetail);
    logger.debug("TransactionService: ", isOk);
    return isOk ? "insert transaction success" : "insert transaction fail";
  } catch (e) {
    logger.debug("TransactionService: ", e);
    return e;
  }
};
