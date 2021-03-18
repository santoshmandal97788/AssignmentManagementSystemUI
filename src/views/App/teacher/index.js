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


export default class ListTeacher extends Component{
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
        Axios.get(Consts.BaseUrl + "Teacher/" + id)
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

    render(){
        return(
            <div>
            <Datatable paginated showDetail={this.showDetail} url="Teacher" route="teacher" tableName="Teacher" columns="Name/name=Name,Email,Phone,Address,Action"/>
            <Modal isOpen={this.state.showDetail}
                    className={'modal-info ' + this.props.className}>
                    <ModalHeader toggle={this.toggleInfo}>Detail of {this.state.detail.Name}</ModalHeader>
                    <ModalBody>
                        <Table responsive striped size="sm">
                            <tbody>
                            <tr>
                                <td>Name:</td>
                                <td>{this.state.detail.Name}</td>
                            </tr>
                            <tr>
                                <td>Email:</td>
                                <td>{this.state.detail.Email}</td>
                            </tr>
                            <tr>
                                <td>Contact No:</td>
                                <td>{this.state.detail.Phone}</td>
                            </tr>
                            <tr>
                                <td>Gender:</td>
                                <td>{this.state.detail.Address}</td>
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
