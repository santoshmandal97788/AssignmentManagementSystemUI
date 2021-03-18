import React, { Component } from 'react';
// import Datatable from "../../../components/datatable";
import Axios from "axios";
// import Consts from "../../../Const";
import {Modal,ModalBody,ModalFooter,ModalHeader,Table,Button,Row,Col,Card,CardBody,CardFooter,CardHeader,FormGroup,Input} from "reactstrap";
import {PulseLoader} from "react-spinners";
import SweetAlert from "sweetalert-react";
import Select from "react-select";
import dateFormat from "dateformat";
import Const from "./../../Const";

export default class StudenProfile extends Component{
    constructor(props){
        super(props)
        this.state={
            loading:true,
            profile:{},
        }
    }

    getProfile = () =>{
        Axios.get(Const.BaseUrl+"Mobile/StudentDetails")
        .then(res=>{
            var data = res.data;
            console.log(data);
            this.setState({
                profile:data,
                loading:false,
            })
        })
        .catch(err=>{
            console.log(err);
            this.setState({
                loading:false,
            })
        })
    }

    componentDidMount(){
        this.getProfile();
    }
    

    render(){
        var profile = this.state.profile;
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
                <Col xs="12" md={{ size: 8, offset: 2 }}>
                    <Card>
                        <CardHeader>
                            <span className="h5">Profile</span>
                        </CardHeader>
                        <CardBody>
                        <Table>
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td className="text-muted">{profile.Name}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td className="text-muted">{profile.Email}</td>
                            </tr>
                            <tr>
                                <td>Address</td>
                                <td className="text-muted">{profile.Address}</td>
                            </tr>
                            <tr>
                                <td>Gender</td>
                                <td className="text-muted">{profile.Gender}</td>
                            </tr>
                            <tr>
                                <td>Phone</td>
                                <td className="text-muted">{profile.Phone}</td>
                            </tr>
                            <tr>
                                <td>Year Batch</td>
                                <td className="text-muted">{profile.Year_Batch}</td>
                            </tr>
                            <tr>
                                <td>Faculty</td>
                                <td className="text-muted">{profile.Faculty_Name}</td>
                            </tr>
                            <tr>
                                <td>Semester</td>
                                <td className="text-muted">{profile.Semester_Name}</td>
                            </tr>
                            <tr>
                                <td>Section</td>
                                <td className="text-muted">{profile.Sec_Name}</td>
                            </tr>
                        </tbody>
                    </Table>
                        </CardBody>
                    </Card>
                    
                </Col>
            </Row>
        )
    }
}