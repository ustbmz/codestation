// 运行时配置
import React from 'react';
import { getInfo, getAdminById } from '@/services/AdminController';
import { message } from 'antd';
import { SelectLang, getLocale, getIntl } from '@umijs/max';
import ProProviderBridge from '@/components/ProProviderBridge';

function format(id) {
  try {
    return getIntl(getLocale()).formatMessage({ id });
  } catch (e) {
    return id;
  }
}

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate

export async function getInitialState() {
  if (location.pathname === '/login') {
    const token = localStorage.getItem('adminToken');
    if (token) {
      const result = await getInfo();
      console.log(result, 'result');
      if (result.data) {
        message.warning(format('app.logoutFirst'));
        history.go(-1);
      }
    }
  } else {
    const result = await getInfo();
    console.log('🦊 > file: app.js:26 > getInitialState > result:', result);
    if (result.data) {
      const { data } = await getAdminById(result.data._id);
      console.log('🦊 > file: app.js:31 > getInitialState > data:', data);
      return {
        name: data.nickname,
        avatar: data.avatar,
        adminInfo: data,
      };
    } else {
      localStorage.removeItem('adminToken');
      location.href = '/login';
      message.warning(format('app.relogin'));
    }
  }
}

export const layout = () => {
  return {
    logo: 'https://s2.loli.net/2024/10/28/xMDcGBypClXItV8.png ',
    title: format('layout.siteTitle'),
    menu: {
      locale: true,
    },
    actionsRender: () => [<SelectLang key="SelectLang" />],
    logout: () => {
      localStorage.removeItem('adminToken');
      location.href = '/login';
      message.success(format('app.logoutSuccess'));
    },
  };
};

export const request = {
  timeout: 3000,
  requestInterceptors: [
    function (url, options) {
      const token = localStorage.getItem('adminToken');
      if (token) {
        options.headers['Authorization'] = 'Bearer ' + token;
      }
      return { url, options };
    },
  ],
};

/** Wrap app so ProTable / ProForm search & pagination strings follow Umi language. */
export function rootContainer(container) {
  return React.createElement(ProProviderBridge, null, container);
}
