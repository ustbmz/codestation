/**
 * 该文件负责连接数据库
 */

const mongoose = require('mongoose')

// 定义链接数据库字符串
const dbURI = 'mongodb://' + process.env.DB_HOST + '/' + process.env.DB_NAME

mongoose.set('useCreateIndex', true)

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

mongoose.connection.on('connected', () => {
  console.log('mongoose String at :' + config.DB_URL)
})

mongoose.connection.on('err', (err) => {
  console.log('mongoose connected errinfo:' + err)
})

mongoose.connection.on('disconnected', (err) => {
  console.log('mongoose connected disconnected:' + err)
})
