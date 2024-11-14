const mongoose = require('mongoose')
const moment = require('dayjs')

// 定义对应的 Schema
const issueSchema = new mongoose.Schema(
  {
    id: String, // mongodb 自动生成的 id
    issueTitle: String, // 问题标题
    issueContent: String, // 问题描述
    issuePic: String, // 问题图片
    scanNumber: Number, //	问题浏览量
    commentNumber: Number, //	评论数
    issueStatus: Boolean, //	问题状态
    issueDate: String, //	问题时间
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'userModel', // 关联的模型
    }, //	用户 id
    typeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'typeModel', // 关联的模型
    }, //  所属分类
  },
  {
    versionKey: false,
  }
)

// 通过 Schema 来创建相应的数据模型
// 创建数据模型的方法为 mongoose.model，只传一个名字，代表查找到对应名字的模型
// 如果传入 Schema，代表创建模型 (1) 给模型取一个名字 （2）对应的 Schema （3）对应的集合

issueSchema.pre('save', function (next) {
  this.issueDate = moment().format('YYYY-MM-DD HH:mm:ss')
  next()
})

issueSchema.statics = {
  findUsersByPartialName: function (params) {
    console.log('🐤 ≂ params:', params)
    return this.find({
      issueTitle: new RegExp(params.partialName, 'i'),
    })
      .skip(params.page - 1)
      .limit(params.pageSize)
  },

  queryCount: function (id) {
    return this.find({ tid: id }).countDocuments()
  },

  getCommentsPublic: function (id) {
    return this.find({
      cuid: id,
    }).populate({
      path: 'tid',
      select: '_id title',
    })
  },

  getNoReadCount: function (id) {
    return this.find({ uid: id, isRead: '0', status: '1' }).countDocuments()
  },

  readAllMsg: function (id) {
    return this.updateMany({ uid: id }, { $set: { isRead: '1' } })
  },

  // getHotComments: function (index, limit, page) {
  //   if (index === '0') {
  //     // 匹配30天内的评论数据
  //     return this.aggregate([
  //       {
  //         $match: { created: { $gte: new Date(moment().subtract(30, 'day')) } },
  //       },
  //       { $group: { _id: '$cuid', count: { $sum: 1 } } },
  //       { $addFields: { userId: { $toObjectId: '$_id' } } },
  //       {
  //         $lookup: {
  //           from: 'users',
  //           localField: 'userId',
  //           foreignField: '_id',
  //           as: 'cuid',
  //         },
  //       },
  //       { $unwind: '$cuid' },
  //       { $project: { cuid: { name: 1, _id: 1, pic: 1 }, count: 1 } },
  //       { $skip: page * limit },
  //       { $limit: limit },
  //       { $sort: { count: -1 } },

  //       // { $match: { created: { $gte: new Date(moment().subtract(30, 'day')) } } },
  //       // { $group: { _id: '$cuid', count: { $sum: 1 } } },
  //       // { $addFields: { userId: { $toObjectId: '$_id' } } },
  //       // { $lookup: { from: 'users', localField: 'userId', foreignField: '_id', as: 'cuid' } },
  //       // { $unwind: '$cuid' },
  //       // { $project: { cuid: { name: 1, _id: 1, pic: 1 }, count: 1 } },
  //       // { $skip: page * limit },
  //       // { $limit: limit },
  //       // { $sort: { count: -1 } }
  //     ])
  //   } else {
  //     return this.find()
  //       .populate({
  //         path: 'cuid',
  //         select: 'name pic _id',
  //       })
  //       .skip(limit * page)
  //       .limit(limit)
  //       .sort({ created: -1 })
  //   }
  // },
}

mongoose.model('issueModel', issueSchema, 'issues')
// 将此模型进行导出
module.exports = mongoose.model('issueModel')
