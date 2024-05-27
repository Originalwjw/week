import { Layout, Select, Switch } from "antd";
import { Header } from "antd/es/layout/layout";
import React, { memo, useEffect, useState } from "react";
import type { FC, ReactNode } from "react";

import styles from "./Header.module.css";
import { SettingOutlined } from "@ant-design/icons";
import { getLangAPI, setLangAPI } from "../../services/langApi";
interface IProps {
  children?: ReactNode;
  changeLanguage: (lang: string) => void;
}

const MyHeader: FC<IProps> = ({ changeLanguage }) => {
  const [language, setLanguage] = useState<any>("zh");


  useEffect(() => {
    // 从服务端获取当前语言类型
    const getLanguage = async () => {
      const currentLang = await getLangAPI()
      console.log('currentLang',currentLang);
      
      setLanguage(currentLang.data);
    };

    getLanguage();
  }, [language]);
  const langChange=async (checked: boolean) => {
    const newLang = checked ? "zh" : "en";
    setLanguage(newLang);
    await setLangAPI({lang : newLang})
    changeLanguage(newLang);
    console.log(`Language switched to ${newLang}`);
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
        <h2 className={styles.header}>内容管理平台</h2>
            <div className={styles.setLang} >
              <SettingOutlined /> 设置   
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
