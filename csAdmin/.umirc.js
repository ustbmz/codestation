import { defineConfig } from '@umijs/max';
import { Children } from 'react';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  dva: {},
  locale: {
    default: 'en-US',
    antd: true,
    // 否则未选语言时跟浏览器走，中文系统会整站中文；默认英文用 false
    baseNavigator: false,
  },
  layout: {
    title: 'Code Admin',
    // 与 app.js 里 menu.locale 一致；否则 ProLayout 拿到 locale: undefined 会关闭菜单 i18n，侧栏只显示 name 原文
    locale: true,
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: 'menu.home',
      locale: 'menu.home',
      path: '/home',
      component: './Home',
      icon: 'HomeOutlined',
    },
    {
      name: 'menu.admin.parent',
      locale: 'menu.admin.parent',
      path: '/admin',
      icon: 'MacCommandOutlined',
      routes: [
        {
          name: 'menu.admin.list',
          locale: 'menu.admin.list',
          path: 'adminList',
          component: './Admin',
        },
        {
          name: 'menu.admin.add',
          locale: 'menu.admin.add',
          path: 'addAdmin',
          component: './Admin/addAdmin',
        },
      ],
    },
    {
      name: 'menu.user.parent',
      locale: 'menu.user.parent',
      path: '/user',
      icon: 'UserOutlined',
      routes: [
        {
          name: 'menu.user.list',
          locale: 'menu.user.list',
          path: 'userList',
          component: './User',
        },
        {
          name: 'menu.user.add',
          locale: 'menu.user.add',
          path: 'addUser',
          component: './User/addUser',
        },
        {
          name: 'menu.user.edit',
          locale: 'menu.user.edit',
          path: 'editUser/:id',
          component: './User/editUser',
          hideInMenu: true,
        },
      ],
    },
    {
      name: 'menu.interview.parent',
      locale: 'menu.interview.parent',
      path: '/interview',
      icon: 'FileMarkdownOutlined',
      routes: [
        {
          name: 'menu.interview.list',
          locale: 'menu.interview.list',
          path: 'interviewList',
          component: './InterView',
        },
        {
          name: 'menu.interview.add',
          locale: 'menu.interview.add',
          path: 'addInterview',
          component: './InterView/addInterview',
        },
      ],
    },
    {
      name: 'menu.issue.parent',
      locale: 'menu.issue.parent',
      path: '/issue',
      icon: 'FormOutlined',
      routes: [
        {
          name: 'menu.issue.list',
          locale: 'menu.issue.list',
          path: 'interviewList',
          component: './Issue',
        },
      ],
    },
    {
      name: 'menu.comment',
      locale: 'menu.comment',
      path: '/comment',
      component: './Comment',
      icon: 'CommentOutlined',
    },
    {
      name: 'menu.type',
      locale: 'menu.type',
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
