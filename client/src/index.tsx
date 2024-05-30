import ReactDOM from 'react-dom/client';
import App from './App';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/en';
import './index.css';
import dayjs from 'dayjs';
import { ConfigProvider } from 'antd';
import { getLangAPI } from './services/langApi';
import { setLanguage } from './store/modules/lang';
import zhCN from 'antd/es/locale/zh_CN';
import enUS from 'antd/es/locale/en_US';

// 设置 dayjs 的默认本地化语言为中文
dayjs.locale('zh-cn');

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const initializeApp = async () => {
  //防止页面刷新时，有短暂时间的 中文
  const currentLang = await getLangAPI();
  const locale = currentLang.data;

  store.dispatch(setLanguage(locale));
  dayjs.locale(locale === 'zh' ? 'zh-cn' : 'en');

  root.render(
    <Provider store={store}>
      <ConfigProvider locale={locale === 'zh' ? zhCN : enUS}>
        <Router>
          <App />
        </Router>
      </ConfigProvider>
    </Provider>
  );
};
initializeApp();
