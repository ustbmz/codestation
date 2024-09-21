import React from 'react';

function PageFooter(props) {
    return (
      <div>
        <p className="links">
          <span className="linkItem">友情链接：</span>
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
        <p>© 2024 - Coder Station</p>
        <p>Powered React</p>
      </div>
    )
}

export default PageFooter;
