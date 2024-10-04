import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Result } from 'antd';
import RouteConfig from './index.jsx';
import RouteBeforeConfig from './RouteBeforeConfig.js';

function RouteBefore() {
  const location = useLocation();
  const navigate = useNavigate();

  console.log(location.pathname, 'RouteBefore');
  const currentPath = RouteBeforeConfig.find(
    (item) => item.path === location.pathname
  );
  console.log('🐤 ≂ currentPath:', currentPath);

  if (currentPath && currentPath.needLogin && !localStorage.getItem('userToken')) {
    return (
      <Result
        status="403"
        title="需要登录"
        subTitle="您需要登录才能访问此页面"
        extra={
          <Button type="primary" onClick={() => navigate('/')}>
            返回首页
          </Button>
        }
      />
    );
  }

  return <RouteConfig />;
}

export default RouteBefore;
