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
import queryString from 'query-string';
// import LoadingBar from 'react-top-loading-bar';

export default class UpdateStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Id:'',
            submittingData: false,
            ddfaculty:[],
            ddsection:[],
            ddsemester:[],
            ddYear:[],
            successsubmit:false,
            failsubmit:false,
            Name:'',
            Email:'',
            Phone:'',
            Gender:'',
            Address:'',
            Faculty_Id:'',
            Section_Id:'',
            Year_Batch_Id:'',
            Semester_Id:'',
            validationBox:false,
            validationImput:'',
            validationMessage:'',
            errorMessage:[],
            successData:'',
        }
    }

    componentDidMount(){
        this.setID();
        this.getStudentData();
        this.getFaculty();
        this.getSection();
        this.getSemester();
        this.getYear();
    }

    updateData = (event) => {
        this.setState({
            [event.target.id]: event.target.value,
        })
    }

    updateIntData = (event) => {
        this.setState({
            [event.target.id]: parseInt(event.target.value, 10)
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

    setID =()=>{
        var params = this.props.location.search;
        var id = queryString.parse(params).id
        this.setState({
            Id:id,
        })
    }

    getStudentData = () =>{
        // Axios.get(Consts.BaseUrl)
        var params = this.props.location.search;
        var id = queryString.parse(params).id
        Axios.get(Consts.BaseUrl+"Student/"+id)
        .then(res=>{
            var data = res.data
            this.setState({
                Name:data.Name,
                Email:data.Email,
                Phone:data.Phone,
                Gender:data.Gender,
                Address:data.Address,
                Faculty_Id:data.Faculty_Id,
                Section_Id:data.Section_Id,
                Year_Batch_Id:data.Year_Batch_Id,
                Semester_Id:data.Semester_Id,
            }) 
        })
        .catch(err=>{
            console.log(err);
        })
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

    resetFrom = () =>{
        this.setState({
            Name:'',
            Email:'',
            Phone:'',
            Gender:'',
            Address:'',
            Faculty_Id:'',
            Section_Id:'',
            Year_Batch_Id:'',
            Semester_Id:'',
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
        window.location="#/student/list";
    }

    submitStudent = () => {
        // if(this.state.Name == ''){
        //     this.setState({
        //         validationBox:true,
        //         validationInput:"Name",
        //         validationMessage:"Please Type the student name",
        //     })
        // }else if(this.state.Email == ''){
        //     this.setState({
        //         validationBox:true,
        //         validationInput:"Email",
        //         validationMessage:"Please Type the Email",
        //     })
        // }else if(this.state.Phone == ""){
        //     this.setState({
        //         validationBox:true,
        //         validationInput:"Phone",
        //         validationMessage:"Please Type the Contact Number",
        //     })
        // }
        // else if(this.state.Address == ""){
        //     this.setState({
        //         validationBox:true,
        //         validationInput:"Address",
        //         validationMessage:"Please Type the Address",
        //     })
        // }
        // else if(this.state.Gender == ""){
        //     this.setState({
        //         validationBox:true,
        //         validationInput:"Gender",
        //         validationMessage:"Please select the Gender",
        //     })
        // }
        // else if(this.state.Year_Batch == ""){
        //     this.setState({
        //         validationBox:true,
        //         validationInput:"Year_batch",
        //         validationMessage:"Please Select the Year",
        //     })
        // }
        // else if(this.state.Faculty_Id == ""){
        //     this.setState({
        //         validationBox:true,
        //         validationInput:"Faculty_Id",
        //         validationMessage:"Please Select the Faculty",
        //     })
        // }
        // else if(this.state.Semester_Id == ""){
        //     this.setState({
        //         validationBox:true,
        //         validationInput:"Semester_Id",
        //         validationMessage:"Please Select the Semester",
        //     })
        // }
        // else if(this.state.Section_Id == ""){
        //     this.setState({
        //         validationBox:true,
        //         validationInput:"Section_Id",
        //         validationMessage:"Please Select the Section",
        //     })
        // }else{
            this.setState({
                submittingData: true,
            });
            var pdata = {
                Id:this.state.Id,
                Name:this.state.Name,
                Email:this.state.Email,
                Phone:this.state.Phone,
                Gender:this.state.Gender,
                Address:this.state.Address,
                Faculty_Id:this.state.Faculty_Id,
                Section_Id:this.state.Section_Id,
                Year_Batch_Id:this.state.Year_Batch_Id,
                Semester_Id:this.state.Semester_Id,
            };
            var username = 'admin@gmail.com';
            var password = 'Password';
            // var basicAuth = 'Basic' + btoa(username + ':' + password);
            var authorization = {
                auth: {
                    username: username,
                    password: password,
                }
            };
            Axios.put(Consts.BaseUrl+"Student", pdata)
                .then(res => {
                    this.setState({
                        submittingData: false,
                        successsubmit:true,
                        validationInput:'',
                        successData:res.data,
                    });
                    // this.resetFrom();
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
        // }
       
    }

    submitIndicator = () => {

    }

    render() {
        return (
            <Row>
                <Col xs="12" md={{ size: 8, offset: 2 }}>
                    <Card>
                        <CardHeader>
                            <strong>Update Student</strong>
                        </CardHeader>
                        <CardBody>
                            <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                                <FormGroup row>
                                    <Col md="3">
                                        <Label>Full Name <span className='text-danger'>*</span></Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input invalid={this.state.validationInput==="Name"} type="text" value={this.state.Name} id="Name" name="text-input" placeholder="Enter Full Name" onChange={this.updateData}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="email-input">Email <span className='text-danger'>*</span></Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input invalid={this.state.validationInput==="Email"} type="email" value={this.state.Email} id="Email" name="email-input" placeholder="Enter Email" autoComplete="email" onChange={this.updateData} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label>Contact Number <span className='text-danger'>*</span></Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="text" invalid={this.state.validationInput==="Phone"} id="Phone" value={this.state.Phone} name="text-input" placeholder="Enter Contact Number" onChange={this.updateData} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label>Address <span className='text-danger'>*</span></Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input invalid={this.state.validationInput==="Address"} type="text" id="Address" value={this.state.Address} name="text-input" placeholder="Enter Address" onChange={this.updateData} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">

                                    </Col>
                                    <Col md="9">
                                        <Input invalid={this.state.validationInput==="Gender"} type="select" value={this.state.Gender} name="disabledSelect" id="Gender" autoComplete="name" onChange={this.updateData}>
                                            <option value="" disabled>Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">

                                    </Col>
                                    <Col md="9" sm='12'>
                                        <FormGroup row>
                                            <Col xs="12" md="6">
                                            <Input invalid={this.state.validationInput==="Year_batch_Id"} type="select" value={this.state.Year_Batch_Id} name="disabledSelect" id="Year_Batch_Id" autoComplete="name" onChange={this.updateData}>
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
                                                    <option value='' disabled>Faculty</option>
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
                                                    <option value="" disabled>Semester</option>
                                                    {this.state.ddsemester.map((data,id)=>{
                                                        return(
                                                            <option value = {data.Id} key= {id}>{data.Semester_Name}</option>
                                                        )
                                                    })}
                                                </Input>
                                            </Col>
                                            <Col xs="12" md="6">
                                                <Input invalid={this.state.validationInput==="Section_Id"} type="select" value={this.state.Section_Id} name="disabledSelect" id="Section_Id" autoComplete="name" onChange={this.updateIntData}>
                                                    <option value='' disabled>Section</option>
                                                    {this.state.ddsection.map((data,id)=>{
                                                        return(
                                                            <option value={data.Id} key= {id}>{data.Sec_Name}</option>
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
                            <Button onClick={() => { this.submitStudent() }} size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Update</Button>
                            {" "}
                            <a href="#/student/list" size="sm" className="btn btn-danger btn-sm"><i className="fa fa-ban"></i> Cancel</a>
                        </CardFooter>
                    </Card>
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
                            title={this.state.successData}
                            // text="SweetAlert in React"
                            onConfirm={() => {
                                                    this.setState({ successsubmit: false });
                                                    this.redirectToList();
                                                }}
                            onOutsideClick={() => this.setState({ successsubmit: false })}
                        />
                        <SweetAlert
                            show={false}
                            title="Error"
                            type="error"
                            // text="SweetAlert in React"
                            onConfirm={() => this.setState({ failsubmit: false })}
                            onOutsideClick={() => this.setState({ successsubmit: false })}
                        />
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
                            show={this.state.validationBox}
                            title={this.state.validationMessage}
                            type="warning"
                            // text="SweetAlert in React"
                            onConfirm={() => this.setState({ validationBox: false })}
                            onOutsideClick={() => this.setState({ validationBox: false })}
                        />
                </Col>
            </Row>
        );
    }
}

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;