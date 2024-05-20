import { Layout, Select } from "antd";
import { Header } from "antd/es/layout/layout";
import React, { memo, useEffect, useState } from "react";
import type { FC, ReactNode } from "react";

import styles from "./Header.module.css";
interface IProps {
  children?: ReactNode;
}

const MyHeader: FC<IProps> = () => {
  const [lang, setLang] = useState<any>("中文");
  const handleChangeLang = async (value: string) => {};

  useEffect(() => {
    // 从服务端获取当前语言类型
  }, []);

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
        <Select
          value={lang}
          style={{ width: 100, marginRight: -40 }}
          bordered={false}
          options={[
            { value: "中文", label: "中文" },
            { value: "English", label: "English" },
          ]}
          onChange={handleChangeLang}
        />
      </Header>
    </Layout>
  );
};

export default MyHeader;
