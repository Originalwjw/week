import React, { createContext, useState } from 'react'
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
import langConfig from './lang.config';
// 设置 dayjs 的默认本地化语言为中文
dayjs.locale('zh-cn')
interface LangContextProps {
  lang: typeof langConfig['zh'] | typeof langConfig['en'];
  changeLanguage: (langCode: string) => void;
}

const defaultLangContext: LangContextProps = {
  lang: langConfig.zh,
  changeLanguage: () => {},
};

export const LangContext = createContext<LangContextProps>(defaultLangContext);
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const MainApp = () => {
  const [locale, setLocale] = useState(zhCN);
  const [lang, setLang] = useState(langConfig.zh);

  const changeLanguage = (lang: string) => {
    if (lang === 'zh') {
      dayjs.locale('zh-cn');
      setLocale(zhCN);
      setLang(langConfig.zh);
    } else {
      dayjs.locale('en');
      setLocale(enUS);
      setLang(langConfig.en);
    }
  };

  return (
    <ConfigProvider locale={locale}>
      <LangContext.Provider value={{ lang, changeLanguage }}>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
      </LangContext.Provider>
    </ConfigProvider>
  );
};

root.render(<MainApp />);