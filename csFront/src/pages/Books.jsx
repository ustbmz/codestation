import React from 'react';
import { Result, Button } from 'antd';
import { ToolOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Books = () => {
	const navigate = useNavigate();

	return (
    <Result
      icon={<ToolOutlined style={{ fontSize: 72, color: '#1890ff' }} />}
      title="图书页面正在开发中"
      subTitle="我们正在努力为您打造更好的阅读体验，敬请期待！"
      extra={[
        <Button type="primary" key="console" onClick={() => navigate('/')}>
          返回首页
        </Button>,
        <Button
          key="buy"
          onClick={() =>
            window.open('https://github.com/ustbmz/codestation', '_blank')
          }
        >
          查看项目进度
        </Button>,
      ]}
    />
  )
};

export default Books;
