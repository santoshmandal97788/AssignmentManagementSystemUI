import React from 'react';

const Login = React.lazy(() => import('./views/Pages/Login/Login'));

const routes = [
  // { path: '/', exact: true, name: 'Home' },
  { path: '/login', name: 'Dashboard', component: Login },
];

export default routes;
