const { HeaderModel } = require("../models/index");

// insertHeader
const insertHeader = async (header) => {
  const { number, parentHash, logsBloom, timestamp, nonce } = header;
  try {
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
    const Header = new HeaderModel({
      blockNumber: Number(number),
      parentHash,
      bloom: logsBloom,
      time: blockTime,
      nonce,
    });
    return await Header.save();
  } catch (e) {
    logger.debug("headerService error: ", e);
    throw Error(e);
  }
};

module.exports = {
  insertHeader,
};
