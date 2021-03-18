import React, { Component } from 'react';
import Datatable from "../../../components/datatable";
import Axios from "axios";
import Consts from "../../../Const";
import {Modal,ModalBody,ModalFooter,ModalHeader,Table,Button,Row,Col,Card,CardBody,CardFooter,CardHeader,FormGroup,Input} from "reactstrap";
import {PulseLoader} from "react-spinners";
import SweetAlert from "sweetalert-react";
import Select from "react-select";
import dateFormat from "dateformat";


export default class ListAssignmentByStudent extends Component{
    constructor(props){
        super(props);
        this.state={
            showDetail:false,
            detail:{},
            detailError:false,
            detailErrorMessage:'',
            loadingDetail:false,
            ddYear:[],
            ddfaculty:[],
            ddsemester:[],
            ddsection:[],
            ddstudent:[],
            selectedStudent:'',
            Student_Id:'',
            Year_Batch_Id:"",
            Faculty_Id:'',
            Semester_Id:'',
            Section_Id:'',
            logs:[],
        }
    }


    updateData = (event) =>{
        this.setState({
            [event.target.id]:event.target.value,
        },()=>{
            this.getStudent();
        })
        
    }


    updateIntData = (event) =>{
        this.setState({
            [event.target.id]:parseInt(event.target.value,10)
        },()=>{
            this.getStudent();
        })
        
    }

