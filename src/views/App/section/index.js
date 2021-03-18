import React, { Component } from 'react';
import Datatable from "../../../components/datatable";

export default class ListSemester extends Component{
    render(){
        return(
            <Datatable paginated url="Section" route="section" tableName="Section" columns="Name=Sec_Name,Action=Action1"/>
        )
    }
}
