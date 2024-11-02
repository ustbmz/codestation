const interviewModel = require('../models/interviewModel')
const typeModel = require('../models/typeModel')

/**
 * 按照分页查询面试题
 */
// module.exports.findInterviewByPageService = async function (queryObj) {
//   return await findInterviewByPageDao(queryObj);
// };

/**
 * 获取所有分类的面试题标题
 */
module.exports.findInterviewTitleByTypeService = async function () {
  const typeData = await typeModel.find()

  const interviewTitleData = []
  for (let i = 0; i < typeData.length; i++) {
    // 查询对应 typeId 的面试题，只需要题目即可
    // 因此后面添加了 { interviewTitle: 1 }
    const data = await interviewModel
      .find(
        {
          typeId: typeData[i]._id,
        },
        { interviewTitle: 1, typeId: 1 }
      )
      .populate('typeId')
      .sort({ onShelfDate: 1 })
    interviewTitleData.push(data)
  }
  return interviewTitleData
}

/**
 * 获取所有分类的面试题标题
 */
module.exports.findInterViewTitleByPageService = async function (params) {
  console.log('🦊 > file: interviewService.js:43 > params:', params);
  const { current, pageSize } = params
  const skip = (current - 1) * pageSize
  const total = await interviewModel.countDocuments()
  const totalPages = Math.ceil(total / pageSize)

  const typeData = await typeModel.find()
  const interviewTitleData = []
  for (let i = 0; i < typeData.length; i++) {
    // 查询对应 typeId 的面试题，只需要题目即可
    // 因此后面添加了 { interviewTitle: 1 }
    const data = await interviewModel
      .find(
        {
          typeId: typeData[i]._id,
        },
        { interviewTitle: 1, typeId: 1 }
      )
      .skip(skip)
      .limit(pageSize)
      .populate('typeId')
      .sort({ onShelfDate: 1 })

    data.forEach((item) => {
      const obj = {
        _id: item._id,
        interviewTitle: item.interviewTitle,
        typeId: item.typeId._id,
        typeName: item.typeId.typeName,
      }
      interviewTitleData.push(obj)
    })
  }
  return {
    current,
    pageSize,
    totalPages,
    data: interviewTitleData,
    total: total,
  }
}

/**
 * 根据 id 查找某一道面试题
 */
module.exports.findInterviewByIdService = async function (id) {
  return await interviewModel.findOne({
    _id: id,
  })
}

/**
 * 新增面试题
 */
module.exports.addInterviewService = async function (newInterviewInfo) {
  console.log(
    '🦊 > file: interviewService.js:49 > newInterviewInfo:',
    newInterviewInfo
  )
  // 验证通过
  return await interviewModel.create(newInterviewInfo)
}

/**
 * 删除面试题
 */
module.exports.deleteInterviewService = async function (id) {
  // 接下来再删除该书籍
  return await interviewModel.deleteOne({
    _id: id,
  })
}

/**
 * 修改面试题
 */
//  module.exports.updateInterviewService = async function (id, newInfo) {
//     return await updateInterviewDao(id, newInfo);
//   };
