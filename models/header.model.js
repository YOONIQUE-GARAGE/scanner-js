const mongoose = require("mongoose");
const { Schema } = mongoose;

const HeaderSchema = new Schema({
  blockNumber: Number,
  ParentHash: String,
  bloom: String,
  time: { type: Date, default: Date.now },
  nonce: String,
});

module.exports = {
  HeaderModel: mongoose.model("Header", HeaderSchema, "header"),
};
