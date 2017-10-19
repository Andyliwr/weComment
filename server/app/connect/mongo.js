let config = require('../../config')
let mongoose = require("mongoose")

exports.connect = function (request, response) {
  mongoose.connect(config.mongodb_url, { useMongoClient: true }) // useMongoClient防止报错
  let db = mongoose.connection
  db.on('error', console.error.bind(console, 'Database connected error:'))
  db.once('open', function (callback) {
    console.log('Database conneted success!')
  });
}