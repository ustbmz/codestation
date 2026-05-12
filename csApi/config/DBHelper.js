/**
 * 该文件负责连接数据库
 */

const mongoose = require('mongoose')

const dbURI =
  process.env.MONGODB_URI ||
  'mongodb://code:IamMZ0129***@127.0.0.1:27017/coderstation'

mongoose.connect(dbURI, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
})

mongoose.connection.on('connected', () => {
  console.log('🦊 > file: DBHelper.js:16 > mongoose.connection.on > connection:');
  console.log('mongoose String at :' + dbURI)
})

mongoose.connection.on('err', (err) => {
  console.log('mongoose connected errinfo:' + err)
})

mongoose.connection.on('disconnected', (err) => {
  console.log('mongoose connected disconnected:' + err)
})
