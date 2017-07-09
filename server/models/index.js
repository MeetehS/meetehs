const mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose.connect('mongodb://127.0.0.1:27017/meetehs', {
  useMongoClient: true,
}, err => {
  if (err) {
    console.error(`connect to DB meetehs error: ${err.message}`)
    process.exit(1)
  } else {
    console.log('connect to DB meetehs success')
  }
})

exports.Post = require('./Post')
