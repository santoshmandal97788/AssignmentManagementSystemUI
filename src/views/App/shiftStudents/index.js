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
// import LoadingBar from 'react-top-loading-bar';

export default class AddStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submittingData: false,
            ddfaculty:[],
            ddsection:[],
            ddsemester:[],
            ddYear:[],
            successsubmit:false,
            failsubmit:false,
            Faculty_Id:'',
            Section_Id:'',
            Semester_Id:'',
            ToSection_Id:'',
            ToSemester_Id:'',
            Year_Batch_Id:'',
            validationBox:false,
            validationImput:'',
            validationMessage:'',
            errorMessage:[],
            successData:'',
        }
    }

    componentDidMount(){
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
            Faculty_Id:'',
            Section_Id:'',
            Year_Batch_Id:'',
            Semester_Id:'',
            ToSection_Id:'',
            ToSemester_Id:'',
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

    submitStudent = () => {
     
            this.setState({
                submittingData: true,
            });
            var pdata ={
                Faculty_Id:this.state.Faculty_Id,
                Section_Id:this.state.Section_Id,
                Semester_Id:this.state.Semester_Id,
                Year_Batch_Id:this.state.Year_Batch_Id,
                ToSemesterId:this.state.ToSemester_Id,
                ToSectionId:this.state.ToSection_Id
            }
            Axios.put(Consts.BaseUrl+"Student/Shift", pdata)
                .then(res => {
                    this.setState({
                        submittingData: false,
                        successsubmit:true,
                        validationInput:'',
                        successData:res.data,
                    });
                    this.resetFrom();
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


    render() {
        return (
            <Row>
                <Col xs="12" md={{ size: 8, offset: 2 }}>
                    <Card>
                        <CardHeader>
                            <strong>Shift Students</strong>
                        </CardHeader>
                        <CardBody>
                            <Card>
                                <CardBody>
                                    <CardTitle className="text-muted h4">From :</CardTitle>
                                <FormGroup row>
                                    <Col md="12" sm='12'>
                                        <FormGroup row>
                                            <Col xs="12" md="3">
                                                <Input invalid={this.state.validationInput==="Year_batch_Id"} type="select" value={this.state.Year_Batch_Id} name="disabledSelect" id="Year_Batch_Id" autoComplete="name" onChange={this.updateData}>
                                                    <option value="" disabled>Year *</option>
                                                    {this.state.ddYear.map((data,id)=>{
                                                        return(
                                                            <option value = {data.Id} key= {id}>{data.Year_Batch}</option>
                                                        )
                                                    })}
                                                </Input>
                                            </Col>
                                            <Col xs="12" md="3">
                                                <Input invalid={this.state.validationInput==="Faculty_Id"} type="select" value={this.state.Faculty_Id} name="" id="Faculty_Id" autoComplete="name" onChange={this.updateIntData}>
                                                    <option value="" disabled>Faculty *</option>
                                                    {this.state.ddfaculty.map((data,id)=>{
                                                        return(
                                                            <option value = {data.Id} key= {id}>{data.Faculty_Name}</option>
                                                        )
                                                    })}
                                                </Input>
                                            </Col>
                                            <Col xs="12" md="3">
                                                <Input invalid={this.state.validationInput==="Semester_Id"} type="select" value={this.state.Semester_Id} name="disabledSelect" id="Semester_Id" autoComplete="name" onChange={this.updateIntData}>
                                                    <option value="" disabled>Semester *</option>
                                                    {this.state.ddsemester.map((data,id)=>{
                                                        return(
                                                            <option value = {data.Id} key= {id}>{data.Semester_Name}</option>
                                                        )
                                                    })}
                                                </Input>
                                            </Col>
                                            <Col xs="12" md="3">
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
                                    </Col>
                                </FormGroup>
                                </CardBody>
                                </Card>
                                <Card>
                                    <CardBody>
                                        <Row>
                                            <Col md="2" xs="12">
                                                <CardTitle className="text-muted h4">To :</CardTitle>
                                            </Col>
                                            <Col xs="12" md="4">
                                                <Input invalid={this.state.validationInput==="Semester_Id"} type="select" value={this.state.ToSemester_Id} name="disabledSelect" id="ToSemester_Id" autoComplete="name" onChange={this.updateIntData}>
                                                    <option value="" disabled>Semester *</option>
                                                    {this.state.ddsemester.map((data,id)=>{
                                                        return(
                                                            <option value = {data.Id} key= {id}>{data.Semester_Name}</option>
                                                        )
                                                    })}
                                                </Input>
                                            </Col>
                                            <Col xs="12" md="4">
                                                <Input invalid={this.state.validationInput==="Section_Id"} type="select" value={this.state.ToSection_Id} name="disabledSelect" id="ToSection_Id" autoComplete="name" onChange={this.updateIntData}>
                                                    <option value="" disabled>Section *</option>
                                                    {this.state.ddsection.map((data,id)=>{
                                                        return(
                                                            <option value={data.Id} key= {id}>{data.Sec_Name}</option>
                                                        )
                                                    })}
                                                </Input>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                        </CardBody>
                        <CardFooter className="text-right">
                            <Button onClick={() => { this.submitStudent() }} size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                            {" "}
                            <Button onClick = {this.resetFrom} type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
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
                            onConfirm={() => this.setState({ successsubmit: false })}
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