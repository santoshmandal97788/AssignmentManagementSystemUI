import React, { Component } from 'react';
import Datatable from "../../../components/datatable";
import Axios from "axios";
import Consts from "./../../../Const";
import {Modal,ModalBody,ModalFooter,ModalHeader,Table,Button,Row,Col} from "reactstrap";
import {PulseLoader} from "react-spinners";
import SweetAlert from "sweetalert-react";
import dateFormat from "dateformat";
import fileDownload from 'js-file-download';

export default class ListRoutine extends Component{
    constructor(props){
        super(props);
        this.state={
            showDetail:false,
            detail:{},
            detailError:false,
            detailErrorMessage:'',
            loadingDetail:false,
        }
    }

    showDetail = (id) => {
        console.log(id);
        console.log("inside the detail");
        this.setState({
           loadingDetail:true,
        })
        Axios.get(Consts.BaseUrl + "AssignmentRoutine/" + id)
            .then(res => {
                console.log(res.data);
                this.setState({
                    loadingDetail: false,
                    detail: res.data,
                    showDetail: true,
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

    downloadFile = (id) =>{
        Axios.get(Consts.BaseUrl+"AssignmentRoutine/DownloadFile?routineId="+id)
        .then(res=>{
            var filename = this.state.detail.Name;
            fileDownload(res.data, filename);
        })
        .catch(err=>{
            console.log(err);
        });
    }

    render(){
        return(
            <div>
            <Datatable paginated showDetail={this.showDetail} url="AssignmentRoutine" route="routine" tableName="Routine" columns="Name=Assignment_Name,Faculty=Faculty_Name,Teacher=Teacher_Name,Year=Year_Batch,Semester=Semester_Name,Section=Section_Name,Release Date=Assignment_Release_Date,Deadline,Action"/>
            <Modal isOpen={this.state.showDetail}
                    className={'modal-info '+ this.props.className}>
                    <ModalHeader toggle={this.toggleInfo}>Detail of {this.state.detail.Assignment_Name}</ModalHeader>
                    <ModalBody>
                        <Table responsive striped size="sm">
                            <tbody>
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
                                <td>
                                    
                                </td>
                                <td>
                                {/* <a href={Consts.BaseUrl+"AssignmentRoutine/DownloadFile?routineId="+this.state.detail.Id} className="btn btn-success btn-sm">Download</a> */}
                                <Button className="btn btn-success btn-sm" onClick={()=>{this.downloadFile(this.state.detail.Id)}}><i className="fa fa-download"></i> Download</Button>
                                </td>
                            </tr>
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
