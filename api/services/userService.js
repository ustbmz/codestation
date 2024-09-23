const md5 = require('md5')
const jwt = require('jsonwebtoken')
const { validate } = require('validate.js')
const { userRule } = require('./rules')
const { ValidationError } = require('../utils/errors')
const { randomAvatar } = require('../utils/tools')
const userModel = require('../models/userModel')


/**
 *
 * @param {*} loginId 用户的登录账号
 */
module.exports.userIsExistService = async function (loginId) {
  const data = await userModel.find({ loginId })
  console.log('🐤 ≂ data:', data)
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
  return userModel.findOne({
    _id: id,
  })
}

module.exports.addUserService = async function (data) {
  return await userModel.create(userInfo)
}

module.exports.loginService = async function (userInfo) {
  console.log('🐤 ≂ userInfo:', userInfo)
  const { loginId, loginPwd } = userInfo
  const user = await userModel.find({ loginId })
  console.log('🐤 ≂ user:', user)
  if (!user.length) {
    return {
      code: 400,
      msg: '用户不存在',
    }
  } else {
    const pwd = md5(loginPwd)
    if (pwd !== user[0].loginPwd) {
      return {
        code: 400,
        msg: '密码错误',
      }
    } else {
      // const token = jwt.sign()
      const loginPeriod = 7
      const token = jwt.sign(user[0], md5('coderstation'), {
        expiresIn: 60 * 60 * 24 * loginPeriod,
      })
      return {
        code: 0,
        msg: '登录成功',
        data: user[0],
        token
      }
    }
  }
}
