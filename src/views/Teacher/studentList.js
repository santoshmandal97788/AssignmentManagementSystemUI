import React, { Component } from 'react';
// import Datatable from "../../../components/datatable";
import Axios from "axios";
// import Consts from "../../../Const";
import {Modal,ModalBody,ModalFooter,ModalHeader,Table,Button,Row,Col,Card,CardBody,CardFooter,CardHeader,FormGroup,Input} from "reactstrap";
import {PulseLoader} from "react-spinners";
import SweetAlert from "sweetalert-react";
import Select from "react-select";
import dateFormat from "dateformat";
import Consts from "../../Const";
import { CircularProgressbar } from 'react-circular-progressbar';
import queryString from 'query-string';
import 'react-circular-progressbar/dist/styles.css';

export default class StudentList extends Component{
    constructor(props){
        super(props)
        this.state={
            loading:true,
            assignments:[],
            detail:{},
            showDetail:false,
        }
    }


    getAssignments = () =>{
        var params = this.props.location.search;
        var id = queryString.parse(params).id
        Axios.get(Consts.BaseUrl+"TeacherMobile/StudentList?routineid="+id)
        .then(res=>{
            var data = res.data;
            this.setState({
                loading:false,
                assignments:data,
            })
            console.log(data);
        })
        .catch(err=>{
            console.log(err);
        })
    }

    showMarking = (result)=>{
        if(result == 1){
            return(
                <tr><td>Result </td><td><span className="text-danger h5">Fail</span></td></tr>
            )
        }
        if(result==2){
            return(
                <tr><td>Result </td><td><span className="text-primary h5">Pass</span></td></tr>
            )
        }
        if(result==3){
            return(
                <tr><td>Result </td><td><span className="text-info h5">Merit</span></td></tr>
            )
        }
        if(result==4){
            return(
                <tr><td>Result </td><td><span className="text-success h5">Distinction</span></td></tr>
            )
        }
    }

    showDetail = (data) => {
    var releasedDate = new Date(data.Assignment_Release_Date);
    var deadline = new Date(data.Deadline);
    var diffTime = Math.abs(deadline.getTime() - releasedDate.getTime());
    var totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    var currentDate = new Date();
    var rdiffTime = Math.abs(deadline.getTime() - currentDate.getTime());
    var RemainingDays = Math.ceil(rdiffTime / (1000 * 60 * 60 * 24)); 
    var submittedStatus = data.SubmittedStatus;
    
    if(currentDate>deadline){
        RemainingDays = 0;
      }
      var RemainingDaysPercent = (RemainingDays/totalDays)*100;
        var detail = data;
        detail.RemainingDays = RemainingDays;
        detail.totalDays = totalDays;
        detail.RemainingDaysPercent = RemainingDaysPercent;
    
        console.log(detail);
        console.log("inside the detail");
        this.setState({
            detail:data,
            showDetail:true
        })
    }

    componentDidMount(){
        this.getAssignments();
    }

    showStatus = (indicator) =>{
        if(indicator == 0){
            return(
                <i className="fa fa-close text-danger"></i>
            )
        }
        if(indicator == 1){
            return(
                <i className="fa fa-check text-success"></i>
            )
        }

    }

    render(){
        if(this.state.loading==true){
            return(
              <div className="text-center" style={{width:"100%",height:"70vh",display:"flex",alignItems:"center",justifyContent:"center"}}>
                          <PulseLoader
                           size={40}
                           color="#ef7e2d"
                           loading={true}
                          />  
                </div>
            )
          }
        return(
            <Row>
                <Col>
                <Card>
                    <CardHeader>
                        <a href="#/assignments" className="btn btn-sm btn-light btn-round" style={{padding:2}}> <i className="fa fa-chevron-left" style={{marginBottom:0}}></i> Back </a>
                    </CardHeader>
                    <CardBody>
                    <Table bordered striped>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Contact Number</th>
                    <th>Gender</th>
                    <th>Submitted Status</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    this.state.assignments.map((data,id)=>{
                            return(
                                <tr key={id}>
                                    <td>{data.Name}</td>
                                    <td>{data.Email}</td>
                                    <td>{data.Address}</td>
                                    <td>{data.Phone}</td>
                                    <td>{data.Gender}</td>
                                    <td>{this.showStatus(data.SubmittedStatus)}</td>
                                    <td>
                                        <Button color="info" className="text-white btn-sm" onClick={()=>{this.showDetail(data)}}>detail</Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
                    </CardBody>
                </Card>
                </Col>
                <Modal isOpen={this.state.showDetail}
                    className={'modal-info '+ this.props.className}>
                    <ModalHeader toggle={this.toggleInfo}>Detail of {this.state.detail.Name}</ModalHeader>
                    <ModalBody>
                        <Table responsive striped size="sm">
                            <tbody>
                                {this.showMarking(this.state.detail.Marking)}
                            <tr>
                                <td> Student Name :</td>
                                <td>{this.state.detail.Name}</td>
                            </tr>
                            <tr>
                                <td>Email :</td>
                                <td>{this.state.detail.Email}</td>
                            </tr>
                            <tr>
                                <td>Contact Number :</td>
                                <td>{this.state.detail.Phone}</td>
                            </tr>
                            <tr>
                                <td>Address :</td>
                                <td>{this.state.detail.Address}</td>
                            </tr>
                            <tr>
                                <td>Gender :</td>
                                <td>{this.state.detail.Gender}</td>
                            </tr>
                            <tr>
                                <td>Year Batch :</td>
                                <td>{this.state.detail.Year_Batch}</td>
                            </tr>
                            <tr>
                                <td>Faculty :</td>
                                <td>{this.state.detail.Faculty_Name}</td>
                            </tr>
                            <tr>
                                <td>Semester :</td>
                                <td>{this.state.detail.Semester_Name}</td>
                            </tr>
                            <tr>
                                <td>Section :</td>
                                <td>{this.state.detail.Sec_Name}</td>
                            </tr>
                            </tbody>
                        </Table>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => { this.setState({ showDetail: false }) }}>Ok</Button>{' '}
                    </ModalFooter>
                </Modal>
            </Row>
            
        )
    }
}