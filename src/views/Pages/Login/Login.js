import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import Axios from 'axios';
import logo from '../../../assets/img/brand/logo.png'
import Consts from "./../../../Const";
import {PulseLoader} from "react-spinners";
import cookie from 'react-cookies'

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      username:'',
      password:'',
      errorData:"",
      token:"",
      loginError:'',
      logginIn:false,
    }
  }
  

  login = () =>{
      // const [cookies, setCookie] = useCookies(['name']);
      this.setState({
        loginError:'',
        logginIn:true,
      })
        // var surl = 'http://localhost:47730/api/Student';
        var username = this.state.username;
        var password = this.state.password;
        const params = new URLSearchParams();
        params.append("username",username);
        params.append("password",password);
        params.append("grant_type","password");
        Axios.post(Consts.MainUrl+"token",params)
        .then(res=>{
            console.log(res);
            var token = res.data.access_token;
            this.setState({
              // isLoaded:true,
              loginError:"",
              logginIn:false,
          });
          cookie.save('token',token);
          if(cookie.load("token")){
            var token = cookie.load("token");
            var config = {
              headers: {'Authorization': "bearer " + token}
            };
            window.location.reload();
          }else{
            this.setState({
              loggedIn:false,
            })
          }
          
        })
        .catch(err=>{
          var loginError;
          if(err.response){
            console.log(err.response.data.error_description);
            loginError= err.response.data.error_description;
          }else{
            loginError = "Cannot connect to server";
          }
            this.setState({
                isLoaded:true,
                loginError:loginError,
                logginIn:false,
            })
        })
  }
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
              <Card className="text-white bg-light py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <img src={logo} className="img-responsive"/>
                      <p className="text-dark h5">Assignment Management</p>
                      
                    </div>
                  </CardBody>
                </Card>
                <Card className="p-4 login-bg">
                  <CardBody>
                    <Form>
                      <h1 className="text-light">Login</h1>
                      <p className="text-light">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Username" autoComplete="username"
                         onChange={e => this.setState({username:e.target.value})}
                         value = {this.state.username} />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" autoComplete="current-password"
                        onChange={e=>{this.setState({password:e.target.value})}}  
                        value = {this.state.password}/>
                      </InputGroup>
                      <Row>
                        <Col xs="12">
                          <Button className="px-4 pull-right btn-orange" onClick ={()=>{this.login()}}>Login</Button>
                        </Col>
                        
                        <div className="login-indicator">
                        <PulseLoader
                          color="#ef7e2d"
                          loading={this.state.logginIn}
                        />
                        <p className="text-danger ">{this.state.loginError}</p>
                       {/* {cookie.load('token')} */}
                        </div>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
