import { IRouter } from "./type";
import { lazy } from "react";
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
    component: lazy(():any => import('../pages/messageBoard/index'))
  },
  {
    name: '咖啡屋',
    path: '/enjoy',
    isMenu: true,
    hasSider: true,
    component: lazy(():any => import('../pages/enjoy/index'))
  },
  {
    name: '登录',
    path: '/login',
    isMenu: false,
    hasSider: false,
    component: lazy(():any => import('../pages/login/index'))
  },
  {
    name: '注册',
    path: '/register',
    isMenu: false,
    hasSider: false,
    component: lazy(():any => import('../pages/register/index'))
  },
  {
    name: '编辑',
    path: '/editor',
    isMenu: true,
    hasSider: false,
    component: lazy(():any => import('../pages/articleEditor'))
  },
  {
    name: '文章',
    path: '/article',
    isMenu: true,
    hasSider: true,
    component: lazy(():any => import('../pages/articleItem'))
  },
  {
    name: '分类',
    path: '/category',
    isMenu: true,
    hasSider: true,
    component: lazy(():any => import('../pages/articleCategories'))
  },
]