import React, { Component } from 'react';
import UpdateForm from '../../../components/updateForm';

export default class UpdateYear extends Component{
 render(){
     return(
         <UpdateForm url="YearBatch" route="Year" field="Year_Batch" name="Year Batch" props={this.props}/>
     )
 }
}