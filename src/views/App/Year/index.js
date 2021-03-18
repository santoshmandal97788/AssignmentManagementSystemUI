import React, { Component } from 'react';
import Datatable from "../../../components/datatable";

export default class ListYear extends Component{
    render(){
        return(
            <Datatable paginated url="YearBatch" route="year" tableName="Year Batch" columns="Year=Year_Batch,Action=Action1"/>
        )
    }
}
