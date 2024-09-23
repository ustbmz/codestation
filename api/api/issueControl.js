const issueModel = require('../models/issueModel')

// 判断登录用户是否存在
module.exports.findIssue = async (params) => {
  return await issueModel.find(params)
}

// /**
// module.exports.findUserById = async function (id) {
//   return userModel.issueModel({
//     _id: id,
//   })
// }

// module.exports.addUser = async function (data) {
//   return await issueModel.create(data)
// }
