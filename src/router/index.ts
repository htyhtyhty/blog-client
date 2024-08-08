import React, { lazy } from 'react';
import { LaptopOutlined } from '@ant-design/icons';
import { IRouter } from './type';

export const RouterMap: IRouter[] = [
  {
    name: '文章',
    path: '/',
    isMenu: true,
    hasSider: true,
    component: lazy(():any => import('../pages/articleHome/index')),
  },
  {
    name: '留言',
    path: '/message',
    isMenu: true,
    hasSider: true,
    component: lazy(():any => import('../pages/messageBoard/index')),
  },
  {
    name: '咖啡屋',
    path: '/enjoy',
    isMenu: true,
    hasSider: true,
    component: lazy(():any => import('../pages/enjoy/index')),
  },
  {
    name: '登录',
    path: '/login',
    isMenu: false,
    hasSider: false,
    component: lazy(():any => import('../pages/login/index')),
  },
  {
    name: '注册',
    path: '/register',
    isMenu: false,
    hasSider: false,
    component: lazy(():any => import('../pages/register/index')),
  },
  {
    name: '编辑',
    path: '/editor',
    isMenu: true,
    hasSider: false,
    component: lazy(():any => import('../pages/articleEditor')),
  },
  {
    name: '文章',
    path: '/article',
    isMenu: true,
    hasSider: true,
    component: lazy(():any => import('../pages/articleItem')),
  },
  {
    name: '分类',
    path: '/category',
    isMenu: true,
    hasSider: true,
    component: lazy(():any => import('../pages/articleCategories')),
  },
  {
    name: '后台管理',
    path: '/backstageManagement',
    isMenu: false,
    hasSider: false,
    component: lazy(():any => import('../pages/backstageManagement')),
    children: [
      {
        name: '编辑',
        path: 'articleEditor',
        isMenu: false,
        hasSider: false,
        component: lazy(():any => import('../pages/articleEditor')),
      },
      {
        name: '文章列表',
        path: 'articleList',
        isMenu: false,
        hasSider: false,
        component: lazy(():any => import('../pages/backstageManagement/articleList')),
      },
      {
        name: '单篇文章',
        path: 'articleItem',
        isMenu: false,
        hasSider: false,
        component: lazy(():any => import('../pages/backstageManagement/articleItem')),
      },
      {
        name: '文章分类',
        path: 'category',
        isMenu: false,
        hasSider: false,
        component: lazy(():any => import('../pages/backstageManagement/category')),
      },
      {
        name: '视频管理',
        path: 'video',
        isMenu: false,
        hasSider: false,
        component: lazy(():any => import('../pages/backstageManagement/videoList')),
      },
    ],
  },

]

export const backstageMenu = [
  {
    key: '/backstageManagement',
    icon: React.createElement(LaptopOutlined),
    label: '首页',
  },
  {
    key: '/backstageManagement/articleList',
    icon: React.createElement(LaptopOutlined),
    label: '文章',
  },
  {
    key: '/backstageManagement/category',
    icon: React.createElement(LaptopOutlined),
    label: '分类',
  },
  {
    key: '/backstageManagement/video',
    icon: React.createElement(LaptopOutlined),
    label: '视频',
  },
  {
    key: '说说',
    icon: React.createElement(LaptopOutlined),
    label: '说说',
  },
]
