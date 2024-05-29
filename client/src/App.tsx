import React, { useCallback, useEffect, useState, useContext, lazy } from "react";
import { DatabaseOutlined, ExperimentOutlined, SmileOutlined, TagsOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { LangContext } from "./index"; 
const MyHeader = lazy(()=>import('@/pages/Header/MyHeader'))
const DataIndex = lazy(()=>import('@/pages/Data'))
const TagsIndex = lazy(()=>import('@/pages/Tags'))
const ExperienceIndex = lazy(()=>import('@/pages/Experience'))

const { Content,  Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const App: React.FC = () => {
  const { lang } = useContext(LangContext);
  const [collapsed, setCollapsed] = useState(false);
  const [currentRoute, setCurrentRoute] = useState<string[]>(["/experience"]);
  const location = useLocation();
  const navigate = useNavigate();

  const items: MenuItem[] = [
    getItem(lang.learning_experience, "/experience", <ExperimentOutlined style={{ fontSize: "16px" }} />),
    getItem(lang.data_manage, "/data", <DatabaseOutlined style={{ fontSize: "16px" }} />),
    getItem(lang.tags_manage, "/tags", <TagsOutlined style={{ fontSize: "16px" }} />),
  ];

  const onChangeRoute = useCallback(
    (e: any) => {
      const path = location.pathname;
      setCurrentRoute([path]);
      navigate(e.key, { replace: true });
    },
    [setCurrentRoute, location.pathname, navigate]
  );

  useEffect(() => {
    const path = location.pathname;
    setCurrentRoute([path]);
  }, [location.pathname]);

  return (
    <Layout className="wrap">
      <MyHeader />
      <Layout>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="demo-logo-vertical" />
          <Menu
            style={{ marginTop: "10px", background: "transparent", color: "white" }}
            selectedKeys={currentRoute}
            mode="inline"
            items={items}
            theme="dark"
            onClick={onChangeRoute}
          />
        </Sider>
        <Layout>
          <Content>
            <div style={{ padding: 24, minHeight: 360 }}>
              <Routes>
                <Route 
                  path="/experience" 
                  element={
                    <React.Suspense fallback={<div>Loading...</div>}>
                      <ExperienceIndex />
                    </React.Suspense>} />
                <Route 
                  path="/data" 
                  element={
                    <React.Suspense fallback={<div>Loading...</div>}>
                      <DataIndex />
                    </React.Suspense>} />
                <Route 
                  path="/tags" 
                  element={
                    <React.Suspense fallback={<div>Loading...</div>}>
                        <TagsIndex />
                    </React.Suspense>} />
                <Route 
                  path="/" 
                  element={
                    <Navigate to="/experience" />} />
                <Route 
                  path="/index.html" 
                  element={
                    <Navigate to="/experience" />} />
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
