import React from 'react';

// =================================================================================================
//Application consts
// add 
const Assignments = React.lazy(() => import('./views/Student/assignments'));
const Profile = React.lazy(() => import('./views/Student/Profile'));
const ChangePassword = React.lazy(() => import('./views/Student/changePassword'));



// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  // ===============================================================================================
  // Apps routes

  { path: '/assignments', name: 'Assignments', component: Assignments },
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/change-password', name: 'Change Password', component: ChangePassword },
  
];

export default routes;
