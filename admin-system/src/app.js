// 运行时配置
import { getInfo, getAdminById } from '@/services/AdminController';
import {message} from 'antd'

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate

export async function getInitialState() {
  if (location.pathname === '/login') {
    // 强行跳登录页
    // 判断是否有有效的 token
    const token = localStorage.getItem('adminToken');
    if (token) {
      const result = await getInfo();
      console.log(result, 'result');
      if (result.data) {
        // 不仅有 token，而且 token 是有效的
        // 不允许你去 login
        message.warning('请先退出后在登录');
        history.go(-1);
      }
    }
  } else {
    // 强行要跳内部页面
    const result = await getInfo();
    console.log('🦊 > file: app.js:26 > getInitialState > result:', result);
    if (result.data) {
      // 说明有 token，并且 token 有效
      // 获取该 id 对应的管理员信息
      const { data } = await getAdminById(result.data._id);
      console.log('🦊 > file: app.js:31 > getInitialState > data:', data);
      // 这里返回的就是一个全局的初始化数据
      // 之后各个组件都可以通过 useModel 获取到该初始数据
      return {
        name: data.nickname,
        avatar: data.avatar,
        adminInfo: data,
      };
    } else {
      // token 验证失败，跳转至登录
      // 失效可能是因为 token 过期，也有可能是因为压根儿就没有 token，不管有没有，删除掉原有的
      localStorage.removeItem("adminToken");
      location.href = "/login";
      message.warning('请重新登录');
    }
  }
}

export const layout = () => {
  return {
    logo: 'https://s2.loli.net/2024/10/28/xMDcGBypClXItV8.png ',
    menu: {
      locale: false,
    },
    logout: () => {
      localStorage.removeItem('adminToken');
      location.href = '/login';
      message.success('退出成功')
    }
  };
};

export const request = {
  timeout: 3000,
  // 请求拦截器
  requestInterceptors: [
    function (url, options) {
      // 从本地获取 token
      const token = localStorage.getItem('adminToken');
      if (token) {
        options.headers['Authorization'] = 'Bearer ' + token;
      }
      return { url, options };
    },
  ],
};
