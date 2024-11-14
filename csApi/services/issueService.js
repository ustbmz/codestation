const { validate } = require('validate.js')
const { issueRule } = require('./rules')
const { ValidationError } = require('../utils/errors')
const issueModel = require('../models/issueModel')
const userModel = require('../models/userModel')
const { param } = require('../routes/issue')

/**
 * 按分页查询问答
 */
module.exports.findIssueAllService = async function (params) {
  console.log('🐤 ≂ params:', params)
  const { page, pageSize, typeId, partialName } = params
  const skip = (page - 1) * pageSize
  let Totaldata = 0
  let data = []
  if (typeId) {
    data = await issueModel
      .find({
        typeId: typeId,
        issueStatus: true,
      })
      .skip(skip)
      .limit(pageSize)

    Totaldata = await issueModel.countDocuments({
      typeId: typeId,
    })
  } else if (partialName) {
    data = await issueModel.findUsersByPartialName(params)
    Totaldata = data.length
  } else {
    data = await issueModel
      .find({
        issueStatus: true,
      })
      .skip(skip)
      .limit(pageSize)
    Totaldata = await issueModel.countDocuments()
  }
  return {
    currentPage: page,
    total: Totaldata,
    data: data,
  }
}

/**
 * 根据 id 获取其中一个问答信息
 */
module.exports.findIssueByIdService = async function (id) {
  console.log('🐤 ≂ id:', id)
  let res = await issueModel.findOne({
    _id: id,
  })
  console.log('🦊 > file: issueService.js:56 > res:', res);
  let userInfo = await userModel.findOne({
    _id: res.userId,
  })
  return {
    issueInfo: res,
    userInfo: userInfo,
  }
}

/**
 * 新增问答
 */
module.exports.addIssueService = async function (newIssueInfo) {
  // 首先进行同步的数据验证
  const validateResult = validate.validate(newIssueInfo, issueRule)
  if (!validateResult) {
    // 验证通过
    // 添加其他信息
    newIssueInfo.scanNumber = 0 // 浏览数，默认为 0
    newIssueInfo.commentNumber = 0 // 评论数，默认为 0
    // 上架日期
    newIssueInfo.issueDate = new Date().getTime().toString()

    // 添加状态，默认是未过审状态
    newIssueInfo.issueStatus = false

    return await issueModel.create(newIssueInfo)
  } else {
    // 数据验证失败
    return new ValidationError('数据验证失败')
  }
}

/**
 * 删除某一个问答
 */
module.exports.deleteIssueService = async function (id) {
  // 首先需要删除该问答对应的评论

  // 获取该 issueId 对应的所有评论
  // const commentResult = await findIssueCommentByIdDao(id);

  // for (let i = 0; i < commentResult.length; i++) {
  //   await issueModel.deleteOne(commentResult[i]._id);
  // }

  // 接下来再删除该问答
  return await issueModel.deleteOne({
    _id: id,
  })
}

/**
 * 修改某一个问答
 */
module.exports.updateIssueService = async function (id, newInfo) {
  return await issueModel.updateOne(id, newInfo)
}
