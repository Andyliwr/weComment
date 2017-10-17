let dbName = "weComment"
let dbHost = "mongodb://lidikang:123456@localhost:27017/wecomment"
let mongoose = require("mongoose")
exports.connect = function (request, response) {
  mongoose.connect(dbHost + dbName, { useMongoClient: true }) // useMongoClient防止报错
  let db = mongoose.connection
  db.on('error', console.error.bind(console, 'Database connected error:'))
  db.once('open', function (callback) {
    console.log('Database conneted success!')
  });
}