import React from 'react';

const Breadcrumbs = React.lazy(() => import('./views/Base/Breadcrumbs'));
const Home = React.lazy(() => import('./views/App/Home'));
const Cards = React.lazy(() => import('./views/Base/Cards'));
const Carousels = React.lazy(() => import('./views/Base/Carousels'));
const Collapses = React.lazy(() => import('./views/Base/Collapses'));
const Dropdowns = React.lazy(() => import('./views/Base/Dropdowns'));
const Forms = React.lazy(() => import('./views/Base/Forms'));
const Jumbotrons = React.lazy(() => import('./views/Base/Jumbotrons'));
const ListGroups = React.lazy(() => import('./views/Base/ListGroups'));
const Navbars = React.lazy(() => import('./views/Base/Navbars'));
const Navs = React.lazy(() => import('./views/Base/Navs'));
const Paginations = React.lazy(() => import('./views/Base/Paginations'));
const Popovers = React.lazy(() => import('./views/Base/Popovers'));
const ProgressBar = React.lazy(() => import('./views/Base/ProgressBar'));
const Switches = React.lazy(() => import('./views/Base/Switches'));
const Tables = React.lazy(() => import('./views/Base/Tables'));
const Tabs = React.lazy(() => import('./views/Base/Tabs'));
const Tooltips = React.lazy(() => import('./views/Base/Tooltips'));
const BrandButtons = React.lazy(() => import('./views/Buttons/BrandButtons'));
const ButtonDropdowns = React.lazy(() => import('./views/Buttons/ButtonDropdowns'));
const ButtonGroups = React.lazy(() => import('./views/Buttons/ButtonGroups'));
const Buttons = React.lazy(() => import('./views/Buttons/Buttons'));
const Charts = React.lazy(() => import('./views/Charts'));
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const CoreUIIcons = React.lazy(() => import('./views/Icons/CoreUIIcons'));
const Flags = React.lazy(() => import('./views/Icons/Flags'));
const FontAwesome = React.lazy(() => import('./views/Icons/FontAwesome'));
const SimpleLineIcons = React.lazy(() => import('./views/Icons/SimpleLineIcons'));
const Alerts = React.lazy(() => import('./views/Notifications/Alerts'));
const Badges = React.lazy(() => import('./views/Notifications/Badges'));
const Modals = React.lazy(() => import('./views/Notifications/Modals'));
const Colors = React.lazy(() => import('./views/Theme/Colors'));
const Typography = React.lazy(() => import('./views/Theme/Typography'));
const Widgets = React.lazy(() => import('./views/Widgets/Widgets'));
const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));


// =================================================================================================
//Application consts
// add 
const add = React.lazy(() => import('./views/App/add'));
const list = React.lazy(() => import('./views/App/list'));

// student
const AddStudent = React.lazy(() => import('./views/App/student/create'));
const ListStudent = React.lazy(() => import('./views/App/student'));
const UpdateStudent = React.lazy(() => import('./views/App/student/update'));
const ShowStudent = React.lazy(() => import('./views/App/student/show'));

// teacher
const AddTeacher = React.lazy(() => import('./views/App/teacher/create'));
const ListTeacher = React.lazy(() => import('./views/App/teacher/index'));
const UpdateTeacher = React.lazy(() => import('./views/App/teacher/update'));

// Year Batch
const ListYear = React.lazy(() => import('./views/App/Year'));
const AddYear = React.lazy(() => import('./views/App/Year/create'));
const UpdateYear = React.lazy(() => import('./views/App/Year/update'));

// Faculty
const ListFaculty = React.lazy(() => import('./views/App/faculty'));
const AddFaculty = React.lazy(() => import('./views/App/faculty/create'));
const UpdateFaculty = React.lazy(() => import('./views/App/faculty/update'));

// semester
const AddSemester = React.lazy(() => import('./views/App/semester/create'));
const ListSemester = React.lazy(() => import('./views/App/semester'));
const UpdateSemester = React.lazy(() => import('./views/App/semester/update'));

// Section
const AddSection = React.lazy(() => import('./views/App/section/create'));
const ListSection = React.lazy(() => import('./views/App/section'));
const UpdateSection = React.lazy(() => import('./views/App/section/update'));

// routine
const AddRoutine = React.lazy(() => import('./views/App/routine/create'));
const ListRoutine = React.lazy(() => import('./views/App/routine'));
const UpdateRoutine = React.lazy(() => import('./views/App/routine/update'));

// Assignment
const AddAssignment = React.lazy(() => import('./views/App/assignment/create'));
const AddLateAssignment = React.lazy(() => import('./views/App/assignment/createLate'));
const ListAssignment = React.lazy(() => import('./views/App/assignment'));
const ListAssignmentByStudent = React.lazy(() => import('./views/App/assignment/listByStudent'));
const ListAssignmentByRoutine = React.lazy(() => import('./views/App/assignment/listByRoutine'));
const UpdateAssignment = React.lazy(() => import('./views/App/assignment/update'));
// const ListStudent = React.lazy(() => import('./views/App/List/Student'));

const FileUpload = React.lazy(() => import('./views/App/fileupload'));


