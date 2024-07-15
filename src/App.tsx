import React, { Suspense } from 'react';
import { Layout, Flex } from 'antd';
import { Route, Routes } from 'react-router-dom'
import { BlobHeader } from './components/header';
import { RouterMap } from './router';
import { useIsShowHeader } from './hooks/useIsShowHeader';
import { useIsShowSider } from './hooks/useIsShowSider';
const { Content, Header, Footer, Sider } = Layout;

function App() {
  const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 48,
    lineHeight: '64px',
    backgroundColor: '#aaa',
  };

  const contentStyle: React.CSSProperties = {
    minHeight: 120,
    maxHeight: '800px',
    lineHeight: '120px',
    overflowY: 'auto',
    color: '#fff',
    backgroundColor: '#ccc',
  };

  const siderStyle: React.CSSProperties = {
    textAlign: 'center',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#333',
    flex: 1
  };

  const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#888',
  };

  const layoutStyle = {
    borderRadius: 8,
    overflow: 'hidden',
  };


  return (
    <div className="App">
      <Flex gap="middle" wrap>
        {/* <Routes>
          <Route path="/login" element={<Login />}>dengl</Route>
          <Route path="/register" element={<Register />}>zhuce</Route>
        </Routes> */}
        <Layout style={layoutStyle}>
         { useIsShowHeader() && <Header style={headerStyle}>
            <BlobHeader />
          </Header>}
          <Layout>
            <Content style={contentStyle}>
              <Suspense fallback={
                <div>路由懒加载...</div>
              }>
                <Routes>
                  {
                    RouterMap.map((item, i) => {
                      return (
                        <Route key={i} path={item.path} element={
                          <item.component />
                        } />
                      )
                    })
                  }
                </Routes>
              </Suspense>
            </Content>
            { useIsShowSider() && <Sider style={siderStyle}>Sider</Sider>}
          </Layout>
          <Footer style={footerStyle}>Footer</Footer>
        </Layout>
      </Flex>
    </div>
  );
}

export default App;
