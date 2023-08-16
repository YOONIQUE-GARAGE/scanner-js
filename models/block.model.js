const mongoose = require("mongoose");
const { Schema } = mongoose;

const BlockSchema = new Schema({
  blockNumber: Number,
  miner: String,
  blockSize: Number,
  gasUsed: Number,
  gasLimit: Number,
  baseFeePerGas: Number,
  burntFees: Number,
  extraData: String,
  blockHash: String,
  stateRoot: String,
  transactions: { type: [String], default: [] },
});

module.exports = {
  BlockModel: mongoose.model("Block", BlockSchema, "block"),
};
