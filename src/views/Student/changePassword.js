import React, { Component } from 'react';
// import Datatable from "../../../components/datatable";
import Axios from "axios";
// import Consts from "../../../Const";
import {Modal,ModalBody,ModalFooter,ModalHeader,Form,Label,Table,Button,Row,Col,Card,CardBody,CardFooter,CardHeader,FormGroup,Input} from "reactstrap";
import {PulseLoader} from "react-spinners";
import SweetAlert from "sweetalert-react";
import sacss from 'sweetalert/dist/sweetalert.css';
import Select from "react-select";
import dateFormat from "dateformat";
import Consts from '../../Const';

export default class ChangePassword extends Component{
    constructor(props){
        super(props)
        this.state={
            oldPassword:'',
            newPassword:'',
            confirmPassword:'',
            successsubmit:false,
            submittingData:false,
            failsubmit:false,
            successMessage:'',
            errorMessage:[],
        }
    }

    redirectToList = ()=>{
        window.location="#/";
    }

    updateData = (event) => {
        this.setState({
            [event.target.id]: event.target.value,
        })
    }

    submitData = ()=>{
        var pdata={
            OldPassword:this.state.oldPassword,
            NewPassword:this.state.newPassword,
            ConfirmNewPassword:this.state.confirmPassword
          }
          Axios.post(Consts.BaseUrl+"Mobile/ChangePassword",pdata)
          .then(res=>{
              console.log(res);
            this.setState({
              submittingData:false,
              successsubmit:true,
              successMessage:res.data.Message,
            })
          })
          .catch(err=>{
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

    render(){
        return(
            <Row>
                <Col xs="12" md={{ size: 8, offset: 2 }}>
                    <Card>
                        <CardHeader>
                            <strong>Change Password</strong>
                        </CardHeader>
                        <CardBody>
                            <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                                <FormGroup row>
                                    <Col md="3">
                                        <Label>{this.props.name} Old Password <span className='text-danger'>*</span></Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="password"  id="oldPassword" name="text-input" value={this.state.oldPassword} placeholder="Old Password" onChange={this.updateData} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label>{this.props.name} New Password <span className='text-danger'>*</span></Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="password"  id="newPassword" name="text-input" value={this.state.newPassword} placeholder="New Password" onChange={this.updateData} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label>{this.props.name} Confirm Password <span className='text-danger'>*</span></Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="password"  id="confirmPassword" name="text-input" value={this.state.confirmPassword} placeholder="Confirm Password" onChange={this.updateData} />
                                    </Col>
                                </FormGroup>
                            </Form>
                        </CardBody>
                        <CardFooter className="text-right">
                            <Button onClick={() => { this.submitData() }} size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Change</Button>
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
                            onConfirm={() => {this.setState({ successsubmit: false });
                                                this.redirectToList()}}
                            onOutsideClick={() => this.setState({ successsubmit: false })}
                        />
            </Row>
        )
    }
}