// Shift Student
const ShiftStudent = React.lazy(() => import('./views/App/shiftStudents'));


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  // { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/home', name: 'Home', component: Home },
  { path: '/theme', exact: true, name: 'Theme', component: Colors },
  { path: '/theme/colors', name: 'Colors', component: Colors },
  { path: '/theme/typography', name: 'Typography', component: Typography },
  { path: '/base', exact: true, name: 'Base', component: Cards },
  { path: '/base/cards', name: 'Cards', component: Cards },
  { path: '/base/forms', name: 'Forms', component: Forms },
  { path: '/base/switches', name: 'Switches', component: Switches },
  { path: '/base/tables', name: 'Tables', component: Tables },
  { path: '/base/tabs', name: 'Tabs', component: Tabs },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/base/carousels', name: 'Carousel', component: Carousels },
  { path: '/base/collapses', name: 'Collapse', component: Collapses },
  { path: '/base/dropdowns', name: 'Dropdowns', component: Dropdowns },
  { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  { path: '/base/navbars', name: 'Navbars', component: Navbars },
  { path: '/base/navs', name: 'Navs', component: Navs },
  { path: '/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/base/popovers', name: 'Popovers', component: Popovers },
  { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  { path: '/buttons', exact: true, name: 'Buttons', component: Buttons },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  { path: '/buttons/button-dropdowns', name: 'Button Dropdowns', component: ButtonDropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/font-awesome', name: 'Font Awesome', component: FontAwesome },
  { path: '/icons/simple-line-icons', name: 'Simple Line Icons', component: SimpleLineIcons },
  { path: '/notifications', exact: true, name: 'Notifications', component: Alerts },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/notifications/badges', name: 'Badges', component: Badges },
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  { path: '/widgets', name: 'Widgets', component: Widgets },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },

  // ===============================================================================================
  // Apps routes

  { path: '/add', exact: true, name: 'Add New', component: add },
  { path: '/list', exact: true, name: 'Add New', component: list },

  { path: '/add-new', exact: true, name: 'Add New', component: AddStudent },
  { path: '/student', exact: true, name: 'Student', component: ListStudent },
  { path: '/student/list', exact: true, name: 'Student', component: ListStudent },
  { path: '/student/add', exact: true, name: 'Add Student', component: AddStudent },
  { path: '/student/update', exact: true, name: 'Update Student', component: UpdateStudent },
  { path: '/student/show', exact: true, name: 'Show Student', component: ShowStudent },

  { path: '/teacher', exact: true, name: 'Teacher', component: ListTeacher },
  { path: '/teacher/list', exact: true, name: 'Teacher', component: ListTeacher },
  { path: '/teacher/add', exact: true, name: 'Add Teacher', component: AddTeacher },
  { path: '/teacher/update', exact: true, name: 'Add Teacher', component: UpdateTeacher },
  
  { path: '/faculty', exact: true, name: 'Faculty', component: ListFaculty },
  { path: '/faculty/list', exact: true, name: 'Faculty', component: ListFaculty },
  { path: '/faculty/add', exact: true, name: 'Add Faculty', component: AddFaculty },
  { path: '/faculty/update', exact: true, name: 'Update Faculty', component: UpdateFaculty },

  { path: '/year', exact: true, name: 'Faculty', component: ListYear},
  { path: '/year/list', exact: true, name: 'Faculty', component: ListYear },
  { path: '/year/add', exact: true, name: 'Add Faculty', component: AddYear },
  { path: '/year/update', exact: true, name: 'Update Faculty', component: UpdateYear },

  { path: '/semester', exact: true, name: 'Semester', component: ListSemester },
  { path: '/semester/list', exact: true, name: 'Semester', component: ListSemester },
  { path: '/semester/add', exact: true, name: 'Add Semester', component: AddSemester },
  { path: '/semester/update', exact: true, name: 'Update Semester', component: UpdateSemester},

  { path: '/section', exact: true, name: 'Section', component: ListSection },
  { path: '/section/list', exact: true, name: 'Section', component: ListSection },
  { path: '/section/add', exact: true, name: 'Add Section', component: AddSection },
  { path: '/section/update', exact: true, name: 'Update Section', component: UpdateSection },

  { path: '/routine', exact: true, name: 'Routine', component: ListRoutine },
  { path: '/routine/list', exact: true, name: 'Routine', component: ListRoutine },
  { path: '/routine/add', exact: true, name: 'Add Routine', component: AddRoutine },
  { path: '/routine/update', exact: true, name: 'Update Routine', component: UpdateRoutine},

  { path: '/assignment', exact: true, name: 'list Assignment', component: ListAssignment },
  { path: '/assignment/list', exact: true, name: 'list Assignment', component: ListAssignment },
  { path: '/assignment/list-by-student', exact: true, name: 'list assignment by student', component: ListAssignmentByStudent },
  { path: '/assignment/list-by-routine', exact: true, name: 'list assignment by routine', component: ListAssignmentByRoutine },
  { path: '/assignment/add', exact: true, name: 'Add Assignment', component: AddAssignment },
  { path: '/assignment/late-add', exact: true, name: 'Add Assignment', component: AddLateAssignment},
  { path: '/assignment/update', exact: true, name: 'Update Assignment', component: UpdateAssignment },
  
  { path: '/shift-students', exact: true, name: 'Shift Students', component: ShiftStudent},
  { path: '/file', exact: true, name: 'file', component: FileUpload},
];

export default routes;