    getStudent= ()=>{
        if((this.state.Year_Batch_Id&&this.state.Faculty_Id&&this.state.Semester_Id&&this.state.Section_Id)!=""){
            Axios.get(Consts.BaseUrl+"Student?year="+this.state.Year_Batch_Id+"&&faculty="+this.state.Faculty_Id+"&&semester="+this.state.Semester_Id+"&&section="+this.state.Section_Id)
        .then(res=>{
            var data = res.data;
            var ddstudent=[];
            for(var i=0; i<data.length; i++){
                var singleStudent = {}
                singleStudent.value=data[i].Id;
                singleStudent.label=data[i].Name+" ( "+ data[i].Email+" )";
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
    }

    showDetail = (id) => {
        console.log(id);
        console.log("inside the detail");
        this.setState({
           loadingDetail:true,
        })
        Axios.get(Consts.BaseUrl + "SubmittedAssignment/" + id)
            .then(res => {
                console.log(res.data);
                this.setState({
                    loadingDetail: false,
                    detail: res.data,
                    showDetail: true,
                },()=>{
                    this.getLogs(id);
                })

            })
            .catch(err => {
                if(err.response){
                    var errorMessage=err.response.data.Message;
                    console.log(err.response.data.Message);
                this.setState({
                    loadingDetail: false,
                    detailError: true,
                    detailErrorMessage:errorMessage
                })
                }else{
                    this.setState({
                        loadingDetail: false,
                        detailError: true,
                        detailErrorMessage:"Cannot connect to server",
                    })
                }
                
            });

    }

    showAssignmentLocation = ()=>{
        if(this.state.detail.Assignmnet_Location==0){
            return "College";
        }
        if(this.state.detail.Assignmnet_Location==1){
            return "Teacher";
        }
        if(this.state.detail.Assignmnet_Location==2){
            return "Student";
        }
    }

    showCheckedStatus = () =>{
        if(this.state.detail.Checked_Status==0){
            return <i className="fa fa-close text-danger"></i>
        }
        if(this.state.detail.Checked_Status==1){
            return <i className="fa fa-check text-success"></i>
        }
    }

    showFeedbackStatus = () =>{
        if(this.state.detail.Feedback_Status==0){
            return <i className="fa fa-close text-danger"></i>
        }
        if(this.state.detail.Feedback_Status==1){
            return <i className="fa fa-check text-success"></i>
        }
    }

    showMarking=()=>{
        if(this.state.detail.Marking==0){
            return <i className="fa fa-close text-danger"></i>
        }
        if(this.state.detail.Marking==1){
            return <span className="text-danger h5">Fail</span>
        }
        if(this.state.detail.Marking==2){
            return <span className="text-success h5">Pass</span>
        }
        if(this.state.detail.Marking==3){
            return <span className="text-success h5">Merit</span>
        }
        if(this.state.detail.Marking==4){
            return <span className="text-success h5">Distinction</span>
        }
    }

    getLogs = (id)=>{
        Axios.get(Consts.BaseUrl+"AssignmentLog?assignmentid="+id)
        .then(res=>{
            var data = res.data;
            this.setState({
                logs:data,
            });
        })
        .catch(err=>{
            console.log(err);
        })
    }

    updateStudent = (event)=>{
        // console.log(event);
        this.setState({
            selectedStudent:event,
            Student_Id:"",
        },()=>{
            this.setState({
                Student_Id:event.value,
            })
        })
        console.log(this.state.Student_Id);
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
        this.getFaculty();
        this.getYear();
        this.getSemester();
        this.getSection();
    }
    
    showTable = () =>{
        console.log("inside showTable");
        if(this.state.Student_Id!=''){
        return <Datatable showDetail={this.showDetail} noFilter url={"SubmittedAssignment?studentid="+this.state.Student_Id} route="assignment" tableName="Assignment" columns="Student=StudentName,Assignment=Assignment_Name,Faculty=FacultyName,Teacher=TeacherName,Submitted Date=Submitted_Date,Semester=SemesterName,Section=SectionName,Year Batch=YearBatch,Location=Assignmnet_Location,Checked=Checked_Status,FeedBack=Feedback_Status,Marking,On Time=onTime,Action"/>
        }
    }

    render(){
        console.log(this.state.Student_Id);
        return(
            <div>
            <Card>
                <CardBody className="bg-light">
                    <Row>
                          <Col md="3">
                              <FormGroup>
                              <Input invalid={this.state.validationInput==="Year_batch_Id"} type="select" value={this.state.Year_Batch_Id} name="disabledSelect" id="Year_Batch_Id" autoComplete="name" onChange={this.updateData}>
                                                    <option value="" disabled>Year *</option>
                                                    {this.state.ddYear.map((data,id)=>{
                                                        return(
                                                            <option value = {data.Id} key= {id}>{data.Year_Batch}</option>
                                                        )
                                                    })}
                                                </Input>
                              </FormGroup>
                          </Col>
                          <Col md="3">
                              <FormGroup>
                              <Input invalid={this.state.validationInput==="Faculty_Id"} type="select" value={this.state.Faculty_Id} name="" id="Faculty_Id" autoComplete="name" onChange={this.updateIntData}>
                                                    <option value="" disabled>Faculty *</option>
                                                    {this.state.ddfaculty.map((data,id)=>{
                                                        return(
                                                            <option value = {data.Id} key= {id}>{data.Faculty_Name}</option>
                                                        )
                                                    })}
                                                </Input>
                              </FormGroup>
                          </Col>
                          <Col md="3">
                              <FormGroup>
                              <Input invalid={this.state.validationInput==="Semester_Id"} type="select" value={this.state.Semester_Id} name="disabledSelect" id="Semester_Id" autoComplete="name" onChange={this.updateIntData}>
                                                    <option value="" disabled>Semester *</option>
                                                    {this.state.ddsemester.map((data,id)=>{
                                                        return(
                                                            <option value = {data.Id} key= {id}>{data.Semester_Name}</option>
                                                        )
                                                    })}
                                                </Input>
                              </FormGroup>
                          </Col>
                          <Col md="3">
                              <FormGroup>
                              <Input invalid={this.state.validationInput==="Section_Id"} type="select" value={this.state.Section_Id} name="disabledSelect" id="Section_Id" autoComplete="name" onChange={this.updateIntData}>
                                                    <option value="" disabled>Section *</option>
                                                    {this.state.ddsection.map((data,id)=>{
                                                        return(
                                                            <option value={data.Id} key= {id}>{data.Sec_Name}</option>
                                                        )
                                                    })}
                                                </Input>
                              </FormGroup>
                          </Col>
                          <Col md="6">
                              <FormGroup>
                              <Select 
                                                placeholder="Select Student"
                                                value={this.state.selectedStudent}
                                                onChange={this.updateStudent}
                                                options={this.state.ddstudent}
                                                />
                              </FormGroup>
                          </Col>
                    </Row>
                </CardBody>
            </Card>
            {this.showTable()}
            <Modal isOpen={this.state.showDetail}
                    className={'modal-info ' + this.props.className}>
                    <ModalHeader toggle={this.toggleInfo}>Assignment Detail</ModalHeader>
                    <ModalBody>
                        <Table responsive striped size="sm">
                            <tbody>
                            <tr>
                                <td> Assignment Name :</td>
                                <td>{this.state.detail.Assignment_Name}</td>
                            </tr>
                            <tr>
                                <td>Student Name :</td>
                                <td>{this.state.detail.StudentName}</td>
                            </tr>
                            <tr>
                                <td>Teacher Name :</td>
                                <td>{this.state.detail.TeacherName}</td>
                            </tr>
                            <tr>
                                <td>Submitted On :</td>
                                <td>{dateFormat(this.state.detail.Submitted_Date,"yyyy-mm-dd")}</td>
                            </tr>
                            <tr>
                                <td>Year Batch :</td>
                                <td>{this.state.detail.YearBatch}</td>
                            </tr>
                            <tr>
                                <td>Faculty :</td>
                                <td>{this.state.detail.FacultyName}</td>
                            </tr>
                            <tr>
                                <td>Semester :</td>
                                <td>{this.state.detail.SemesterName}</td>
                            </tr>
                            <tr>
                                <td>Section :</td>
                                <td>{this.state.detail.SectionName}</td>
                            </tr>
                            <tr>
                                <td>Location :</td>
                                <td>
                                    {this.showAssignmentLocation()}
                                </td>
                            </tr>
                            <tr>
                                <td>Checked :</td>
                                <td>{this.showCheckedStatus()}</td>
                            </tr>
                            <tr>
                                <td>FeedBack :</td>
                                <td>{this.showFeedbackStatus()}</td>
                            </tr>
                            <tr>
                                <td>Marking :</td>
                                <td>{this.showMarking()}</td>
                            </tr>
                            </tbody>
                        </Table>
                        <span className="h5">Logs :</span>
                        <Table bordered>
                            <tbody>
                            <tr className="logs-thead">
                                <th>Date (Y-M-D)</th>
                                <th>Activity</th>
                                </tr>
                                {this.state.logs.map((data,id)=>{
                                    return(
                                    <tr key = {id}>
                                        <td>{dateFormat(data.Date,"yyyy-mm-dd")}</td>
                                        <td>{data.Description}</td>
                                    </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => { this.setState({ showDetail: false }) }}>Ok</Button>{' '}
                    </ModalFooter>
                </Modal>
                <SweetAlert
                    show={this.state.detailError}
                    type="error"
                    title={this.state.detailErrorMessage}
                    // text="SweetAlert in React"
                    onConfirm={() => this.setState({ detailError: false })}
                    onOutsideClick={() => this.setState({ detailError: false })}
                />
                <Modal isOpen={this.state.loadingDetail}>
                  <ModalBody>
                      <Row>
                          <Col>
                         <h1>
                              Please Wait 
                       </h1>

                        </Col>
                         <Col>
                               <PulseLoader
                                   size={40}
                                   color="#59c9e7"
                                 loading={true}
                               />
                       </Col>
                      </Row>
                  </ModalBody>
                  </Modal>
        </div>
        )
    }
}
