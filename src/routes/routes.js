import React, { lazy } from 'react';
import { APP_VALUES } from '../constants/app';
import { HomeRedirect } from './RouteUtils';

const RouteController = lazy(() => import('./RouteController'));
const NotFound = lazy(() => import('../components/views/NotFound'));
const Login = lazy(() => import('../components/views/Login'));
const Layout = lazy(() => import('../components/Layout'));
const Dashboard = lazy(() => import('../components/views/Dashboard'));
const Periodos = lazy(() => import('../components/views/Periodos'));
const AutoEvaluaciones = lazy(() => import('../components/views/AutoEvaluaciones'));

const routes = [
  {
    path: '/',
    exact: true,
    component: HomeRedirect
  },
  {
    path: '/login',
    exact: true,
    component: Login
  },
  {
    path: `/${APP_VALUES.ROOT_ROUTE}`,
    component: Layout,
    routes: [
      {
        path: `/${APP_VALUES.ROOT_ROUTE}`,
        exact: true,
        component: RouteController
      },
      {
        path: `/${APP_VALUES.ROOT_ROUTE}/autoevaluaciones`,
        exact: true,
        component: AutoEvaluaciones
      },
      {
        path: `/${APP_VALUES.ROOT_ROUTE}/periodos`,
        exact: true,
        component: Periodos
      },
      {
        path: `/${APP_VALUES.ROOT_ROUTE}/*`,
        exact: true,
        component: NotFound
      },
    ]
  },
  {
    path: '*',
    component: NotFound
  }
];

export default routes;
