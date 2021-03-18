import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import cookie from 'react-cookies'


import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
import studentNavigation from '../../_navstudent';
import teacherNavigation from '../../_navteacher';
// routes config
import routes from '../../routes';
import routesStudent from '../../routesStudent';
import routesTeacher from '../../routesTeacher';
import Axios from "axios";
import Consts from "./../../Const";

// const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));
const DefaultHeader2 = React.lazy(() => import('./DefaultHeader2'));
const DefaultHeader3 = React.lazy(() => import('./DefaultHeader3'));

class DefaultLayout extends Component {
  
  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut(e) {
    e.preventDefault()
    cookie.remove("token");
    // 
    window.location.reload();
  }

  getRoles = ()=>{
    Axios.get(Consts.BaseUrl+"role")
  }

  setRole = ()=>{
    this.setState({
      role:this.props.role,
    });
  }

  renderDefaultHeader = (role) =>{
    if(role==0){
      return(
        <DefaultHeader onLogout={e=>this.signOut(e)}/>
      )
    }
    if(role==1){
      return(
        <DefaultHeader2 onLogout={e=>this.signOut(e)}/>
      )
    }
    if(role==3){
      return(
        <DefaultHeader3 onLogout={e=>this.signOut(e)}/>
      )
    }
    return(
      <DefaultHeader3 onLogout={e=>this.signOut(e)}/>
    )
  }
 

  render() {
    var role = this.props.role;
    var navs;
    var mainRoutes;
    var redirection;

    if(role==0){
      navs = navigation;
      mainRoutes = routes;
      redirection = "/dashboard";
    }
    if(role==1){
      navs = teacherNavigation;
      mainRoutes = routesTeacher;
      redirection = "/assignments";
    }
    if(role==2){
      navs = studentNavigation;
      mainRoutes = routesStudent;
      redirection = "/assignments";
    }
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense  fallback={this.loading()}>
            {/* <DefaultHeader onLogout={e=>this.signOut(e)}/> */}
            {this.renderDefaultHeader(role)}
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
            <AppSidebarNav navConfig={navs} {...this.props} />
            </Suspense>
            {/* <AppSidebarFooter /> */}
            {/* <AppSidebarMinimizer /> */}
          </AppSidebar>
          <main className="main">
            {/* <AppBreadcrumb appRoutes={routes}/> */}
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {mainRoutes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })}
                  <Redirect from="/" to={redirection}/>
                </Switch>
              </Suspense>
            </Container>
          </main>
          {/* <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside> */}
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
        </div>
    );
  }
}

export default DefaultLayout;
