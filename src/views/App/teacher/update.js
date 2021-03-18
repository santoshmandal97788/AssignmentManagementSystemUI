import React, { Component } from 'react';
import {
    Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, Form, FormGroup, Label, Input, FormText,
    Badge, CardFooter, Button,
    Col, Row, ListGroup, ListGroupItem, Table,Modal,ModalBody,ModalFooter,ModalHeader
} from 'reactstrap';
import Axios from 'axios';
import { css } from '@emotion/core';
// First way to import
import { ClipLoader,PulseLoader,BounceLoader,CircleLoader,FadeLoader,MoonLoader, } from 'react-spinners';
import SweetAlert from 'sweetalert-react';
import sacss from 'sweetalert/dist/sweetalert.css';
import Consts from '../../../Const';
import queryString from 'query-string';

export default class UpdateTeacher extends Component{
    constructor(props){
        super(props);
        this.state={
            Id:'',
            submittingData: false,
            successsubmit:false,
            failsubmit:false,
            Name:'',
            Email:'',
            Phone:'',
            Address:'',
            errorMessage:[],
            successData:''
        }
    }

    setID =()=>{
        var params = this.props.location.search;
        var id = queryString.parse(params).id
        this.setState({
            Id:id,
        })
    }

    updateData = (event) =>{
        this.setState({
            [event.target.id]:event.target.value,
        })
    }

    updateIntData = (event) =>{
        this.setState({
            [event.target.id]:parseInt(event.target.value,10)
        })
    }

    redirectToList = ()=>{
        window.location="#/teacher/list";
    }

    getTeacherData = () =>{
        var params = this.props.location.search;
        var id = queryString.parse(params).id
        Axios.get(Consts.BaseUrl+"Teacher/"+id)
        .then(res=>{
            var data = res.data;
            this.setState({
                Name:data.Name,
                Email:data.Email,
                Phone:data.Phone,
                Address:data.Address,
            })
        })
        .catch(err=>{
            console.log(err);
        })
    }

    submitData = () =>{
        this.setState({
            submittingData:true,
        })
        var pdata = {
            Id:this.state.Id,
            Name:this.state.Name,
            Email:this.state.Email,
            Phone:this.state.Phone,
            Address:this.state.Address,
        };
        var username = 'admin@gmail.com';
        var password = 'Password';
        // var basicAuth = 'Basic' + btoa(username + ':' + password);
        var authorization =  {
                              auth: {
                                username: username,
                                password: password,
                              }
                            };
        Axios.put(Consts.BaseUrl+"Teacher",pdata)
        .then(res=>{
            this.setState({
                submittingData:false,
                successsubmit:true,
                successData:res.data,
            });
        })
        .catch(err => {
            if(err.response){
            var errors = err.response.data.ModelState;
            var errorArray = Object.values(errors);
            var fianlError=[];
            for(var i=0; i<errorArray.length; i++){
                var singleError =errorArray[i][0];
                fianlError.push(singleError);
            }
        }else{
            fianlError=["Failed to connect with server"]
        }

            this.setState({
                submittingData: false,
                failsubmit:true,
                validationInput:'',
                errorMessage:fianlError,
            });
            
        })
    }

    resetInputs = () =>{
        this.setState({
            Name:'',
            Email:'',
            Phone:'',
            Address:'',
        });
    }

    componentDidMount(){
        this.setID();
        this.getTeacherData();
    }
    render(){
        return(
            <Row>
                <Col xs="12" md={{size:8, offset:2}}>
                    <Card>
                    <CardHeader>
                        <strong>Update Teacher</strong>
                    </CardHeader>
                    <CardBody>
                        <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                        <FormGroup row>
                            <Col md="3">
                            <Label>Full Name <span className='text-danger'>*</span></Label>
                            </Col>
                            <Col xs="12" md="9">
                            <Input type="text" id="Name" name="text-input" value={this.state.Name} placeholder="Enter Full Name" onChange={this.updateData} autoComplete="off"/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                            <Label htmlFor="email-input">Email <span className='text-danger'>*</span></Label>
                            </Col>
                            <Col xs="12" md="9">
                            <Input type="email" id="Email" name="email-input" value={this.state.Email} placeholder="Enter Email" autoComplete="email" autoComplete="off" onChange={this.updateData}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                            <Label>Contact Number <span className='text-danger'>*</span></Label>
                            </Col>
                            <Col xs="12" md="9">
                            <Input type="text" id="Phone" name="text-input" value={this.state.Phone} placeholder="Enter Contact Number" autoComplete="off" onChange={this.updateData} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                            <Label>Address <span className='text-danger'>*</span></Label>
                            </Col>
                            <Col xs="12" md="9">
                            <Input type="text" id="Address" value={this.state.Address} name="text-input" placeholder="Enter Address" autoComplete="off" onChange={this.updateData} />
                            </Col>
                        </FormGroup>
                        </Form>
                    </CardBody>
                    <CardFooter className="text-right">
                        <Button onClick={()=>{this.submitData()}} size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Update</Button>
                        {" "}
                        <Button type="reset" size="sm" color="danger" onClick={this.redirectToList}><i className="fa fa-ban"></i> Cancel</Button>
                    </CardFooter>
                    </Card>
                </Col>
                <Modal isOpen={this.state.submittingData} toggle={this.toggle} className={this.props.className}>
                        <ModalBody>
                            <Row>
                                <Col>
                                <h4>
                                    Submitting Data......
                                </h4>
                                
                                </Col>
                                <Col>
                                    <PulseLoader
                                        size={20}
                                        color="#59c9e7"
                                        loading={true}
                                    />
                                </Col>
                            </Row>
                        </ModalBody>
                    </Modal>
                    <Modal isOpen={this.state.failsubmit} toggle={this.toggle} className="modal-danger">
                            <ModalHeader toggle={this.toggle}>
                                <i className='fa fa-close'></i>
                                {"  "}
                                Error
                            </ModalHeader>
                                <ModalBody>
                                    <ul>
                                        {
                                            this.state.errorMessage.map((data,id)=>{
                                                return(
                                                    <li key={id}>{data}</li>
                                                );
                                            })
                                        }
                                    </ul>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" onClick={()=>{this.setState({failsubmit:false})}}>Ok</Button>
                                </ModalFooter>
                        </Modal>
                        <SweetAlert
                            show={this.state.successsubmit}
                            type="success"
                            title={this.state.successData}
                            // text="SweetAlert in React"
                            onConfirm={() => {
                                            this.setState({ successsubmit: false })
                                            this.redirectToList();
                                            }
                                        }
                            onOutsideClick={() => this.setState({ successsubmit: false })}
                        />
                        {/* <SweetAlert
                            show={this.state.validationBox}
                            title={this.state.validationMessage}
                            type="warning"
                            // text="SweetAlert in React"
                            onConfirm={() => this.setState({ validationBox: false })}
                            onOutsideClick={() => this.setState({ validationBox: false })}
                        /> */}
            </Row>
        );
    }
}