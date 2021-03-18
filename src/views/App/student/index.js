import React, { Component } from 'react';
import {
    Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader,
    Col, Row, ListGroup, ListGroupItem, Table, Button, Modal, ModalBody, ModalHeader, ModalFooter
} from 'reactstrap';
import SweetAlert from 'sweetalert-react';
import sacss from 'sweetalert/dist/sweetalert.css';
import { ClipLoader, PulseLoader, BounceLoader, CircleLoader, FadeLoader, MoonLoader, } from 'react-spinners';
import Axios from 'axios';
import { Bar, Doughnut, Line, Pie, Polar, Radar } from 'react-chartjs-2';
import Consts from './../../../Const';
import Datatable from "./../../../components/datatable";

export default class ListStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allStudent: [],
            isLoaded: false,
            successDel: false,
            deleting: false,
            delerror: false,
            confirmdel: false,
            showDetail: false,
            delPerson: '',
            studentDetail: {},
            delId: '',
            detailError:false,
            detailErrorMessage:'error',
        }
    }

    showDetail = (id) => {
        console.log(id);
        console.log("inside the detail");
        this.setState({
           loadingDetail:true,
        })
        Axios.get(Consts.BaseUrl + "Student/" + id)
            .then(res => {
                console.log(res.data);
                this.setState({
                    loadingDetail: false,
                    studentDetail: res.data,
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

    render() {
        return (
            <div>
                <Datatable url="Student" paginated showDetail={this.showDetail} route="student" tableName="Student" columns="Name,Email,Address,Gender,Faculty=Faculty_Name,Section=Sec_Name,Smester=Semester_Name,Phone,Year=Year_Batch,Action" />
                <Modal isOpen={this.state.showDetail}
                    className={'modal-info ' + this.props.className}>
                    <ModalHeader toggle={this.toggleInfo}>Detail of {this.state.studentDetail.Name}</ModalHeader>
                    <ModalBody>
                        <Table responsive striped size="sm">
                            <tbody>
                            <tr>
                                <td>Name:</td>
                                <td>{this.state.studentDetail.Name}</td>
                            </tr>
                            <tr>
                                <td>Email:</td>
                                <td>{this.state.studentDetail.Email}</td>
                            </tr>
                            <tr>
                                <td>Contact No:</td>
                                <td>{this.state.studentDetail.Phone}</td>
                            </tr>
                            <tr>
                                <td>Gender:</td>
                                <td>{this.state.studentDetail.Gender}</td>
                            </tr>
                            <tr>
                                <td>Address:</td>
                                <td>{this.state.studentDetail.Address}</td>
                            </tr>
                            <tr>
                                <td>Year:</td>
                                <td>{this.state.studentDetail.Year_Batch}</td>
                            </tr>
                            <tr>
                                <td>Faculty:</td>
                                <td>{this.state.studentDetail.Faculty_Name}</td>
                            </tr>
                            <tr>
                                <td>Semester:</td>
                                <td>{this.state.studentDetail.Semester_Name}</td>
                            </tr>
                            <tr>
                                <td>Section:</td>
                                <td>{this.state.studentDetail.Sec_Name}</td>
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
            //         <Row>
            //    <Col xs="12" sm="12" md="12">
            //         <Card>
            //           <CardHeader>
            //               Students
            //           </CardHeader>
            //           <CardBody>
            //               <Table responsive bordered>
            //                 <thead>
            //                     <tr>
            //                         <th>Name</th>
            //                         <th>Email</th>
            //                         <th>Gender</th>
            //                         <th>Phone</th>
            //                         <th>Year</th>
            //                         <th>Actions</th>
            //                     </tr>
            //                 </thead>
            //                 <tbody>
            //                     {
            //                         this.state.allStudent.map((data,id)=>{
            //                             return(
            //                                 <tr key={id}>
            //                                     <td>{data.Name}</td>
            //                                     <td>{data.Email}</td>
            //                                     <td>{data.Gender}</td>
            //                                     <td>{data.Phone}</td>
            //                                     <td>{data.Year_Batch}</td>
            //                                     <td>
            //                                         <Button color="danger" size="sm" onClick = {()=>{this.ConfirmDelete(data.Student_Id,data.Name)}}>del</Button>
            //                                         <Button color="primary" size="sm" onClick={()=>this.showDetail(data.Student_Id)}>Show</Button>
            //                                     </td>
            //                                 </tr>
            //                             )
            //                         })
            //                     }
            //                 </tbody>
            //               </Table>
            //           </CardBody>
            //         </Card>
            //       </Col>
            //       <Modal isOpen={this.state.deleting} toggle={this.toggle} className={this.props.className}>
            //         <ModalBody>
            //             <Row>
            //                 <Col>
            //                 <h1>
            //                     Deleteing
            //                 </h1>

            //                 </Col>
            //                 <Col>
            //                     <PulseLoader
            //                         size={40}
            //                         color="#59c9e7"
            //                         loading={true}
            //                     />
            //                 </Col>
            //             </Row>
            //         </ModalBody>
            //      </Modal>
            //      <Modal isOpen={this.state.loadingDetail}>
            //         <ModalBody>
            //             <Row>
            //                 <Col>
            //                 <h1>
            //                     Please Wait 
            //                 </h1>

            //                 </Col>
            //                 <Col>
            //                     <PulseLoader
            //                         size={40}
            //                         color="#59c9e7"
            //                         loading={true}
            //                     />
            //                 </Col>
            //             </Row>
            //         </ModalBody>
            //      </Modal>
            //    <SweetAlert
            //        show={this.state.successDel}
            //        type="success"
            //        title="Deleted SuccessFully"
            //        // text="SweetAlert in React"
            //        onConfirm={() => this.setState({ successDel: false })}
            //        onOutsideClick={() => this.setState({ successDel: false })}
            //    />
            //    <SweetAlert
            //        show={this.state.delerror}
            //        type="error"
            //        title="Error"
            //        // text="SweetAlert in React"
            //        onConfirm={() => this.setState({ delerror: false })}
            //        onOutsideClick={() => this.setState({ delerror: false })}
            //    />
            //    <SweetAlert
            //             show={this.state.confirmdel}
            //             title={"Are you sure want to delete "+this.state.delPerson+" ?"}
            //             showCancelButton
            //             onConfirm={() => this.delRow(this.state.delId)}
            //             onOutsideClick={() => this.setState({ confirmdel: false })}
            //             onCancel={() => this.setState({ confirmdel: false })}
            //         />
            //         <Modal isOpen={this.state.showDetail}
            //                    className={'modal-info ' + this.props.className}>
            //               <ModalHeader toggle={this.toggleInfo}>Detail 0f {this.state.studentDetail.Name}</ModalHeader>
            //               <ModalBody>
            //                   <Table responsive striped size="sm">
            //                       <tr>
            //                           <td>Name:</td>
            //                           <td>{this.state.studentDetail.Name}</td>
            //                       </tr>
            //                       <tr>
            //                           <td>Email:</td>
            //                           <td>{this.state.studentDetail.Email}</td>
            //                       </tr>
            //                       <tr>
            //                           <td>Contact No:</td>
            //                           <td>{this.state.studentDetail.Phone}</td>
            //                       </tr>
            //                       <tr>
            //                           <td>Gender:</td>
            //                           <td>{this.state.studentDetail.Gender}</td>
            //                       </tr>
            //                       <tr>
            //                           <td>Address:</td>
            //                           <td>{this.state.studentDetail.Address}</td>
            //                       </tr>
            //                       <tr>
            //                           <td>Year:</td>
            //                           <td>{this.state.studentDetail.Year_Batch}</td>
            //                       </tr>
            //                       <tr>
            //                           <td>Faculty:</td>
            //                           <td>{this.state.studentDetail.Faculty_Name}</td>
            //                       </tr>
            //                       <tr>
            //                           <td>Semester:</td>
            //                           <td>{this.state.studentDetail.Semester_Name}</td>
            //                       </tr>
            //                       <tr>
            //                           <td>Section:</td>
            //                           <td>{this.state.studentDetail.Sec_Name}</td>
            //                       </tr>
            //                   </Table>
            //               </ModalBody>
            //               <ModalFooter>
            //                 <Button color="primary"onClick={()=>{this.setState({showDetail:false})}}>Ok</Button>{' '}
            //               </ModalFooter>
            //             </Modal>
            //    </Row>

        );
    }
}