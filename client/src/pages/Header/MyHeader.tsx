import { Layout, Switch } from "antd";
import { Header } from "antd/es/layout/layout";
import  { useEffect } from "react";
import type { FC, ReactNode } from "react";
import styles from "./Header.module.css";
import { SettingOutlined } from "@ant-design/icons";
import { getLangAPI, setLangAPI } from "@/services/langApi";
import { LangState } from '@/store';
import { setLanguage } from '@/store/modules/lang';
import { useDispatch, useSelector } from "react-redux";
interface IProps {
  children?: ReactNode;
}

const MyHeader: FC<IProps> = () => {
  const dispatch = useDispatch();
  const language = useSelector((state: LangState) => state.lang.locale);
  const lang = useSelector((state: LangState) => state.lang.lang);

  useEffect(() => {

    const getLanguage = async () => {
      const currentLang = await getLangAPI()
      // console.log('currentLang',currentLang);
      dispatch(setLanguage(currentLang.data));
    };

    getLanguage();
  }, [dispatch]);

  const langChange=async (checked: boolean) => {
    const newLang = checked ? "zh" : "en";
    await setLangAPI({lang : newLang})
    // changeLanguage(newLang);
    dispatch(setLanguage(newLang));
  }

  return (
    <Layout className="header-layout">
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2 className={styles.headerSet}>{lang.title}</h2>
            <div className={styles.setLang} >
              <SettingOutlined /> {lang.setting}   
                <div className={styles.language} >
                  <Switch 
                    checked={language === 'zh'}
                    checkedChildren="中文" 
                    unCheckedChildren="English" 
                    onChange={langChange}/>
                  
                </div>
            </div>
      </Header>
    </Layout>
  );
};

export default MyHeader;
