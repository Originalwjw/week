import React, { useCallback, useEffect, useState } from "react";
import {
  DatabaseOutlined,
  SmileOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import MyHeader from "./pages/Header/MyHeader";
import DataIndex from "./pages/Data";
import TagsIndex from "./pages/Tags";

import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

const { Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentRoute, setCurrentRoute] = useState<string[]>(["/data"]);
  const location = useLocation();
  const navigate = useNavigate();

  const items: MenuItem[] = [
    getItem(
      "数据管理",
      "/data",
      <DatabaseOutlined style={{ fontSize: "16px" }} />
    ),
    getItem("标签管理", "/tags", <TagsOutlined style={{ fontSize: "16px" }} />),
  ];

  // 定义路由跳转函数
  const onChangeRoute = useCallback(
    (e: any) => {
      const path = location.pathname;
      setCurrentRoute([path]);
      navigate(e.key, { replace: true });
    },
    [setCurrentRoute, location.pathname, navigate]
  );

  useEffect(() => {
    // 页面刷新时更新currentRoute
    const path = location.pathname;
    setCurrentRoute([path]);
  }, [location.pathname]);

  return (
    <Layout className="wrap">
      <MyHeader />
      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="demo-logo-vertical" />
          <Menu
            style={{
              marginTop: "10px",
              background: "transparent",
              color: "white",
            }}
            selectedKeys={currentRoute}
            mode="inline"
            items={items}
            onClick={onChangeRoute}
          />
        </Sider>
        <Layout>
          <Content>
            <div style={{ padding: 24, minHeight: 360 }}>
              <Routes>
                {/* 设置路由规则和对应的组件 */}
                <Route path="/data" element={<DataIndex />} />
                <Route path="/tags" element={<TagsIndex />} />
                <Route path="/" element={<Navigate to="/data" />} />
                <Route path="/index.html" element={<Navigate to="/data" />} />
                {/* 如果没有匹配的路由，显示一个默认页面 */}
                <Route
                  path="*"
                  element={
                    <div style={{ padding: 24, minHeight: 360 }}>
                      <div style={{ textAlign: "center" }}>
                        <SmileOutlined style={{ fontSize: 20 }} />
                        <p>Page Not Found</p>
                      </div>
                    </div>
                  }
                />
              </Routes>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
