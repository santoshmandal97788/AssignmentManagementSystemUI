import React from 'react';

// =================================================================================================
//Application consts
// add 
const Assignments = React.lazy(() => import('./views/Teacher/assignments'));
const Profile = React.lazy(() => import('./views/Teacher/Profile'));
const ChangePassword = React.lazy(() => import('./views/Teacher/changePassword'));
const StudentList = React.lazy(() => import('./views/Teacher/studentList'));



// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  // ===============================================================================================
  // Apps routes

  { path: '/assignments', name: 'Assignments', component: Assignments },
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/change-password', name: 'Change Password', component: ChangePassword },
  { path: '/show-students', name: 'Change Password', component: StudentList },
  
];

export default routes;
