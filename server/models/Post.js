const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  content: { type: String, required: true },
  modified: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Posts', schema)
