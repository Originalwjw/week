import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { HashRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import dayjs from 'dayjs'
import { ConfigProvider } from 'antd';
import 'dayjs/locale/zh-cn'
import 'dayjs/locale/en'
import './index.css'
import zhCN from 'antd/es/locale/zh_CN';
import enUS from 'antd/es/locale/en_US';
// 设置 dayjs 的默认本地化语言为中文
dayjs.locale('zh-cn')

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
// root.render(
//   <Provider store={store}>
//     <ConfigProvider locale={lang}>
//       <Router>
//         <App />
//       </Router>
//     </ConfigProvider>
//   </Provider>
// )
const MainApp = () => {
  const [locale, setLocale] = useState(zhCN);

  const changeLanguage = (lang: string) => {
    if (lang === 'zh') {
      dayjs.locale('zh-cn');
      setLocale(zhCN);
    } else {
      dayjs.locale('en');
      setLocale(enUS);
    }
  };

  return (
    <ConfigProvider locale={locale}>
      <Provider store={store}>
        <Router>
          <App changeLanguage={changeLanguage} />
        </Router>
      </Provider>
    </ConfigProvider>
  );
};

root.render(<MainApp />);