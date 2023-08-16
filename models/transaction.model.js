const mongoose = require("mongoose");
const { Schema } = mongoose;

const TransactionSchema = new Schema({
  hash: String,
  status: String,
  time: { type: Date, default: Date.now },
  from: String,
  to: String,
  value: Number,
  transactionFee: Number,
  gasPrice: Number,
  gasUsed: Number,
  blockHash: String,
  blockNumber: Number,
});

module.exports = {
  TransactionModel: mongoose.model(
    "Transaction",
    TransactionSchema,
    "transaction"
  ),
};
