import React, { Component } from 'react';
import Datatable from "../../../components/datatable";
import Axios from "axios";
import Consts from "./../../../Const";
import {Modal,ModalBody,ModalFooter,ModalHeader,Table,Button,Row,Col,Card,CardBody,CardTitle} from "reactstrap";
import {PulseLoader} from "react-spinners";
import SweetAlert from "sweetalert-react";
import dateFormat from "dateformat";

export default class ListAssignment extends Component{
    constructor(props){
        super(props);
        this.state={
            showDetail:false,
            detail:{},
            detailError:false,
            detailErrorMessage:'',
            loadingDetail:false,
            logs:[],
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

    render(){
        return(
            <div>
            <Datatable paginated routineParam routineId="" showDetail={this.showDetail} url="SubmittedAssignment" route="assignment" tableName="Assignment" columns="Student=StudentName,Assignment=Assignment_Name,Faculty=FacultyName,Teacher=TeacherName,Submitted Date=Submitted_Date,Semester=SemesterName,Section=SectionName,Year Batch=YearBatch,Location=Assignmnet_Location,Checked=Checked_Status,FeedBack=Feedback_Status,Marking,On Time=onTime,Action"/>
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
