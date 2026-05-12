/**
 * Insert dev mock data into MongoDB (idempotent).
 *
 *   cd csApi && npm run seed:mock
 *
 * Connection: MONGODB_URI, default mongodb://127.0.0.1:27017/coderstation
 */
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') })

const mongoose = require('mongoose')
const { seedMockIfEmpty } = require('../services/mockSeedService')

const dbURI =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/coderstation'

async function main() {
  await mongoose.connect(dbURI, {
    serverSelectionTimeoutMS: 8000,
  })
  console.log('[seed] connected:', dbURI.replace(/\/\/.*@/, '//***@'))

  await seedMockIfEmpty()

  console.log('[seed] done.')
  await mongoose.disconnect()
}

main().catch((err) => {
  console.error('[seed] failed:', err.message || err)
  if (String(err.message || '').includes('ECONNREFUSED')) {
    console.error(
      '[seed] Start MongoDB or set MONGODB_URI to a reachable instance, then run npm run seed:mock'
    )
  }
  process.exit(1)
})
