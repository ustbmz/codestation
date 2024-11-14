/**
 * 管理员模块对应的二级路由
 */

const express = require('express')
const router = express.Router()

// 引入业务层方法
const {
  loginService,
  addAdminService,
  deleteAdminService,
  updateAdminService,
  findAllAdminService,
  findAdminByIdService,
  adminIsExistService,
} = require('../services/adminService')

const { formatResponse, analysisToken } = require('../utils/tools')
const { ValidationError } = require('../utils/errors')

/**
 * 管理员登录
 */
router.post('/login', async function (req, res, next) {
  console.log(req.body.captcha, 'req.body.captcha')
  // console.log(req.session.captcha, "req.session.captcha");

  // 首先应该有一个验证码的验证
  if (req.body.captcha.toLowerCase() !== req.session.captcha.toLowerCase()) {
    // 如果进入此 if，说明是有问题的，用户输入的验证码不正确
    next(new ValidationError('验证码错误'))
    return
  }

  const result = await loginService(req.body)
  // 对返回数据进行格式化
  res.send(result)
})

/**
 * 管理员恢复登录
 */
router.get('/whoami', async function (req, res, next) {
  // 首先从请求头获取 token 字符串
  const tokenStr = req.get('Authorization')
  if (tokenStr) {
    // 1. 从客户端请求头的 Authorization 字段拿到 token，然后进行解析
    const token = analysisToken(tokenStr)
    // 查看解析 token 是否成功
    if (token) {
      // 2. 返回给客户端解析结果
      res.send(
        formatResponse(0, '', {
          _id: token._id,
          loginId: token.loginId,
        })
      )
    } else {
      next(new ValidationError('登录过期，请重新登录'))
    }
  } else {
    next(new ValidationError('登录过期，请重新登录'))
  }
})

/**
 * 获取所有管理员
 */
router.get('/', async function (req, res) {
  const result = await findAllAdminService()
  // 对返回数据进行格式化
  res.send(formatResponse(0, '', result))
})

/**
 * 新增管理员
 */
router.post('/addAdmin', async function (req, res, next) {
  const result = await addAdminService(req.body, next)
  if (result && result._id) {
    res.send(formatResponse(0, '', result))
  } else {
    next(result)
  }
})

/**
 * 根据 id 删除管理员
 */
router.post('/delAdmin/:id', async function (req, res) {
  const result = await deleteAdminService(req.params.id)
  res.send(formatResponse(0, '', result))
})

/**
 * 根据 id 修改管理员
 */
router.post('/editAdmin', async function (req, res) {
  const result = await updateAdminService(req.body._id, req.body)
  res.send(formatResponse(0, '', result))
})

/**
 * 根据 id 查找管理员
 */
router.get('/:id', async function (req, res) {
  const result = await findAdminByIdService(req.params.id)
  res.send(formatResponse(0, '', result))
})

/**
 * 根据 loginId 来查找该管理员是否存在
 */
router.get('/adminIsExist/:loginId', async function (req, res) {
  const result = await adminIsExistService(req.params.loginId)
  res.send(formatResponse(0, '', result))
})

router.get('/whoami', async function (req, res, next) {
  // 1. 从客户端请求头的 Authorization 字段拿到 token，然后进行解析
  const token = analysisToken(req.get('Authorization'))
  console.log('🐤 ≂ whoami req.get:', req.get('Authorization'))
  console.log('🐤 ≂ whoami token:', token)
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

module.exports = router
