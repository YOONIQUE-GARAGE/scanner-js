const mongoose = require('mongoose')
const { Schema } = mongoose

const HeaderSchema = new Schema({
  blockNumber: Number,
  parentHash: String,
  bloom: String,
  time: { type: String, default: String(Date.now) },
  nonce: String,
})

module.exports = {
  HeaderModel: mongoose.model('Header', HeaderSchema, 'header'),
}
