import React, { Component } from 'react';
import Datatable from "../../../components/datatable";

export default class ListSemester extends Component{
    render(){
        return(
            <Datatable paginated url="Semester" route="semester" tableName="Semester" columns="Name=Semester_Name,Action=Action1"/>
        )
    }
}
