/**
 * 该文件负责初始化数据
 */

// 首先连接数据库
require("./DBHelper");

const mongoose = require("mongoose");
// 引入数据模型
const adminModel = require("../models/adminModel");
const { seedMockIfEmpty } = require("../services/mockSeedService");

// 密码要进行 md5 加密
const md5 = require("md5");

function waitForConnection() {
  return new Promise((resolve) => {
    if (mongoose.connection.readyState === 1) resolve();
    else mongoose.connection.once("connected", resolve);
  });
}

// 接下来开始做数据初始化操作
(async function () {
  await waitForConnection();

  // admin 管理员表初始化
  const adminCount = await adminModel.countDocuments();
  if (!adminCount) {
    await adminModel.create({
      loginId: "admin",
      nickname: "超级管理员",
      loginPwd: md5("123456"),
      avatar: "/static/imgs/yinshi.jpg",
      permission: 1,
      enabled: true,
    });
    console.log("初始化管理员数据完毕...");
  }

  if (process.env.CSAPI_AUTO_SEED_MOCK === "1") {
    try {
      await seedMockIfEmpty();
      console.log("[csApi] Mock data ready (issues, types, users). Sign in: mock_demo / 123456");
    } catch (e) {
      console.error("[csApi] mock seed failed:", e.message || e);
    }
  }
})();

