const md5 = require('md5')
const jwt = require('jsonwebtoken')
const { validate } = require('validate.js')

const { findUserByLoginId, findUserById,addUser } = require('../api/userControl')
const { userRule } = require('./rules')
const { ValidationError } = require('../utils/errors')
const { randomAvatar } = require('../utils/tools')

/**
 *
 * @param {*} loginId 用户的登录账号
 */
module.exports.userIsExistService = async function (loginId) {
  const data = await findUserByLoginId(loginId)
  console.log('🐤 ≂ data:', data);
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
  console.log('🐤 ≂ id:', id);
  return await findUserByIdDao(id);
};


module.exports.findUserByIdService = async function (id) {
  console.log('🐤 ≂ id:', id)
  return await findUserById(id)
}

module.exports.addUserService = async function (data) {
  console.log('🐤 ≂ reg:', data)
  return await addUser(data)
}

