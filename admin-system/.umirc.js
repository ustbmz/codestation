import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  dva: {},
  layout: {
    title: 'code station',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
      icon: 'HomeOutlined',
    },
    {
      name: '管理员',
      path: '/admin',
      icon: 'MacCommandOutlined',
      routes: [
        {
          name: '管理员列表',
          path: 'adminList',
          component: './Admin',
        },
        {
          name: '添加管理员',
          path: 'addAdmin',
          component: './Admin/addAdmin',
        },
      ],
    },
    {
      name: '用户',
      path: '/user',
      icon: 'UserOutlined',
      routes: [
        {
          name: '用户列表',
          path: 'userList',
          component: './User',
        },
        {
          name: '添加用户',
          path: 'addUser',
          component: './User/addUser',
        },
      ],
    },
    {
      name: '面试题',
      path: '/interview',
      component: './InterView',
      icon: 'FileMarkdownOutlined',
    },
    {
      name: '问题',
      path: '/issue',
      component: './Issue',
      icon: 'FormOutlined',
    },
    {
      name: '评论',
      path: '/comment',
      component: './Comment',
      icon: 'CommentOutlined',
    },
    {
      name: '类型',
      path: '/type',
      component: './Type',
      icon: 'AppstoreAddOutlined',
    },

    // {
    //   name: '权限演示',
    //   path: '/access',
    //   component: './Access',
    // },
    // {
    //   name: ' CRUD 示例',
    //   path: '/table',
    //   component: './Table',
    // },
  ],
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:7001',
      changeOrigin: true,
    },
  },
  npmClient: 'npm',
});
