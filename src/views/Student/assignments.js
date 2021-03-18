import React, { Component } from 'react';
// import Datatable from "../../../components/datatable";
import Axios from "axios";
// import Consts from "../../../Const";
import {Modal,ModalBody,ModalFooter,ModalHeader,Table,Button,Row,Col,Card,CardBody,CardFooter,CardHeader,FormGroup,Input} from "reactstrap";
import {PulseLoader} from "react-spinners";
import SweetAlert from "sweetalert-react";
import Select from "react-select";
import dateFormat from "dateformat";
import Consts from "./../../Const";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import fileDownload from "js-file-download";

export default class StudentAssignments extends Component{
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
        Axios.get(Consts.BaseUrl+"Mobile")
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

    downloadFile = (id,name) =>{
        Axios.get(Consts.BaseUrl+"AssignmentRoutine/DownloadFile?routineId="+id)
        .then(res=>{
            var filename = this.state.detail.Name;
            // var filename = res.data.Data.filename;
            // var fileData = res.data.Data.filedata;
            fileDownload(res.data, name);
        })
        .catch(err=>{
            console.log(err);
        });
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
                <Table bordered striped>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Teacher</th>
                    <th>Deadline</th>
                    <th>Checked Status</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.assignments.map((data,id)=>{
                            return(
                                <tr key={id}>
                                    <td>{data.Assignment_Name}</td>
                                    <td>{data.Teacher_Name}</td>
                                    <td>{dateFormat(data.Deadline,"yyyy-mm-dd")}</td>
                                    <td>{this.showStatus(data.CheckedStatus)}</td>
                                    <td>
                                        {/* <i color="info" className="fa fa-user text-info" onClick={()=>{this.showDetail(data)}}></i> */}
                                        <a className="icon-user text-primary" title="Show detail" onClick={(id)=>{this.showDetail(data)}}></a>
                                        {" "}
                                        <a className="fa fa-download text-success" title="Download" onClick={(id)=>{this.downloadFile(data.Id,data.Name)}}></a>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
                </Col>
                <Modal isOpen={this.state.showDetail}
                    className={'modal-info '+ this.props.className}>
                    <ModalHeader toggle={this.toggleInfo}>Detail of {this.state.detail.Assignment_Name}</ModalHeader>
                    <ModalBody>
                        <Row style={{marginBottom:10}}>
                            <Col md={{ size: 6, offset: 3} } sm="12">
                            <CircularProgressbar value={this.state.detail.RemainingDaysPercent} text={ this.state.detail.RemainingDays+" days"} />
                            </Col>
                        </Row>
                        <Table responsive striped size="sm">
                            <tbody>
                                {this.showMarking(this.state.detail.Marking)}
                            <tr>
                                <td> Assignment Name :</td>
                                <td>{this.state.detail.Assignment_Name}</td>
                            </tr>
                            <tr>
                                <td>Teacher Name :</td>
                                <td>{this.state.detail.Teacher_Name}</td>
                            </tr>
                            <tr>
                                <td>Release Date :</td>
                                <td>{dateFormat(this.state.detail.Assignment_Release_Date,"yyyy-mm-dd")}</td>
                            </tr>
                            <tr>
                                <td>Deadline :</td>
                                <td>{dateFormat(this.state.detail.Deadline,"yyyy-mm-dd")}</td>
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
                                <td>{this.state.detail.Section_Name}</td>
                            </tr>
                            <tr>
                                <td>Total Days :</td>
                                <td>{this.state.detail.totalDays}</td>
                            </tr>
                            <tr>
                                <td>Remaining Days :</td>
                                <td>{this.state.detail.RemainingDays}</td>
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