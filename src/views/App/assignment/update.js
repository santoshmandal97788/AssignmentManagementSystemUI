import React, { Component } from 'react';
import {
    Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, Form, FormGroup, Label, Input, FormText,
    Badge, CardFooter, Button,
    Col, Row, ListGroup, ListGroupItem, Table,Modal,ModalBody,ModalHeader,ModalFooter
} from 'reactstrap';
import Axios from 'axios';
import { css } from '@emotion/core';
// First way to import
import { ClipLoader,PulseLoader,BounceLoader,CircleLoader,FadeLoader,MoonLoader, } from 'react-spinners';
import SweetAlert from 'sweetalert-react';
import sacss from 'sweetalert/dist/sweetalert.css';
import Consts from '../../../Const';
import Select from "react-select";
import queryString from 'query-string';

export default class UpdateAssignment extends Component{
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
            Semester_Id:'',
            Section_Id:'',
            errorMessage:[],
            Checked_Status:"",
            Feedback_Status:"",
            Marking:"",
            Assignmnet_Location:"",
            Id:"",
            logs:[],
            IncomeAssignmnet_Location:"",
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
            this.resetsa();
        })
        if(event.target.id=="Checked_Status"&&event.target.value==0){
            this.setState({
                Feedback_Status:0,
                Marking:0,
            });
        }
        if(event.target.id=="Checked_Status"&&event.target.value==1){
            this.setState({
                Marking:1,
            });
        }
        
    }

    updateIntData2 = (event) =>{
        this.setState({
            [event.target.id]:parseInt(event.target.value,10)
        },()=>{
        })
        if(event.target.id=="Checked_Status"&&event.target.value==0){
            this.setState({
                Feedback_Status:0,
                Marking:0,
            });
        }
        if(event.target.id=="Checked_Status"&&event.target.value==1){
            this.setState({
                Marking:1,
            });
        }
        
    }

    getStudentAndRoutine = ()=>{
        console.log("sar");
        if((this.state.Year_Batch_Id&&this.state.Faculty_Id&&this.state.Semester_Id&&this.state.Section_Id)!=""){
            console.log("inside get Student");
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

    getAssignmentDetail = () =>{
        // Axios.get(Consts.BaseUrl)
        var params = this.props.location.search;
        var id = queryString.parse(params).id
        Axios.get(Consts.BaseUrl+"SubmittedAssignment/"+id)
        .then(res=>{
            var data = res.data
            console.log(data);
            this.setState({
                selectedAssignment:{value:data.Routine_Id, label:data.Assignment_Name},
                selectedStudent:{value:data.Student_Id, label:data.StudentName},
                Assignment_Id:data.Routine_Id,
                Student_Id:data.Student_Id,
                Year_Batch_Id:data.Year_Batch_Id,
                Faculty_Id:data.Faculty_Id,
                Semester_Id:data.Semester_Id,
                Section_Id:data.Section_Id,
                Checked_Status:data.Checked_Status,
                Feedback_Status:data.Feedback_Status,
                Marking:data.Marking,
                Assignmnet_Location:data.Assignmnet_Location,
                IncomeAssignmnet_Location:data.Assignmnet_Location,
            },()=>{this.getStudentAndRoutine()})
            // this.setState({
            //     Name:data.Name,
            //     Email:data.Email,
            //     Phone:data.Phone,
            //     Gender:data.Gender,
            //     Address:data.Address,
            //     Faculty_Id:data.Faculty_Id,
            //     Section_Id:data.Section_Id,
            //     Year_Batch_Id:data.Year_Batch_Id,
            //     Semester_Id:data.Semester_Id,
            // }) 
        })
        .catch(err=>{
            console.log(err);
        })
    }

    

    updateStudent = (event)=>{
        // console.log(event);
        this.setState({
            selectedStudent:event,
            Student_Id:event.value,
        },()=>{
            this.getAssignment();
        })
        console.log(this.state.Student_Id);
    }

    getAssignment = () =>{
        Axios.get(Consts.BaseUrl+"Routine/byStudent?studentid="+this.state.Student_Id)
        .then(res=>{
            var data = res.data;
            console.log(data);
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
        Axios.get(Consts.BaseUrl+"Student?year="+this.state.Year_Batch_Id+"&&faculty="+this.state.Faculty_Id+"&&semester="+this.state.Semester_Id+"&&section="+this.state.Section_Id)
        .then(res=>{
            var data = res.data;
            var ddstudent=[];
            for(var i=0; i<data.length; i++){
                var singleStudent = {}
                singleStudent.value=data[i].Id;
                singleStudent.label=data[i].Name;
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

    setID =()=>{
        var params = this.props.location.search;
        var id = queryString.parse(params).id
        this.setState({
            Id:id,
        })
    }

    submitData = () =>{
        this.setState({
            submittingData:true,
        })
        var pdata = {
            Id:this.state.Id,
            Routine_Id:this.state.Assignment_Id,
            Student_Id:this.state.Student_Id,
            Feedback_Status:this.state.Feedback_Status,
            Checked_Status:this.state.Checked_Status,
            Marking:this.state.Marking,
            Assignmnet_Location:this.state.Assignmnet_Location,
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
        Axios.put(Consts.BaseUrl+"SubmittedAssignment",pdata)
        .then(res=>{

            this.setState({
                submittingData:false,
                successsubmit:true
            });
            this.resetInputs();
        })
        .catch(err => {
            console.log("inside error");
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
            Semester_Id:'',
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
    redirectToList = ()=>{
        window.location="#/Assignment/list";
    }

    componentDidMount(){
        this.setID();
        this.getYear();
        this.getFaculty();
        this.getSection();
        this.getSemester();
        this.getAssignmentDetail();
        // this.getAssignment();
        // this.getStudent();
    }

    render(){
        return(
            <Row>
                <Col xs="12" md={{size:8, offset:2}}>
                    <Card>
                    <CardHeader>
                        <strong>Update Assignment</strong>
                    </CardHeader>
                    <CardBody>
                        <Card>
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
                                        <FormGroup row>
                                            <Col xs="12" md="6">
                                                <Input invalid={this.state.validationInput==="Semester_Id"} type="select" value={this.state.Semester_Id} name="disabledSelect" id="Semester_Id" autoComplete="name" onChange={this.updateIntData}>
                                                    <option value="" disabled>Semester *</option>
                                                    {this.state.ddsemester.map((data,id)=>{
                                                        return(
                                                            <option value = {data.Id} key= {id}>{data.Semester_Name}</option>
                                                        )
                                                    })}
                                                </Input>
                                            </Col>
                                            <Col xs="12" md="6">
                                                <Input invalid={this.state.validationInput==="Section_Id"} type="select" value={this.state.Section_Id} name="disabledSelect" id="Section_Id" autoComplete="name" onChange={this.updateIntData}>
                                                    <option value="" disabled>Section *</option>
                                                    {this.state.ddsection.map((data,id)=>{
                                                        return(
                                                            <option value={data.Id} key= {id}>{data.Sec_Name}</option>
                                                        )
                                                    })}
                                                </Input>
                                            </Col>
                                        </FormGroup>
                            </CardBody>
                        </Card>
                        <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                        <FormGroup row>
                            <Col md="3">
                            <Label htmlFor="email-input">Student <span className="text-danger">*</span></Label>
                            </Col>
                            <Col xs="12" md="9">
                            <Select 
                                                placeholder="Select Student"
                                                value={this.state.selectedStudent}
                                                onChange={this.updateStudent}
                                                options={this.state.ddstudent}
                                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                            <Label>Assignment <span className="text-danger">*</span></Label>
                            </Col>
                            <Col xs="12" md="9">
                            <Select 
                                                placeholder="Select Assignment"
                                                value={this.state.selectedAssignment}
                                                onChange={this.updateAssignment}
                                                options={this.state.ddassignment}
                                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                            <Label htmlFor="email-input">Checked Status <span className="text-danger">*</span></Label>
                            </Col>
                            <Col xs="12" md="9">
                            <Input invalid={this.state.validationInput==="Checked_Status"} type="select" value={this.state.Checked_Status} name="disabledSelect" id="Checked_Status" autoComplete="name" onChange={this.updateIntData2}>
                                                    <option value={0}>Not Checked</option>
                                                    <option value={1}>Checked</option>
                                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                            <Label htmlFor="email-input">FeedBack Status <span className="text-danger">*</span></Label>
                            </Col>
                            <Col xs="12" md="9">
                            <Input disabled={this.state.Checked_Status==0} invalid={this.state.validationInput==="Feedback_Status"} type="select" value={this.state.Feedback_Status} name="disabledSelect" id="Feedback_Status" autoComplete="name" onChange={this.updateIntData2}>
                                                    <option value={0}>False</option>
                                                    <option value={1}>True</option>
                                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                            <Label htmlFor="email-input">Marking <span className="text-danger">*</span></Label>
                            </Col>
                            <Col xs="12" md="9">
                            <Input disabled={this.state.Checked_Status==0}  invalid={this.state.validationInput==="Marking"} type="select" value={this.state.Marking} name="disabledSelect" id="Marking" autoComplete="name" onChange={this.updateIntData2}>
                                                    <option disabled={!this.state.Checked_Status==0} value={0}>Not Checked</option>
                                                    <option value={1}>Fail</option>
                                                    <option value={2}>Pass</option>
                                                    <option value={3}>Merit</option>
                                                    <option value={4}>Distinction</option>
                                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                            <Label htmlFor="email-input">Assignment Location <span className="text-danger">*</span></Label>
                            </Col>
                            <Col xs="12" md="9">
                            <Input invalid={this.state.validationInput==="Assignmnet_Location"} type="select" value={this.state.Assignmnet_Location} name="disabledSelect" id="Assignmnet_Location" autoComplete="name" onChange={this.updateIntData2}>
                                                    <option value={0}>College</option>
                                                    <option value={1} disabled={this.state.IncomeAssignmnet_Location==2}>Teacher</option>
                                                    <option value={2} disabled={this.state.IncomeAssignmnet_Location==1}>Student</option>
                                                </Input>
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
                            title="Submitted SuccessFully"
                            // text="SweetAlert in React"
                            onConfirm={() => {
                                this.setState({ successsubmit: false })
                                this.redirectToList();
                            }}
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