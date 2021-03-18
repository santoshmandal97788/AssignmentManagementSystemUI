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
import Consts from '../../Const';
import Select from "react-select";

export default class Add extends Component{
    render(){
        return(
            <Row>
            <Col xs="12" sm="6" lg="3">
                <a href="#/student/add" className="box-a">
            <Card className="bg-light">
              <CardBody className="pb-0" className='text-center'>
                <div className="text-value">
                    <i className="fa fa-users box-icon"></i>
                </div>
                <div className="h5 box-title">Add Student</div>
              </CardBody>
            </Card>
            </a>
          </Col>

          <Col xs="12" sm="6" lg="3">
                <a href="#/teacher/add" className="box-a">
            <Card className="bg-light">
              <CardBody className="pb-0" className='text-center'>
                <div className="text-value">
                    <i className="fa fa-user box-icon"></i>
                </div>
                <div className="h5 box-title">Add Teacher</div>
              </CardBody>
            </Card>
            </a>
          </Col>

          <Col xs="12" sm="6" lg="3">
                <a href="#/routine/add" className="box-a">
            <Card className="bg-light">
              <CardBody className="pb-0" className='text-center'>
                <div className="text-value">
                    <i className="fa fa-calendar box-icon"></i>
                </div>
                <div className="h5 box-title">Add Routine</div>
              </CardBody>
            </Card>
            </a>
          </Col>

          <Col xs="12" sm="6" lg="3">
                <a href="#/assignment/add" className="box-a">
            <Card className="bg-light">
              <CardBody className="pb-0" className='text-center'>
                <div className="text-value">
                    <i className="fa fa-book box-icon"></i>
                </div>
                <div className="h5 box-title">Add Assignment</div>
              </CardBody>
            </Card>
            </a>
          </Col>

          <Col xs="12" sm="6" lg="3">
                <a href="#/year/add" className="box-a">
            <Card className="bg-light">
              <CardBody className="pb-0" className='text-center'>
                <div className="text-value">
                    <i className="cui-calendar box-icon"></i>
                </div>
                <div className="h5 box-title">Add Year Batch</div>
              </CardBody>
            </Card>
            </a>
          </Col>

          <Col xs="12" sm="6" lg="3">
                <a href="#/faculty/add" className="box-a">
            <Card className="bg-light">
              <CardBody className="pb-0" className='text-center'>
                <div className="text-value">
                    <i className="icon-book-open box-icon"></i>
                </div>
                <div className="h5 box-title">Add Faculty</div>
              </CardBody>
            </Card>
            </a>
          </Col>
            
          <Col xs="12" sm="6" lg="3">
                <a href="#/semester/add" className="box-a">
            <Card className="bg-light">
              <CardBody className="pb-0" className='text-center'>
                <div className="text-value">
                    <i className="fa fa-graduation-cap box-icon"></i>
                </div>
                <div className="h5 box-title">Add Semester</div>
              </CardBody>
            </Card>
            </a>
          </Col>

          

          <Col xs="12" sm="6" lg="3">
                <a href="#/section/add" className="box-a">
            <Card className="bg-light">
              <CardBody className="pb-0" className='text-center'>
                <div className="text-value">
                    <i className="fa fa-map-marker box-icon"></i>
                </div>
                <div className="h5 box-title">Add Section</div>
              </CardBody>
            </Card>
            </a>
          </Col>

            </Row>
        );
    }
}