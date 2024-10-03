/**
 * 评论对应二级路由
 */

const { validate } = require('validate.js')

const { commentRule } = require('./rules')
const { ValidationError } = require('../utils/errors')
const commentModel = require('../models/commentModel')
const mongoose = require('mongoose')
/**
 * 根据分页查找对应模块评论
 */
module.exports.findCommentByPageAndTypeService = async function (
  commentType,
  pager
) {
  return await findCommentByPageAndTypeDao(commentType, pager)
}

/**
 * 按照分页获取问答模块某一问题对应的评论
 */
module.exports.findIssueCommentByIdService = async function (id, pager) {
  console.log('🐤 ≂ issueId:', id)

  // 确保 issueId 是 ObjectId 类型，使用 'new' 创建实例
  const objectId = new mongoose.Types.ObjectId(id)

  // 使用 aggregate 查询评论和用户信息
  let issueInfo = await commentModel.aggregate([
    {
      $match: { issueId: objectId }, // 根据传入的 issueId 匹配评论
    },
    {
      $lookup: {
        from: 'users', // 关联的集合名称 (即 users 表)
        localField: 'userId', // commentModel 中的 userId 字段
        foreignField: '_id', // userModel (users 表) 中的 _id 字段
        as: 'userInfo', // 查询结果的字段名
      },
    },
    {
      $unwind: '$userInfo', // 将 userInfo 数组解构为单个对象
    },
  ])

  console.log('🐤 ≂ issueInfo:', issueInfo)
  return issueInfo
}



/**
 * 按照分页获取书籍模块某一本书对应的评论
 */
module.exports.findBookCommentByIdService = async function (id) {
  return await commentModel.findOne({
    issueId: id,
  })
}

/**
 * 新增评论
 * @param {*} newCommentInfo
 * @returns
 */
module.exports.addCommentService = async function (newCommentInfo) {
  // 首先对数据进行一个处理，补全另一个 id 值为 null
  if (!newCommentInfo.issueId) {
    newCommentInfo.issueId = ''
  } else {
    newCommentInfo.bookId = ''
  }

  return validate.async(newCommentInfo, commentRule).then(
    async function () {
      // 增加评论日期字段
      newCommentInfo.commentDate = new Date().getTime().toString()
      return await addCommentDao(newCommentInfo)
    },
    function (e) {
      console.log(e)
      return new ValidationError('数据验证失败')
    }
  )
}

/**
 * 根据 id 删除评论
 * @param {*} id
 * @returns
 */
module.exports.deleteCommentService = async function (id) {
  return await deleteCommentDao(id)
}
