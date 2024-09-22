const userModel = require('../models/userModel')

// 判断登录用户是否存在
module.exports.findUserByLoginId = async (loginId) => {
  return await userModel.find({loginId})
}

/**
 * 根据 id 查找用户
 * @param {*} id 要查找的用户 id
 * @returns
 */
module.exports.findUserById = async function (id) {
  return userModel.findOne({
    _id: id,
  });
};

module.exports.addUser = async function (userInfo) {
  return await userModel.create(userInfo);
};




