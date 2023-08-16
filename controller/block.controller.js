const BlockService = require("../services/block.service");

exports.block_insert = async (blockDetail) => {
  try {
    const isOk = await BlockService.insertBlock(blockDetail);
    logger.debug("BlockService: ", isOk);
    return isOk ? "insert block success" : "insert block fail";
  } catch (e) {
    logger.debug("BlockService: ", e);
    return e;
  }
};
