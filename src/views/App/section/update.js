import React, { Component } from 'react';
import UpdateForm from '../../../components/updateForm';

export default class UpdateSection extends Component{
 render(){
     return(
         <UpdateForm url="Section" route="section" field="Sec_Name" name="Section" props={this.props}/>
     )
 }
}