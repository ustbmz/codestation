import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import enUS from 'antd/es/locale/en_US'
import { useEffect, useReducer } from 'react'
import i18n from '../i18n'

export default function AntdLocaleProvider({ children }) {
  const [, bump] = useReducer((c) => c + 1, 0)
  useEffect(() => {
    const fn = () => bump()
    i18n.on('languageChanged', fn)
    return () => i18n.off('languageChanged', fn)
  }, [])
  const locale = i18n.language?.startsWith('en') ? enUS : zhCN
  return <ConfigProvider locale={locale}>{children}</ConfigProvider>
}
