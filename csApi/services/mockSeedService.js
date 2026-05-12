/**
 * Dev-only mock data (idempotent). Used by config/init and npm run seed:mock.
 * Call after mongoose is connected.
 */
const dayjs = require('dayjs')
const typeModel = require('../models/typeModel')
const userModel = require('../models/userModel')
const issueModel = require('../models/issueModel')
const interviewModel = require('../models/interviewModel')
const commentModel = require('../models/commentModel')
const bookModel = require('../models/bookModel')
const md5 = require('md5')

const nowStr = () => dayjs().format('YYYY-MM-DD HH:mm:ss')

async function ensureTypes() {
  const n = await typeModel.countDocuments()
  if (n > 0) {
    console.log('[seed] types: already have data, skip')
    return typeModel.find()
  }
  const names = ['JavaScript', 'Vue', 'React', 'Node.js', 'General']
  await typeModel.insertMany(names.map((typeName) => ({ typeName })))
  console.log('[seed] types: inserted', names.length)
  return typeModel.find()
}

async function ensureUsers() {
  const count = await userModel.countDocuments()
  if (count > 0) {
    console.log('[seed] users: already have data, skip')
    return userModel.find().sort({ points: -1 })
  }
  const pwd = md5('123456')
  const users = [
    {
      loginId: 'mock_demo',
      loginPwd: pwd,
      nickname: 'Mock Demo',
      mail: 'demo@example.com',
      points: 128,
      enabled: true,
      registerDate: nowStr(),
      intro: 'Demo account from seed script. Password: 123456',
    },
    {
      loginId: 'mock_alice',
      loginPwd: pwd,
      nickname: 'Alice',
      mail: 'alice@example.com',
      points: 96,
      enabled: true,
      registerDate: nowStr(),
      intro: 'Mock user Alice',
    },
    {
      loginId: 'mock_bob',
      loginPwd: pwd,
      nickname: 'Bob',
      mail: 'bob@example.com',
      points: 72,
      enabled: true,
      registerDate: nowStr(),
      intro: 'Mock user Bob',
    },
  ]
  await userModel.insertMany(users)
  console.log('[seed] users: inserted', users.length, '(password: 123456)')
  return userModel.find().sort({ points: -1 })
}

async function ensureIssues(types, users) {
  const approved = await issueModel.countDocuments({ issueStatus: true })
  if (approved > 0) {
    console.log('[seed] issues: already have approved rows, skip')
    return issueModel.find({ issueStatus: true })
  }
  if (!types.length || !users.length) {
    console.log('[seed] issues: missing types or users, skip')
    return []
  }

  const u = (i) => users[i % users.length]._id
  const t = (i) => types[i % types.length]._id

  const rows = [
    {
      issueTitle:
        'What is a closure in JavaScript, and what are common use cases?',
      issueContent:
        '<p>Explain closures with scope and garbage collection, and give examples (event listeners, modules).</p>',
      scanNumber: 120,
      commentNumber: 2,
      issueStatus: true,
      issueDate: nowStr(),
      userId: u(0),
      typeId: t(0),
    },
    {
      issueTitle: 'Vue 3: how do you choose between Composition API and Options API?',
      issueContent:
        '<p>We are comparing both for a new project: maintainability, TypeScript inference, and learning curve.</p>',
      scanNumber: 86,
      commentNumber: 0,
      issueStatus: true,
      issueDate: nowStr(),
      userId: u(1),
      typeId: t(1),
    },
    {
      issueTitle:
        'What goes wrong when the useEffect dependency array is incorrect in React?',
      issueContent:
        '<p>Missing deps, unstable object/function references causing infinite fetches — looking for a checklist.</p>',
      scanNumber: 200,
      commentNumber: 0,
      issueStatus: true,
      issueDate: nowStr(),
      userId: u(2),
      typeId: t(2),
    },
    {
      issueTitle:
        'How do you handle uncaught Promise rejections gracefully in Node.js?',
      issueContent:
        '<p>Production setup: unified logging and process policy so failures are not silent.</p>',
      scanNumber: 55,
      commentNumber: 0,
      issueStatus: true,
      issueDate: nowStr(),
      userId: u(0),
      typeId: t(3),
    },
  ]

  await issueModel.insertMany(rows)
  console.log('[seed] issues: inserted', rows.length, '(issueStatus: true)')
  return issueModel.find({ issueStatus: true })
}

