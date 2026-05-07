import React from 'react'
import { NavLink } from 'react-router-dom'
import { Input, Select } from 'antd'
import LoginAvatar from './LoginAvatar'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import i18n from '../i18n'

function NavHeader(props) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const searchFn = (partialName) => {
    if (partialName) {
      navigate(`/searchPage`, {
        state: { partialName },
      })
    }
  }

  const langValue = i18n.language?.startsWith('en') ? 'en' : 'zh'

  return (
    <div className="headerContainer">
      <div className="logoContainer">
        <div className="logo"></div>
      </div>
      <nav className="navContainer">
        <NavLink to="/" className="navgation">
          {t('nav.issues')}
        </NavLink>
        <NavLink to="/books" className="navgation">
          {t('nav.books')}
        </NavLink>
        <NavLink to="/interviews" className="navgation">
          {t('nav.interviews')}
        </NavLink>
        <a
          href="https://duyi.ke.qq.com/"
          className="navgation"
          target="_blank"
          rel="noreferrer"
        >
          {t('nav.video')}
        </a>
      </nav>
      <div className="searchContainer">
        <Input.Group compact>
          <Select defaultValue="issue" size="large" style={{ width: '20%' }}>
            <Select.Option value="issue">{t('search.typeIssue')}</Select.Option>
            <Select.Option value="book">{t('search.typeBook')}</Select.Option>
          </Select>
          <Input.Search
            placeholder={t('search.placeholder')}
            allowClear
            enterButton={t('search.button')}
            size="large"
            style={{
              width: '80%',
            }}
            onSearch={searchFn}
          />
        </Input.Group>
      </div>
      <div
        className="loginBtnContainer"
        style={{ display: 'flex', alignItems: 'center', gap: 12 }}
      >
        <Select
          size="large"
          style={{ width: 120 }}
          value={langValue}
          onChange={(v) => i18n.changeLanguage(v)}
          options={[
            { value: 'zh', label: t('lang.zh') },
            { value: 'en', label: t('lang.en') },
          ]}
          aria-label={t('lang.switch')}
        />
        <LoginAvatar loginHandle={props.loginHandle} />
      </div>
    </div>
  )
}

export default NavHeader
