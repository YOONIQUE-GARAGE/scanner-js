require("dotenv").config();
const mongoose = require("mongoose");

module.exports = () => {
  const connect = () => {
    mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });
  };
  connect();
  mongoose.connection.on("connected", () => {
    logger.debug("Connected to MongoDB");
  });
  mongoose.connection.on("disconnected", () => {
    logger.warn("Disconnected to MongoDB");
    connect();
  });
  mongoose.connection.on("reconnected", () => {
    logger.debug("Reconnected to MongoDB");
  });
  mongoose.connection.on("reconnectFailed", () => {
    logger.warn("reconnectFailed to MongoDB");
  });
};
