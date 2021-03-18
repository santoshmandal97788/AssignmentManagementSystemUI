import React, { Component } from 'react';
import Datatable from "../../../components/datatable";

export default class ListFaculty extends Component{
    render(){
        return(
            <Datatable paginated url="Faculty" route="faculty" tableName="Faculty" columns="Name=Faculty_Name,Action=Action1"/>
        )
    }
}
