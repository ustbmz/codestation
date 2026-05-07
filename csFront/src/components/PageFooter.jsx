import React from 'react'
import { useTranslation } from 'react-i18next'

function PageFooter(props) {
  const { t } = useTranslation()
    return (
      <div>
        <p className="links">
          <span className="linkItem">{t('footer.friendLinks')}</span>
          <a
            href="https://github.com/ustbmz/codestation"
            target="_blank"
            rel="noreferrer"
            className="linkItem"
          >
            Github
          </a>
          <a
            href="https://ustbmz.github.io/"
            target="_blank"
            rel="noreferrer"
            className="linkItem"
          >
            Blog
          </a>
        </p>
        <p>{t('footer.copyright')}</p>
        <p>{t('footer.powered')}</p>
      </div>
    )
}

export default PageFooter;
