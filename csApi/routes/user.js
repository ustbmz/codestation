/**
 * 用户对应的二级路由
 */

const express = require('express')
const router = express.Router()

// 引入业务层方法
const {
  loginService,
  addUserService,
  findUserByIdService,
  userIsExistService,
  findUserByPointsRankService,
  findUserByPageService,
  deleteUserService,
  updateUserService,
} = require('../services/userService')

const { formatResponse, analysisToken } = require('../utils/tools')
const { ValidationError } = require('../utils/errors')

/**
 * 用户登录
 */
router.post('/login', async function (req, res, next) {
  console.log('🐤 ≂ req:', req.body.type)
  console.log('🐤 ≂ req:', req.body)
  console.log('🐤 ≂ req.session.captcha', req.session.captcha)

  // 首先应该有一个验证码的验证
  // if (req.body.captcha.toLowerCase() !== req.session.captcha.toLowerCase()) {
  //   // 如果进入此 if，说明是有问题的，用户输入的验证码不正确
  //   next(new ValidationError('验证码错误'))
  //   return
  // }
  const result = await loginService(req.body)
  // 对返回数据进行格式化
  res.send(result)
})

/**
 * 管理员登录
 */
router.get('/whoami', async function (req, res, next) {
  // 1. 从客户端请求头的 Authorization 字段拿到 token，然后进行解析
  const token = analysisToken(req.get('Authorization'))
  console.log('🐤 ≂ whoami req.get:', req.get('Authorization'))
  // console.log('🐤 ≂ whoami token:', token)
  // 查看解析 token 是否成功
  if (token) {
    // 2. 返回给客户端解析结果
    res.send({
      code: 0,
      data: {
        _id: token._doc._id,
        loginId: token._doc.loginId,
        nickname: token._doc.nickname,
      },
    })
  } else {
    next(new ValidationError('登录过期，请重新登录'))
  }
})

/**
 * 根据分页查找用户
 */
router.post('/', async function (req, res) {
  console.log('🦊 > file: user.js:68 > req:', req.body)
  const result = await findUserByPageService(req.body)
  // 对返回数据进行格式化
  res.send(formatResponse(0, '', result))
})

router.get('/pointsrank', async function (req, res) {
  const result = await findUserByPointsRankService()
  // 对返回数据进行格式化
  res.send(formatResponse(0, '', result))
})

/**
 * 新增用户（用户注册）
 */
router.post('/addUser', async function (req, res, next) {
  console.log('🐤 ≂ req:', req.body.type)
  console.log('🐤 ≂ req:', req.body)
  console.log('🐤 ≂ req.session.captcha', req.session.captcha)
  // 首先应该有一个验证码的验证
  // 但是如果是后台系统新增，则不需要验证码
  // if (
  //   req.body.type !== 'background' &&
  //   req.body.captcha.toLowerCase() !== req.session.captcha.toLowerCase()
  // ) {
  //   // 如果进入此 if，说明是有问题的，用户输入的验证码不正确
  //   next(new ValidationError('验证码错误'))
  //   return
  // }
  const result = await addUserService(req.body)
  if (result && result._id) {
    res.send(formatResponse(0, '', result))
  } else {
    next(result)
  }
})

/**
 * 根据 id 删除用户
 */
router.get('/delUser/:id', async function (req, res) {
  const result = await deleteUserService(req.params.id)
  res.send(formatResponse(0, '', result))
})

/**
 * 根据 id 查找用户
 */
router.get('/:id', async function (req, res) {
  const result = await findUserByIdService(req.params.id)
  res.send(formatResponse(0, '', result))
})


router.post('/editUser', async function (req, res) {
  const result = await updateUserService(req.body._id, req.body)
  res.send(formatResponse(0, '', result))
})

/**
 * 根据 loginId 来查找用户是否存在
 */
router.get('/userIsExist/:loginId', async function (req, res) {
  const result = await userIsExistService(req.params.loginId)
  res.send(formatResponse(0, '', result))
})

/**
 * 确认密码是否正确
 */
router.post('/passwordcheck', async function (req, res, next) {
  const result = await passwordcheckService(req.body)
  res.send(formatResponse(0, '', result))
})

module.exports = router
