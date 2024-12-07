/**
 * 该文件负责连接数据库
 */

const mongoose = require('mongoose')

// 定义链接数据库字符串
const dbURI = 'mongodb://admin:admin123@mongdb-mongo-1:27017/codestation'

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
