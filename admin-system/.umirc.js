import { defineConfig } from '@umijs/max';
import { Children } from 'react';

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
        {
          name: '编辑用户',
          path: 'editUser/:id',
          component: './User/editUser',
          hideInMenu: true,
        },
      ],
    },
    {
      name: '面试题',
      path: '/interview',
      icon: 'FileMarkdownOutlined',
      routes: [
        {
          name: '面试题列表',
          path: 'interviewList',
          component: './InterView',
        },
        {
          name: '添加面试题',
          path: 'addInterview',
          component: './InterView/addInterview',
        },
      ],
    },
    {
      name: '问题',
      path: '/issue',
      icon: 'FormOutlined',
      routes: [
        {
          name: '问题列表',
          path: 'interviewList',
          component: './Issue',
        },
      ],
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
    {
      path: '/login',
      component: './Login',
      // 当前路由不展示菜单
      menuRender: false,
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
