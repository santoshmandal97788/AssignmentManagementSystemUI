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

export default class List extends Component{
    render(){
        return(
            <Row>
            <Col xs="12" sm="6" lg="3">
                <a href="#/student/list" className="box-a">
            <Card className="bg-light">
              <CardBody className="pb-0" className='text-center'>
                <div className="text-value">
                    <i className="fa fa-users box-icon"></i>
                </div>
                <div className="h5 box-title">List Student</div>
              </CardBody>
            </Card>
            </a>
          </Col>

          <Col xs="12" sm="6" lg="3">
                <a href="#/teacher/list" className="box-a">
            <Card className="bg-light">
              <CardBody className="pb-0" className='text-center'>
                <div className="text-value">
                    <i className="fa fa-user box-icon"></i>
                </div>
                <div className="h5 box-title">List Teacher</div>
              </CardBody>
            </Card>
            </a>
          </Col>

          <Col xs="12" sm="6" lg="3">
                <a href="#/routine/list" className="box-a">
            <Card className="bg-light">
              <CardBody className="pb-0" className='text-center'>
                <div className="text-value">
                    <i className="fa fa-calendar box-icon"></i>
                </div>
                <div className="h5 box-title">List Routine</div>
              </CardBody>
            </Card>
            </a>
          </Col>

          <Col xs="12" sm="6" lg="3">
                <a href="#/assignment/list" className="box-a">
            <Card className="bg-light">
              <CardBody className="pb-0" className='text-center'>
                <div className="text-value">
                    <i className="fa fa-book box-icon"></i>
                </div>
                <div className="h5 box-title">List Assignment</div>
              </CardBody>
            </Card>
            </a>
          </Col>

          <Col xs="12" sm="6" lg="3">
                <a href="#/year/list" className="box-a">
            <Card className="bg-light">
              <CardBody className="pb-0" className='text-center'>
                <div className="text-value">
                    <i className="cui-calendar box-icon"></i>
                </div>
                <div className="h5 box-title">List Year Batch</div>
              </CardBody>
            </Card>
            </a>
          </Col>

          <Col xs="12" sm="6" lg="3">
                <a href="#/faculty/list" className="box-a">
            <Card className="bg-light">
              <CardBody className="pb-0" className='text-center'>
                <div className="text-value">
                    <i className="icon-book-open box-icon"></i>
                </div>
                <div className="h5 box-title">List Faculty</div>
              </CardBody>
            </Card>
            </a>
          </Col>
            
          <Col xs="12" sm="6" lg="3">
                <a href="#/semester/list" className="box-a">
            <Card className="bg-light">
              <CardBody className="pb-0" className='text-center'>
                <div className="text-value">
                    <i className="fa fa-graduation-cap box-icon"></i>
                </div>
                <div className="h5 box-title">List Semester</div>
              </CardBody>
            </Card>
            </a>
          </Col>

          

          <Col xs="12" sm="6" lg="3">
                <a href="#/section/list" className="box-a">
            <Card className="bg-light">
              <CardBody className="pb-0" className='text-center'>
                <div className="text-value">
                    <i className="fa fa-map-marker box-icon"></i>
                </div>
                <div className="h5 box-title">List Section</div>
              </CardBody>
            </Card>
            </a>
          </Col>

            </Row>
        );
    }
}