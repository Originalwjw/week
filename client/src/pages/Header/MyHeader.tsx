import { Layout, Switch } from "antd";
import { Header } from "antd/es/layout/layout";
import  {  useContext, useEffect, useState } from "react";
import type { FC, ReactNode } from "react";

import styles from "./Header.module.css";
import { SettingOutlined } from "@ant-design/icons";
import { getLangAPI, setLangAPI } from "@/services/langApi";
import { LangContext } from "@/index"; 
interface IProps {
  children?: ReactNode;
}

const MyHeader: FC<IProps> = () => {
  const { lang, changeLanguage } = useContext(LangContext); 
  const [language, setLanguage] = useState<any>("zh");


  useEffect(() => {
    // 从服务端获取当前语言类型
    const getLanguage = async () => {
      const currentLang = await getLangAPI()
      // console.log('currentLang',currentLang);
      setLanguage(currentLang.data);
    };

    getLanguage();
  }, [language]);
  const langChange=async (checked: boolean) => {
    const newLang = checked ? "zh" : "en";
    setLanguage(newLang);
    await setLangAPI({lang : newLang})
    changeLanguage(newLang);
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
        <h2 className={styles.header}>{lang.title}</h2>
            <div className={styles.setLang} >
              <SettingOutlined /> {lang.setting}   
                <div className={styles.language} >
                  <Switch 
                    defaultChecked 
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
