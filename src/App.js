import React, { Component } from 'react';
import { HashRouter, Route, Switch,Redirect } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import './App.scss';
import cookie from 'react-cookies'
import Axios from "axios";
import Consts from "./Const";
import {PulseLoader} from "react-spinners";

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/Pages/Login'));

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      loggedIn:false,
      loading:true,
      role:"",
    }
  }


  renderRoutes=()=>{
    if(cookie.load("token")){
      var token = cookie.load("token");
      var config = {
        headers: {'Authorization': "bearer " + token}
      };
      Axios.get(Consts.BaseUrl+"role",config)
      .then(res=>{
        console.log(res.data.Data.userRole);
        var role = res.data.Data.userRole;
        this.setState({
          loggedIn:true,
          loading:false,
          role:role,
        },()=>{
          console.log("token is common");
          Axios.defaults.headers.common['Authorization'] = "bearer "+token;
        });
      })
      .catch(err=>{
        console.log(err.response);
        console.log(err);
        console.log("inside error");
        this.setState({
          loggedIn:false,
          loading:false,
        })
      })
    }else{
      this.setState({
        loggedIn:false,
        loading:false,
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.renderRoutes();
    }
  }
  componentDidMount(){
    this.renderRoutes();
  }

  render() {
    if(this.state.loading==true){
      return(
        <div className="text-center" style={{width:"100%",height:"70vh",display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <PulseLoader
                     size={40}
                     color="#ef7e2d"
                     loading={true}
                    />  
                </div>
      )
    }
    if(this.state.loggedIn==true){
      return (
        <HashRouter>
            <React.Suspense fallback={loading()}>
              <Switch>
                {/* <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} /> */}
                {/* <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
                <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
                <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} /> */}
                <Route path="/" name="abc" render={props => <DefaultLayout role= {this.state.role} {...props}/>} />
              </Switch>
            </React.Suspense>
        </HashRouter>
      );
    }else{
      return (
        <HashRouter>
            <React.Suspense fallback={loading()}>
              <Switch>
                <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
                <Redirect from="/" to="/login"/>
                {/* <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
                <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
                <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} /> */}
                {/* <Route path="/" name="hi" render={props => <DefaultLayout {...props}/>} /> */}
              </Switch>
            </React.Suspense>
        </HashRouter>
      );
    }
    
  }
}

export default App;