async function ensureInterviews(types) {
  const n = await interviewModel.countDocuments()
  if (n > 0) {
    console.log('[seed] interviews: already have data, skip')
    return
  }
  if (!types.length) return

  const items = []
  types.forEach((type, idx) => {
    items.push(
      {
        interviewTitle: `[${type.typeName}] Concept question ${idx + 1}-1`,
        interviewContent: `<p>Briefly describe one core ${type.typeName} concept that matters most in day-to-day development.</p>`,
        typeId: type._id,
        onShelfDate: nowStr(),
      },
      {
        interviewTitle: `[${type.typeName}] Hands-on question ${idx + 1}-2`,
        interviewContent: `<p>Whiteboard or live coding: implement a small example and discuss edge cases.</p>`,
        typeId: type._id,
        onShelfDate: nowStr(),
      }
    )
  })
  await interviewModel.insertMany(items)
  console.log('[seed] interviews: inserted', items.length)
}

async function ensureComments(issues, users, types) {
  const n = await commentModel.countDocuments()
  if (n > 0) {
    console.log('[seed] comments: already have data, skip')
    return
  }
  const issue = issues[0]
  if (!issue || !users.length) {
    console.log('[seed] comments: no issue or users, skip')
    return
  }
  const typeId = issue.typeId || types[0]?._id
  const u1 = users[1]?._id || users[0]._id
  const u2 = users[2]?._id || users[0]._id
  const docs = [
    {
      userId: u1,
      issueId: issue._id,
      typeId,
      commentContent:
        '<p>A closure keeps a reference to the outer lexical environment, so inner functions can still access those bindings.</p>',
      commentType: 1,
      commentDate: nowStr(),
    },
  ]
  if (!u2.equals(u1)) {
    docs.push({
      userId: u2,
      issueId: issue._id,
      typeId,
      commentContent:
        '<p>Another case: binding event handlers inside a loop often needs a closure or <code>let</code> to capture the right index.</p>',
      commentType: 1,
      commentDate: nowStr(),
    })
  }
  await commentModel.insertMany(docs)
  await issueModel.updateOne(
    { _id: issue._id },
    { $set: { commentNumber: docs.length } }
  )
  console.log('[seed] comments: inserted', docs.length, 'for first issue')
}

async function ensureBooks(types) {
  const n = await bookModel.countDocuments()
  if (n > 0) {
    console.log('[seed] books: already have data, skip')
    return
  }
  if (!types.length) return
  const t = types[0]._id
  await bookModel.insertMany([
    {
      bookTitle: 'Professional JavaScript for Web Developers (sample)',
      bookPic: '',
      downloadLink: 'https://example.com/book1',
      bookIntro: 'Mock book entry for list and detail placeholders.',
      scanNumber: 30,
      commentNumber: 0,
      onShelfDate: nowStr(),
      requirePoints: 0,
      typeId: t,
    },
    {
      bookTitle: 'Design and Implementation of Vue.js (sample)',
      bookPic: '',
      downloadLink: 'https://example.com/book2',
      bookIntro: 'Mock book entry.',
      scanNumber: 18,
      commentNumber: 0,
      onShelfDate: nowStr(),
      requirePoints: 10,
      typeId: types[1]?._id || t,
    },
  ])
  console.log('[seed] books: inserted 2')
}

async function seedMockIfEmpty() {
  const types = await ensureTypes()
  const users = await ensureUsers()
  const issues = await ensureIssues(types, users)
  await ensureInterviews(types)
  await ensureComments(issues, users, types)
  await ensureBooks(types)
}

module.exports = { seedMockIfEmpty }
