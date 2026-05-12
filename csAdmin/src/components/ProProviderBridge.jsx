import { ProConfigProvider, enUSIntl, zhCNIntl } from '@ant-design/pro-components';
import { getLocale } from '@umijs/max';

/**
 * Syncs @ant-design/pro-* table/form search UI strings with Umi locale (en-US / zh-CN).
 * Uses getLocale (not useIntl): rootContainer runs above Umi's IntlProvider.
 */
export default function ProProviderBridge({ children }) {
  const locale = getLocale();
  const isEn = String(locale || '').toLowerCase().startsWith('en');
  return (
    <ProConfigProvider intl={isEn ? enUSIntl : zhCNIntl}>
      {children}
    </ProConfigProvider>
  );
}
