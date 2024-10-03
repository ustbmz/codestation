/**
 * 评论对应二级路由
 */

const commentModel = require('../models/commentModel')
const mongoose = require('mongoose')
const { validate } = require('validate.js')
const { commentRule } = require('./rules')

/**
 * 通过 issueId 返回所有相关评论附带用户信息
 *
 * @param   {[type]}  id     issueID
 * @param   {[type]}  pager  null
 *
 * @return  {[type]}         返回该问答所有评论
 */
module.exports.findIssueCommentByIdService = async function (id, pager) {
  let comments = await commentModel.findIssueCommentById(id)
  // 替换 userId 为 userInfo
  const result = comments.map((comment) => {
    const { userId, ...rest } = comment.toObject() // 将 Mongoose 文档转换为普通对象
    return { ...rest, userInfo: userId } // 替换字段名
  })
  console.log('🐤 ≂ issueInfo:', result)
  return result
}

// /**
//  * 按照分页获取书籍模块某一本书对应的评论
//  */
// module.exports.findBookCommentByIdService = async function (id) {
//   return await commentModel.findOne({
//     issueId: id,
//   })
// }

// /**
//  * 新增评论
//  * @param {*} newCommentInfo
//  * @returns
//  */
module.exports.addCommentService = async function (newCommentInfo) {
  console.log('🐤 ≂ newCommentInfo:', newCommentInfo)
  return await commentModel.create(newCommentInfo)
}

// /**
//  * 根据 id 删除评论
//  * @param {*} id
//  * @returns
//  */
// module.exports.deleteCommentService = async function (id) {
//   return await deleteCommentDao(id)
// }
