import React, { Component } from 'react';
import {
    Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, Form, FormGroup, Label, Input, FormText,
    Badge, CardFooter, Button,
    Col, Row, ListGroup, ListGroupItem, Table,Modal,ModalBody
} from 'reactstrap';
import Axios from 'axios';
import { css } from '@emotion/core';
// First way to import
import { ClipLoader,PulseLoader,BounceLoader,CircleLoader,FadeLoader,MoonLoader, } from 'react-spinners';
import SweetAlert from 'sweetalert-react';
import sacss from 'sweetalert/dist/sweetalert.css';
import Consts from './../../../Const';
import CreateForm from './../../../components/form';

export default class CreateFaculty extends Component{
 render(){
     return(
         <CreateForm url="Faculty" field="Faculty_Name" name="Faculty"/>
     )
 }
}