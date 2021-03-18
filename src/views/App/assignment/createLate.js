import React, { Component } from 'react';
import {
    Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, Form, FormGroup, Label, Input, FormText,
    Badge, CardFooter, Button,
    Col, Row, ListGroup, ListGroupItem, Table,Modal,ModalBody,ModalHeader,ModalFooter,CardTitle
} from 'reactstrap';
import Axios from 'axios';
import { css } from '@emotion/core';
// First way to import
import { ClipLoader,PulseLoader,BounceLoader,CircleLoader,FadeLoader,MoonLoader, } from 'react-spinners';
import SweetAlert from 'sweetalert-react';
import sacss from 'sweetalert/dist/sweetalert.css';
import Consts from '../../../Const';
import Select from "react-select";

export default class AddLateAssignment extends Component{
    constructor(props){
        super(props);
        this.state={
            submittingData: false,
            successsubmit:false,
            failsubmit:false,
            ddassignment:[],
            ddstudent:[],
            ddYear:[],
            ddfaculty:[],
            ddsemester:[],
            ddsection:[],
            selectedAssignment:'',
            selectedStudent:'',
            Assignment_Id:'',
            Student_Id:'',
            Year_Batch_Id:"",
            Faculty_Id:'',
            rSemester_Id:'',
            rSection_Id:'',
            sSemester_Id:'',
            sSection_Id:'',
            errorMessage:[],
        }
    }

    updateData = (event) =>{
        this.setState({
            [event.target.id]:event.target.value,
        },()=>{
            this.getStudentAndRoutine();
        })
        
    }

    updateIntData = (event) =>{
        this.setState({
            [event.target.id]:parseInt(event.target.value,10)
        },()=>{
            this.getStudentAndRoutine();
        })
        
    }

    getStudentAndRoutine = ()=>{
        if((this.state.Year_Batch_Id&&this.state.Faculty_Id&&this.state.rSemester_Id&&this.state.rSection_Id)!=""){
            console.log("inside r")
            this.getAssignment();
        }
        if((this.state.Year_Batch_Id&&this.state.Faculty_Id&&this.state.sSemester_Id&&this.state.sSection_Id)!=""){
            console.log("inside s")
            this.getStudent();
        }
    }

    updateAssignment = (event)=>{
        // console.log(event);
        this.setState({
            selectedAssignment:event,
            Assignment_Id:event.value,
        })
        console.log(this.state.Assignment_Id);
    }

    updateStudent = (event)=>{
        // console.log(event);
        this.setState({
            selectedStudent:event,
            Student_Id:event.value,
        })
        console.log(this.state.Student_Id);
    }

    getAssignment = () =>{
        Axios.get(Consts.BaseUrl+"AssignmentRoutine?year="+this.state.Year_Batch_Id+"&&faculty="+this.state.Faculty_Id+"&&semester="+this.state.rSemester_Id+"&&section="+this.state.rSection_Id)
        .then(res=>{
            var data = res.data;
            var ddassignment=[];
            for(var i=0; i<data.length; i++){
                var singleAssignment = {}
                singleAssignment.value=data[i].Id;
                singleAssignment.label=data[i].Assignment_Name;
                ddassignment.push(singleAssignment);
            }
            this.setState({
                ddassignment:ddassignment,
            })
        })
        .catch(err=>{
            console.log(err);
        });
    }

    getStudent = () =>{
        Axios.get(Consts.BaseUrl+"Student?year="+this.state.Year_Batch_Id+"&&faculty="+this.state.Faculty_Id+"&&semester="+this.state.sSemester_Id+"&&section="+this.state.sSection_Id)
        .then(res=>{
            var data = res.data;
            var ddstudent=[];
            for(var i=0; i<data.length; i++){
                var singleStudent = {}
                singleStudent.value=data[i].Id;
                singleStudent.label=data[i].Name+" ("+data[i].Email+" )";
                ddstudent.push(singleStudent);
            }
            this.setState({
                ddstudent:ddstudent,
            })
        })
        .catch(err=>{
            console.log(err);
        });
    }

