const md5 = require('md5')
const jwt = require('jsonwebtoken')
const { validate } = require('validate.js')
const { userRule } = require('./rules')
const { ValidationError } = require('../utils/errors')
const { randomAvatar } = require('../utils/tools')
const userModel = require('../models/userModel')

module.exports.findUserByLoginId = async function (loginId) {
  return await userModel.findOne({ loginId })
}
/**
 * [deleteUserService description]
 *
 * @param   {[type]}  loginId  [loginId description]
 *
 * @return  {[type]}           [return description]
 */
module.exports.deleteUserService = async function (id) {
  return await userModel.deleteOne({
    _id: id,
  })
}

module.exports.findUsersService = async function () {
  console.log('🐤 ≂ findUsersService:')
  return await userModel.find({})
}

module.exports.addUserService = async function (data) {
  return await userModel.create(data)
}

module.exports.findUserByPointsRankService = async function () {
  return await userModel.find().sort({ points: -1, registerDate: -1 }).limit(10)
}

module.exports.loginService = async function (userInfo) {
  const { loginId, loginPwd } = userInfo
  const result = await userModel.find({ loginId })
  console.log('🐤 ≂ user:', result)
  const user = result[0]
  console.log('🐤 ≂ userInfo:', user)
  if (!result.length) {
    return {
      code: 400,
      msg: '用户不存在',
    }
  } else {
    const pwd = md5(loginPwd)
    if (pwd !== user.loginPwd) {
      return {
        code: 400,
        msg: '密码错误',
      }
    } else {
      // const token = jwt.sign()
      const loginPeriod = 7
      const token = jwt.sign(user, md5('coderstation'), {
        expiresIn: 60 * 60 * 24 * loginPeriod,
      })
      return {
        code: 0,
        msg: '登录成功',
        data: user,
        token,
      }
    }
  }
}

/**
 *
 * @param {*} loginId 用户的登录账号
 */
module.exports.userIsExistService = async function (loginId) {
  const data = await userModel.find({ loginId })
  if (data.length) {
    return true
  } else {
    return false
  }
}

/**
 * 根据 id 来查找用户
 * @param {*} id
 * @returns
 */
module.exports.findUserByIdService = async function (id) {
  // return await findUserById(id)
  return await userModel.findOne({
    _id: id,
  })
}

/**
 * 根据 分页 来查找用户
 * @param
 * @returns
 */
module.exports.findUserByPageService = async function (params) {
  console.log('🦊 > file: userService.js:39 > params:', params)
  const { current, pageSize } = params
  const skip = (current - 1) * pageSize
  const total = await userModel.countDocuments()
  const totalPages = Math.ceil(total / pageSize)

  const { loginId } = params
  // 设置查询条件，使用正则表达式进行模糊匹配
  const query = {}
  if (loginId) {
    query.loginId = new RegExp(loginId, 'i') // 'i'表示忽略大小写
  }

  const data = await userModel.find(query).skip(skip).limit(pageSize)
  return {
    current,
    pageSize,
    totalPages,
    total,
    data,
  }
}

/**
 * 根据 id 来更新管理员信息
 * @param {*} id
 * @param {*} newInfo
 * @returns
 */

module.exports.updateUserService = async function (id, newInfo) {
  // 根据 id 获取该管理员原来的信息（主要是为了处理密码）
  const userInfo = await userModel.findOne({
    _id: id,
  })
  console.log('🦊 > file: adminService.js:149 > adminInfo:', userInfo)
  if (newInfo.loginPwd && newInfo.loginPwd !== userInfo.loginPwd) {
    // 如果传递了密码
    // 并且传递过来的的密码和原来的密码不相等，则说明密码变了，需要重新加密
    newInfo.loginPwd = md5(newInfo.loginPwd)
  }
  return await userModel.updateOne({ _id: id }, newInfo)
}
