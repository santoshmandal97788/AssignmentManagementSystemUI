import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader,
     Col, Row,ListGroup,ListGroupItem,Table } from 'reactstrap';
import Axios from 'axios';
import { Bar, Doughnut, Line, Pie, Polar, Radar } from 'react-chartjs-2';
import Consts from "./../../Const";

export default class FileUpload extends Component{
    constructor(props){
        super(props);
        this.state={
            file:''
        }
    }
    
    updateFile = (data)=>{
        this.setState({
            file:data.target.files[0],
        })
    }

    uploadFile = ()=>{
        var pdata = new FormData();
        pdata.append("postedFile",this.state.file);
        pdata.append("john", "this.state.file");
        console.log(pdata);
        console.log(this.state.file);
        Axios.post(Consts.BaseUrl+"Routine/Upload",pdata,{
            headers: {
              'Content-Type': 'multipart/form-data'
            }})
        .then(res=>{
            console.log(res);
        })
        .catch(err=>{
            console.log(err);
        });
    }

    render(){
        return(
            <div>
                <input type="file" id='photo' name="postedFile" onChange={this.updateFile}></input>
                <button onClick={this.uploadFile} >upload</button>
            </div>
        )
    }
}