    submitData = () =>{
        this.setState({
            submittingData:true,
        })
        var pdata = {
            Routine_Id:this.state.Assignment_Id,
            Student_Id:this.state.Student_Id,
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
        Axios.post(Consts.BaseUrl+"SubmittedAssignment",pdata)
        .then(res=>{

            this.setState({
                submittingData:false,
                successsubmit:true
            });
            this.resetInputs();
        })
        .catch(err => {
            console.log(err.response);
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
                errorMessage:fianlError,
            });
            
        })
    }

    resetsa = () =>{
        this.setState({
            selectedAssignment:"",
            selectedStudent:"",
            Student_Id:'',
            Assignment_Id:'',
        })
    }

    resetInputs = () =>{
        this.setState({
            selectedAssignment:"",
            selectedStudent:"",
            Assignment_Id:'',
            Student_Id:'',
            Year_Batch_Id:'',
            Section_Id:'',
            Faculty_Id:'',
            rSemester_Id:'',
            sSemester_Id:'',
            rSection_Id:'',
            sSection_Id:'',
            ddstudent:[],
            ddassignment:[],
        });
    }

    getFaculty = () =>{
        Axios.get(Consts.BaseUrl+"Faculty/List")
        .then(res=>{
            this.setState({
                ddfaculty:res.data,
            })
        })
        .catch(err=>{
            console.log(err);
        });
    }

    getSemester = () =>{
        Axios.get(Consts.BaseUrl+"Semester/List")
        .then(res=>{
            this.setState({
                ddsemester:res.data,
            })
        })
        .catch(err=>{
            console.log(err);
        });
    }

    getSection = () =>{
        Axios.get(Consts.BaseUrl+"Section/List")
        .then(res=>{
            this.setState({
                ddsection:res.data,
            })
        })
        .catch(err=>{
            console.log(err);
        });
    }

    getYear = () =>{
        Axios.get(Consts.BaseUrl+"YearBatch/List")
        .then(res=>{
            this.setState({
                ddYear:res.data,
            })
        })
        .catch(err=>{
            console.log(err);
        });
    }

    componentDidMount(){
        this.getYear();
        this.getFaculty();
        this.getSection();
        this.getSemester();
        // this.getAssignment();
        // this.getStudent();
    }

    render(){
        return(
            <Row>
                <Col xs="12" md={{size:10, offset:1}}>
                    <Card>
                    <CardHeader>
                        <strong>Submit Late Assignment</strong>
                    </CardHeader>
                    <CardBody>
                            <FormGroup row>
                                            <Col xs="12" md="6">
                                                <Input invalid={this.state.validationInput==="Year_batch_Id"} type="select" value={this.state.Year_Batch_Id} name="disabledSelect" id="Year_Batch_Id" autoComplete="name" onChange={this.updateIntData}>
                                                    <option value="" disabled>Year *</option>
                                                    {this.state.ddYear.map((data,id)=>{
                                                        return(
                                                            <option value = {data.Id} key= {id}>{data.Year_Batch}</option>
                                                        )
                                                    })}
                                                </Input>
                                            </Col>
                                            <Col xs="12" md="6">
                                                <Input invalid={this.state.validationInput==="Faculty_Id"} type="select" value={this.state.Faculty_Id} name="" id="Faculty_Id" autoComplete="name" onChange={this.updateIntData}>
                                                    <option value="" disabled>Faculty *</option>
                                                    {this.state.ddfaculty.map((data,id)=>{
                                                        return(
                                                            <option value = {data.Id} key= {id}>{data.Faculty_Name}</option>
                                                        )
                                                    })}
                                                </Input>
                                            </Col>
                                        </FormGroup>
                        <Row>
                            <Col md="6" sm="12">
                            <Card>
                                <CardBody className="bg-light">
                                <CardTitle>
                                        <span className="h5 text-muted">Assignment</span>
                                </CardTitle>
                                <FormGroup row>
                                            <Col xs="12" md="6">
                                                <Input invalid={this.state.validationInput==="Semester_Id"} type="select" value={this.state.rSemester_Id} name="disabledSelect" id="rSemester_Id" autoComplete="name" onChange={this.updateIntData}>
                                                    <option value="" disabled>Semester *</option>
                                                    {this.state.ddsemester.map((data,id)=>{
                                                        return(
                                                            <option value = {data.Id} key= {id}>{data.Semester_Name}</option>
                                                        )
                                                    })}
                                                </Input>
                                            </Col>
                                            <Col xs="12" md="6">
                                                <Input invalid={this.state.validationInput==="Section_Id"} type="select" value={this.state.rSection_Id} name="disabledSelect" id="rSection_Id" autoComplete="name" onChange={this.updateIntData}>
                                                    <option value="" disabled>Section *</option>
                                                    {this.state.ddsection.map((data,id)=>{
                                                        return(
                                                            <option value={data.Id} key= {id}>{data.Sec_Name}</option>
                                                        )
                                                    })}
                                                </Input>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                            <Col xs="12" md="12">
                            <Select 
                                                placeholder="Select Assignment"
                                                value={this.state.selectedAssignment}
                                                onChange={this.updateAssignment}
                                                options={this.state.ddassignment}
                                                />
                            </Col>
                        </FormGroup>
                                </CardBody>
                            </Card>
                            </Col>
                            <Col md="6" sm="12">
                            <Card>
                                <CardBody className="bg-light">
                                    <CardTitle>
                                        <span className="h5 text-muted">Student</span>
                                    </CardTitle>
                                <FormGroup row>
                                            <Col xs="12" md="6">
                                                <Input invalid={this.state.validationInput==="Semester_Id"} type="select" value={this.state.sSemester_Id} name="disabledSelect" id="sSemester_Id" autoComplete="name" onChange={this.updateIntData}>
                                                    <option value="" disabled>Semester *</option>
                                                    {this.state.ddsemester.map((data,id)=>{
                                                        return(
                                                            <option value = {data.Id} key= {id}>{data.Semester_Name}</option>
                                                        )
                                                    })}
                                                </Input>
                                            </Col>
                                            <Col xs="12" md="6">
                                                <Input invalid={this.state.validationInput==="Section_Id"} type="select" value={this.state.sSection_Id} name="disabledSelect" id="sSection_Id" autoComplete="name" onChange={this.updateIntData}>
                                                    <option value="" disabled>Section *</option>
                                                    {this.state.ddsection.map((data,id)=>{
                                                        return(
                                                            <option value={data.Id} key= {id}>{data.Sec_Name}</option>
                                                        )
                                                    })}
                                                </Input>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                            <Col xs="12" md="12">
                            <Select 
                                                placeholder="Select Student"
                                                value={this.state.selectedStudent}
                                                onChange={this.updateStudent}
                                                options={this.state.ddstudent}
                                                />
                            </Col>
                        </FormGroup>
                                </CardBody>
                            </Card>
                            </Col>
                            
                            
                        
                        
                        </Row>
                    </CardBody>
                    <CardFooter className="text-right">
                        <Button onClick={()=>{this.submitData()}} size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                        {" "}
                        <Button type="reset" size="sm" color="danger" onClick={this.resetInputs}><i className="fa fa-ban"></i> Reset</Button>
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
                            title="Submitted SuccessFully"
                            // text="SweetAlert in React"
                            onConfirm={() => this.setState({ successsubmit: false })}
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