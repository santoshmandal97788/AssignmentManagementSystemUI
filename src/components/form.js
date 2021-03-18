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
import Consts from './../Const';

export default class CreateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
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

    submitData = ()=>{
        this.setState({
            submittingData:true,
        })
        var pdata = {
            [this.props.field]:this.state.name,
        }
        Axios.post(Consts.BaseUrl+this.props.url, pdata)
        .then(res=>{
            this.setState({
                submittingData:false,
                successsubmit:true,
                name:'',
                successMessage:res.data,
            })
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

    render() {
        return (
            <Row>
                <Col xs="12" md={{ size: 8, offset: 2 }}>
                    <Card>
                        <CardHeader>
                            <strong>Add New {this.props.name}</strong>
                        </CardHeader>
                        <CardBody>
                            <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                                <FormGroup row>
                                    <Col md="3">
                                        <Label>{this.props.name} Name <span className='text-danger'>*</span></Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input invalid={this.state.validationInput === "Name"} type="text" value={this.state.name} id="name" name="text-input" placeholder={"Enter "+this.props.name+" Name"} onChange={this.updateData} />
                                    </Col>
                                </FormGroup>
                            </Form>
                        </CardBody>
                        <CardFooter className="text-right">
                            <Button onClick={() => { this.submitData() }} size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                            {' '}
                            <Button onClick = {this.resetFrom} type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
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
                            title={this.state.successMessage}
                            // text="SweetAlert in React"
                            onConfirm={() => this.setState({ successsubmit: false })}
                            onOutsideClick={() => this.setState({ successsubmit: false })}
                        />
            </Row>
        )
    }

}