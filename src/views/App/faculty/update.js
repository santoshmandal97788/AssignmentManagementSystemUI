import React, { Component } from 'react';
import UpdateForm from '../../../components/updateForm';

export default class UpdateFaculty extends Component{
 render(){
     return(
         <UpdateForm url="Faculty" route="faculty" field="Faculty_Name" name="Faculty" props={this.props}/>
     )
 }
}