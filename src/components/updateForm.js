import React, { Component } from 'react';
import {
    Card, CardBody, CardHeader, Form, FormGroup, Label, Input,
    CardFooter, Button,
    Col, Row,Modal,ModalBody,ModalHeader,ModalFooter
} from 'reactstrap';
import Axios from 'axios';
import { css } from '@emotion/core';
// First way to import
import { PulseLoader } from 'react-spinners';
import SweetAlert from 'sweetalert-react';
import sacss from 'sweetalert/dist/sweetalert.css';
import queryString from 'query-string';
import Consts from '../Const';

export default class UpdateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Id:"",
            name: "",
            successsubmit:false,
            submittingData:false,
            successsubmit:false,
            failsubmit:false,
            successMessage:'',
            errorMessage:[],
        }
    }

    updateData = (event) => {
        this.setState({
            [event.target.id]: event.target.value,
        })
    }

    resetFrom = () =>{
        this.setState({
            name:"",
        })
    }

    redirectToList = ()=>{
        window.location="#/"+this.props.route+"/list";
    }

    getData = () =>{
        var params = this.props.props.location.search;
        var id = queryString.parse(params).id
        Axios.get(Consts.BaseUrl+this.props.url+"/"+id)
        .then(res=>{
            console.log(res);
            var data = res.data;
            console.log(data);
            this.setState({
                Id:data.Id,
                name:data[this.props.field],
            })
        })
        .catch(err=>{
            console.log(err);
        })
    }

    submitData = ()=>{
        this.setState({
            submittingData:true,
        })
        var pdata = {
            Id:this.state.Id,
            [this.props.field]:this.state.name,
        }
        console.log(pdata);
        Axios.put(Consts.BaseUrl+this.props.url, pdata)
        .then(res=>{
            this.setState({
                submittingData:false,
                successsubmit:true,
                successMessage:res.data,
            })
            console.log(res);
        })
        .catch(err => {
            console.log(err);
            console.log(err.response);
            if(err.response){
            console.log(err.response.data.ModelState);
            var errors = err.response.data.ModelState;
            var errorArray = Object.values(errors);
            console.log(errorArray);
            var fianlError=[];
            console.log(errorArray.length);
            for(var i=0; i<errorArray.length; i++){
                var singleError =errorArray[i][0];
                console.log(singleError);
                fianlError.push(singleError);
            }
            console.log(fianlError);
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

    componentDidMount(){
        this.getData();
    }

    render() {
        return (
            <Row>
                <Col xs="12" md={{ size: 8, offset: 2 }}>
                    <Card>
                        <CardHeader>
                            <strong>Update {this.props.name}</strong>
                        </CardHeader>
                        <CardBody>
                            <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                                <FormGroup row>
                                    <Col md="3">
                                        <Label>{this.props.name} Name</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input invalid={this.state.validationInput === "Name"} type="text" value={this.state.name} id="name" name="text-input" placeholder="Enter Full Name" onChange={this.updateData} />
                                    </Col>
                                </FormGroup>
                            </Form>
                        </CardBody>
                        <CardFooter className="text-right">
                            <Button onClick={() => { this.submitData() }} size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Update</Button>
                            {' '}
                            <a href={"#/"+this.props.route+"/list"} size="sm" className="btn btn-danger btn-sm"><i className="fa fa-ban"></i> Cancel</a>
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
                            <ModalHeader toggle={this.toggle} clas>
                                <i className='fa fa-close'></i>
                                {"  "}
                                Error
                            </ModalHeader>
                                <ModalBody>
                                    <ul>
                                        {
                                            this.state.errorMessage.map((data,id)=>{
                                                return(
                                                    <li>{data}</li>
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
                            title={this.state.successMessage}
                            // text="SweetAlert in React"
                            onConfirm={() => {
                                this.setState({ successsubmit: false })
                                this.redirectToList();
                                }
                            }
                            onOutsideClick={() => this.setState({ successsubmit: false })}
                        />
                        {/* <SweetAlert
                            show={this.state.failsubmit}
                            title="Error"
                            type="error"
                            // text="SweetAlert in React"
                            onConfirm={() => this.setState({ failsubmit: false })}
                            onOutsideClick={() => this.setState({ successsubmit: false })}
                        /> */}
                        <SweetAlert
                            show={this.state.validationBox}
                            title={this.state.validationMessage}
                            type="warning"
                            // text="SweetAlert in React"
                            onConfirm={() => this.setState({ validationBox: false })}
                            onOutsideClick={() => this.setState({ validationBox: false })}
                        />
            </Row>
        )
    }

}