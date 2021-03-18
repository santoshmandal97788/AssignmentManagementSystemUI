import React, { Component } from 'react';
import {
    Card, CardBody, CardHeader, Form, FormGroup, Label, Input,
    CardFooter, Button,
    Col, Row,Modal,ModalBody,ModalHeader,ModalFooter
} from 'reactstrap';
import Axios from 'axios';
import { css } from '@emotion/core';
// First way to import
import {PulseLoader} from 'react-spinners';
import SweetAlert from 'sweetalert-react';
import sacss from 'sweetalert/dist/sweetalert.css';
import Consts from '../../../Const';
import Select from "react-select";
import queryString from 'query-string';
import dateFormat from "dateformat";

export default class UpdateRoutine extends Component{
    constructor(props){
        super(props);
        this.state={
            submittingData: false,
            successsubmit:false,
            failsubmit:false,
            name:'',
            Teacher_Id:'',
            releaseDate:'',
            deadline:'',
            Section_Id:'',
            Faculty_Id:'',
            Semester_Id:'',
            Year_Batch_Id:'',
            ddfaculty:[],
            ddsection:[],
            ddsemester:[],
            ddteacher:[],
            ddYear:[],
            selectedTeacher:'',
            errorMessage:[],
            successMessage:'',
        }
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

    updateTeacher = (event)=>{
        // console.log(event);
        this.setState({
            selectedTeacher:event,
            Teacher_Id:event.value,
        })
        console.log(event);
    }

    getRoutine = () =>{
        var params = this.props.location.search;
        var id = queryString.parse(params).id
        Axios.get(Consts.BaseUrl+"AssignmentRoutine/"+id)
        .then(res=>{
            var data = res.data;
            var releaseDate = data.Assignment_Release_Date;
            var nrd = dateFormat(releaseDate,"yyyy-mm-dd");
            var deadline = data.Deadline;
            var ndl = dateFormat(deadline,"yyyy-mm-dd")
            this.setState({
                name:data.Assignment_Name,
                Teacher_Id:data.Teacher_Id,
                releaseDate:nrd,
                deadline:ndl,
                Section_Id:data.Section_Id,
                Faculty_Id:data.Faculty_Id,
                Semester_Id:data.Semester_Id,
                selectedTeacher:{value:data.Teacher_Id,label:data.Teacher_Name},
                Year_Batch_Id:data.Year_Batch_Id,
            })
            console.log(res.data);
//             Assignment_Name: "Matheatics"
// Assignment_Release_Date: "2019-06-13T00:00:00"
// Deadline: "2019-06-25T00:00:00"
// Faculty_Id: 4
// Faculty_Name: "BSW"
// Id: 4
// Section_Id: 5
// Section_Name: "E"
// Semester_Id: 2
// Semester_Name: "2nd"
// Teacher_Id: 2
// Teacher_Name: "john baishya sir"
        })
        .catch(err=>{
            console.log(err);
        })
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

    getTeacher = () =>{
        Axios.get(Consts.BaseUrl+"Teacher/List")
        .then(res=>{
            console.log(res.data);
            var data = res.data;
            var ddteacher=[];
            for(var i=0; i<data.length; i++){
                var singleTeacher = {}
                singleTeacher.value=data[i].Id;
                singleTeacher.label=data[i].Name;
                ddteacher.push(singleTeacher);
            }
            console.log(ddteacher);
            this.setState({
                ddteacher:ddteacher,
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

    submitData = () =>{
        var params = this.props.location.search;
        var id = queryString.parse(params).id
        this.setState({
            submittingData:true,
        })
        var pdata = {
            Id:id,
            Assignment_Name:this.state.name,
            Teacher_id:this.state.Teacher_Id,
            Assignment_Release_Date:this.state.releaseDate,
            Deadline:this.state.deadline,
            Section_Id:this.state.Section_Id,
            Faculty_Id:this.state.Faculty_Id,
            Semester_Id:this.state.Semester_Id,
            Year_Batch_Id:this.state.Year_Batch_Id,
        };
        console.log(pdata);
        var username = 'admin@gmail.com';
        var password = 'Password';
        // var basicAuth = 'Basic' + btoa(username + ':' + password);
        var authorization =  {
                              auth: {
                                username: username,
                                password: password,
                              }
                            };
        Axios.put(Consts.BaseUrl+"AssignmentRoutine",pdata)
        .then(res=>{
            console.log(res);

            console.log("data has been submitted");
            this.setState({
                submittingData:false,
                successsubmit:true,
                successMessage:res.data,
            });
            this.resetInputs();
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

    resetInputs = () =>{
        console.log("reset worked");
        this.setState({
            name:'',
            Teacher_Id:'',
            releaseDate:'',
            deadline:'',
            Section_Id:'',
            Faculty_Id:'',
            Semester_Id:'',
            selectedTeacher:'',
        });
        console.log(this.state);
    }

    redirectToList = ()=>{
        window.location="#/routine/list";
    }

    componentDidMount(){
        this.getYear();
        this.getFaculty();
        this.getSection();
        this.getSemester();
        this.getTeacher();
        this.getRoutine();
    }

    render(){
        return(
            <Row>
                <Col xs="12" md={{size:8, offset:2}}>
                    <Card>
                    <CardHeader>
                        <strong>Update Routine</strong>
                    </CardHeader>
                    <CardBody>
                        <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                        <FormGroup row>
                            <Col md="3">
                            <Label>Assignment Name</Label>
                            </Col>
                            <Col xs="12" md="9">
                            <Input type="text" id="name" name="text-input" value={this.state.name} placeholder="Enter Assignment Name" onChange={this.updateData} autoComplete="off"/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                            <Label htmlFor="email-input">Release Date</Label>
                            </Col>
                            <Col xs="12" md="9">
                            <Input type="date" id="releaseDate" name="email-input" value={this.state.releaseDate} placeholder="Enter Email" autoComplete="email" autoComplete="off" onChange={this.updateData}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                            <Label htmlFor="email-input">Deadline</Label>
                            </Col>
                            <Col xs="12" md="9">
                            <Input type="date" id="deadline" name="email-input" value={this.state.deadline} placeholder="Enter Email" autoComplete="email" autoComplete="off" onChange={this.updateData}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                                    <Col md="3">

                                    </Col>
                                    <Col md="9" sm='12'>
                                        <FormGroup row>
                                            <Col xs="12" md="12">
                                                <Select 
                                                placeholder="Select Teacher"
                                                id="teacherId"
                                                value={this.state.selectedTeacher}
                                                onChange={this.updateTeacher}
                                                options={this.state.ddteacher}
                                                />
                                            </Col>
                                            
                                        </FormGroup>
                                        <FormGroup row>
                                        <Col xs="12" md="6">
                                                <Input invalid={this.state.validationInput==="Faculty_Id"} type="select" value={this.state.Faculty_Id} name="" id="Faculty_Id" autoComplete="name" onChange={this.updateIntData}>
                                                    <option value='' disabled>Faculty</option>
                                                    {this.state.ddfaculty.map((data,id)=>{
                                                        return(
                                                            <option value = {data.Id} key= {id}>{data.Faculty_Name}</option>
                                                        )
                                                    })}
                                                </Input>
                                            </Col>
                                            <Col xs="12" md="6">
                                                <Input invalid={this.state.validationInput==="Semester_Id"} type="select" value={this.state.Semester_Id} name="disabledSelect" id="Semester_Id" autoComplete="name" onChange={this.updateIntData}>
                                                    <option value="" disabled>Semester</option>
                                                    {this.state.ddsemester.map((data,id)=>{
                                                        return(
                                                            <option value = {data.Id} key= {id}>{data.Semester_Name}</option>
                                                        )
                                                    })}
                                                </Input>
                                            </Col>
                                            
                                        </FormGroup>
                                        <FormGroup row>
                                        <Col xs="12" md="6">
                                                <Input invalid={this.state.validationInput==="Section_Id"} type="select" value={this.state.Section_Id} name="disabledSelect" id="Section_Id" autoComplete="name" onChange={this.updateIntData}>
                                                    <option value="" disabled>Section</option>
                                                    {this.state.ddsection.map((data,id)=>{
                                                        return(
                                                            <option value={data.Id} key= {id}>{data.Sec_Name}</option>
                                                        )
                                                    })}
                                                </Input>
                                            </Col>
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
                                        </FormGroup>
                                    </Col>

                                </FormGroup>
                        </Form>
                    </CardBody>
                    <CardFooter className="text-right">
                        <Button onClick={()=>{this.submitData()}} size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Update</Button>
                        {" "}
                        <a href={"#/routine/list"} size="sm" className="btn btn-danger btn-sm"><i className="fa fa-ban"></i> Cancel</a>
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
                        <SweetAlert
                            show={this.state.successsubmit}
                            type="success"
                            title={this.state.successMessage}
                            // text="SweetAlert in React"
                            onConfirm={() => {
                                this.setState({ successsubmit: false })
                                this.redirectToList();
                            }}
                            onOutsideClick={() => this.setState({ successsubmit: false })}
                        />
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
                            show={this.state.validationBox}
                            title={this.state.validationMessage}
                            type="warning"
                            // text="SweetAlert in React"
                            onConfirm={() => this.setState({ validationBox: false })}
                            onOutsideClick={() => this.setState({ validationBox: false })}
                        />
            </Row>
        );
    }
}