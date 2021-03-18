import React, { Component } from 'react';
import UpdateForm from '../../../components/updateForm';

export default class UpdateSemester extends Component{
 render(){
     return(
         <UpdateForm url="Semester" route="semester" field="Semester_Name" name="Semester" props={this.props}/>
     )
 }
}