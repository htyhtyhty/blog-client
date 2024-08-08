import React, {useState} from 'react';
import { Layout, Breadcrumb, Menu } from 'antd';
import { Header as InnerHeader } from './components/header';
import { Layout as InnerLayout } from './components/layout';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import {useNavigate} from 'react-router';
import { backstageMenu } from 'src/router';
import { Outlet } from 'react-router-dom';
import type { MenuProps } from 'antd';
const { Content, Header, Footer, Sider } = Layout;
const BackstageManagement = () => {
  const navigate = useNavigate();
  const stepToMenu = (path:string) => {
    navigate(path);
  }
  return <>
  <Layout>
    <Header className="header" style={{backgroundColor: '#fff'}}>
      <InnerHeader />
    </Header>
    <Layout>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }} 
          items={backstageMenu}
          onClick={(e) => stepToMenu(e.key)}
        />
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  </Layout>
    </>
}
export default BackstageManagement;