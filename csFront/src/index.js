import React from 'react'
import ReactDOM from 'react-dom/client'
import './i18n'
import App from './App'
import AntdLocaleProvider from './components/AntdLocaleProvider'

import 'antd/dist/antd.min.css'
import './index.css'

import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <AntdLocaleProvider>
        <App />
      </AntdLocaleProvider>
    </BrowserRouter>
  </Provider>
)
