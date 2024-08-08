import React, { Suspense, useEffect } from 'react';
import { Layout, Flex, Button } from 'antd';
import { Route, Routes } from 'react-router-dom'
import { BlobHeader } from './components/header';
import { RouterMap } from './router';
import { SiderWrap } from './components/sider';
import { useIsShowHeader } from './hooks/useIsShowHeader';
import { useIsShowSider } from './hooks/useIsShowSider';
import { useUserStore } from './zustand/user';
import { useCountStore } from './zustand/count';
import { fetchUpdateUserInfo } from './api/modules/user';
const { Content, Header, Footer, Sider } = Layout;

function App() {
  const { setUserInfo } = useUserStore();
  const { setCountInfo } = useCountStore()
  useEffect(() => {
    setUserInfo(1);
    setCountInfo();
    new PerformanceObserver((list) => {
      const resourceList = [];
      list
        .getEntries()
        // .filter(
        //   (entry: any) =>
        //     entry.initiatorType === 'img' || entry.initiatorType === 'css',
        // )
        .forEach((entry: any) => {
          resourceList.push({
            name: entry.name, // 资源名称
            loadTime: `${(entry.duration / 1000).toFixed(3)}s`, // 资源加载时间
            type: entry.initiatorType, // 资源类型
            size: `${(entry.transferSize / 1024).toFixed(0)}kb`, // 资源大小
          })
          console.log('--', resourceList)
        })
    }).observe({ entryTypes: ['resource'] })
  }, []);

  const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#333',
    height: 64,
    position: 'sticky',
    top: 0,
    zIndex: 100,
    width: '100%',
    paddingInline: 48,
    lineHeight: '64px',
    backgroundColor: '#fff',
  };

  const contentStyle: React.CSSProperties = {
    minHeight: 120,
    maxHeight: '800px',
    // lineHeight: '120px',
    overflowY: 'auto',
    color: '#333',
    width: '60% !important',
    backgroundColor: '#fff',
  };

  const siderStyle: React.CSSProperties = {
    textAlign: 'center',
    lineHeight: '120px',
    color: '#333',
    backgroundColor: '#fff',
    width: '40% !important',
    // flex: 1
  };

  const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#333',
    backgroundColor: 'pink',
  };

  const layoutStyle = {
    borderRadius: 8,
    overflow: 'hidden',
  };


  return (
    <div className="App w-full">
      <Flex gap="middle" wrap>
        {/* <Routes>
          <Route path="/login" element={<Login />}>dengl</Route>
          <Route path="/register" element={<Register />}>zhuce</Route>
        </Routes> */}
        <Layout style={layoutStyle}>
          {useIsShowHeader() && <Header style={headerStyle}>
            <BlobHeader />
                                </Header>}
          <main style={{ display: 'flex', padding: '0 200px' }}>
            <div className='w-7/12'>
            <Suspense fallback={
                <div>路由懒加载...</div>
              }
            >
                <Routes>
                  {
                    RouterMap.map((item, i) => (
                        <Route key={i} path={item.path} element={
                          <item.component />
                        }
                        >
                          {item.children && item.children.map((curr, idx) => (
                              <Route key={idx} path={curr.path} element={<curr.component />} />
                            ))}
                        </Route>
                      ))
                  }
                </Routes>
            </Suspense>
            </div>
            {/* <Content style={contentStyle}>
              <Suspense fallback={
                <div>路由懒加载...</div>
              }>
                <Routes>
                  {
                    RouterMap.map((item, i) => {
                      return (
                        <Route key={i} path={item.path} element={
                          <item.component />
                        }>
                          {item.children && item.children.map((curr, idx) => {
                            return (
                              <Route key={idx} path={curr.path} element={<curr.component />} />
                            )
                          })}
                        </Route>
                      )
                    })
                  }
                </Routes>
              </Suspense>
            </Content> */}
            {useIsShowSider() && <div className='w-5/12 bg-red-50'>
              <SiderWrap />
                                 </div>}
          </main>
          <Footer style={footerStyle}>Footer</Footer>
        </Layout>
      </Flex>
      <Button onClick={async () => {
        const res = await fetchUpdateUserInfo({
          userId: 1,
          name: 'htyhty',
          password: 'Tyr0qa/IoH1he/VELXYxfyRER3FAR6no772HoaJQiZaxXgvhPsi2E6hl+0dcK6MHHqY9OqlcgHOg6UHjB1KDkuqakpTGHi/Ca9l+ZNWK0GpjPiINFzbUpVTnitr19MprZ8ueXbeORQoEOA2etQ/7hUTQaoH/WXpulkypdWxuQkQlAQjdfbF+RInOF8Zm8f1apYhMXHmR0hWJorFPIWVtEWwRoeXRtJAT5uXZLGSU8tOSFtIcOOauOBFfE7Zda9s9aQ3NICF1yE08PeTFR1b2QIA8KgDnRvRVHY9fX04KP8h1FbL0cyOX4kDit4Ft6x2ZCFzVuVqLVgQN9yU5VO86tQ=='.trim(),
        })
        console.log(res.data, 'res.data')
      }}
      >点击测试
      </Button>
    </div>
  );
}

export default App;
