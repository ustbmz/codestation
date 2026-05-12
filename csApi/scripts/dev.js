/**
 * Dev entry: if local MongoDB is not listening, use mongodb-memory-server.
 */
require('dotenv').config()
const net = require('net')

function checkPort(host, port) {
  return new Promise((resolve) => {
    const s = net.createConnection({ port, host }, () => {
      s.end()
      resolve(true)
    })
    s.on('error', () => resolve(false))
    s.setTimeout(2000, () => {
      try {
        s.destroy()
      } catch (_) {}
      resolve(false)
    })
  })
}

function parseMongoHostPort(uri) {
  try {
    const withoutScheme = uri.replace(/^mongodb(\+srv)?:\/\//, '')
    const hostPort = withoutScheme.includes('@')
      ? withoutScheme.split('@')[1]
      : withoutScheme
    const [hp] = hostPort.split('/')
    const [host, portPart] = hp.split(':')
    const port = portPart ? parseInt(portPart, 10) : 27017
    return { host, port }
  } catch (_) {
    return null
  }
}

;(async () => {
  const defaultLocal = 'mongodb://127.0.0.1:27017/coderstation'
  const uri = process.env.MONGODB_URI || defaultLocal
  const loc = parseMongoHostPort(uri)
  const isLocal =
    loc &&
    (loc.host === '127.0.0.1' ||
      loc.host === 'localhost' ||
      loc.host === '::1')

  if (isLocal && loc && !(await checkPort(loc.host, loc.port))) {
    const { MongoMemoryServer } = require('mongodb-memory-server')
    const mongod = await MongoMemoryServer.create()
    const base = mongod.getUri()
    const dbName = process.env.DB_NAME || 'coderstation'
    process.env.MONGODB_URI = base.endsWith('/')
      ? `${base}${dbName}`
      : `${base}/${dbName}`
    console.log(
      '[csApi] No MongoDB on port; using in-memory MongoDB (data clears when this process exits).'
    )
  } else {
    process.env.MONGODB_URI = uri
  }

  // 本地 dev 入口默认灌入 mock（幂等）；.env 中 CSAPI_AUTO_SEED_MOCK=0 可关闭
  if (process.env.CSAPI_AUTO_SEED_MOCK !== '0') {
    process.env.CSAPI_AUTO_SEED_MOCK = '1'
  }

  require('../bin/www')
})().catch((err) => {
  console.error('[csApi] Failed to start:', err)
  process.exit(1)
})
