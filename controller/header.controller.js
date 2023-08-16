const HeadererService = require("../services/header.service");

exports.header_insert = async (header) => {
  try {
    const isOk = await HeadererService.insertHeader(header);
    logger.debug("HeadererService: ", isOk);
    return isOk ? "insert header success" : "insert header fail";
  } catch (e) {
    logger.debug("HeadererService: ", e);
    return e;
  }
};
