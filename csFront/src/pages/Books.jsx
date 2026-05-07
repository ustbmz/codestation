import React from 'react'
import { Result, Button } from 'antd'
import { ToolOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Books = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <Result
      icon={<ToolOutlined style={{ fontSize: 72, color: '#1890ff' }} />}
      title={t('books.title')}
      subTitle={t('books.subtitle')}
      extra={[
        <Button type="primary" key="console" onClick={() => navigate('/')}>
          {t('books.backHome')}
        </Button>,
        <Button
          key="buy"
          onClick={() =>
            window.open('https://github.com/ustbmz/codestation', '_blank')
          }
        >
          {t('books.progress')}
        </Button>,
      ]}
    />
  )
}

export default Books
