const mongoose = require('mongoose')
const moment = require('dayjs')

// 定义对应的 Schema
const commentSchema = new mongoose.Schema(
  {
    id: String, // mongodb 自动生成的 id
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'userModel', // 关联的模型
    }, //  所属分类
    issueId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'issueModel', // 关联的模型
    }, //  所属分类
    typeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'typeModel', // 关联的模型
    }, //  所属分类
    commentContent: String, // 对应评论
    commentDate: String, // 评论日期
    commentType: Number, // 评论类型
  },
  {
    versionKey: false,
  }
)

commentSchema.pre('save', function (next) {
  this.commentDate = moment().format('YYYY-MM-DD HH:mm:ss')
  next()
})

commentSchema.statics = {
  findIssueCommentById: function (id) {
    return this.find({
      issueId: id,
    }).populate({
      path: 'userId',
      select: 'avatar nickname id'
    })
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

  getHotComments: function (index, limit, page) {
    if (index === '0') {
      // 匹配30天内的评论数据
      return this.aggregate([
        {
          $match: { created: { $gte: new Date(moment().subtract(30, 'day')) } },
        },
        { $group: { _id: '$cuid', count: { $sum: 1 } } },
        { $addFields: { userId: { $toObjectId: '$_id' } } },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'cuid',
          },
        },
        { $unwind: '$cuid' },
        { $project: { cuid: { name: 1, _id: 1, pic: 1 }, count: 1 } },
        { $skip: page * limit },
        { $limit: limit },
        { $sort: { count: -1 } },

        // { $match: { created: { $gte: new Date(moment().subtract(30, 'day')) } } },
        // { $group: { _id: '$cuid', count: { $sum: 1 } } },
        // { $addFields: { userId: { $toObjectId: '$_id' } } },
        // { $lookup: { from: 'users', localField: 'userId', foreignField: '_id', as: 'cuid' } },
        // { $unwind: '$cuid' },
        // { $project: { cuid: { name: 1, _id: 1, pic: 1 }, count: 1 } },
        // { $skip: page * limit },
        // { $limit: limit },
        // { $sort: { count: -1 } }
      ])
    } else {
      return this.find()
        .populate({
          path: 'cuid',
          select: 'name pic _id',
        })
        .skip(limit * page)
        .limit(limit)
        .sort({ created: -1 })
    }
  },
}

// 通过 Schema 来创建相应的数据模型
// 创建数据模型的方法为 mongoose.model，只传一个名字，代表查找到对应名字的模型
// 如果传入 Schema，代表创建模型 (1) 给模型取一个名字 （2）对应的 Schema （3）对应的集合

mongoose.model('commentModel', commentSchema, 'comments')

// 将此模型进行导出
module.exports = mongoose.model('commentModel')
