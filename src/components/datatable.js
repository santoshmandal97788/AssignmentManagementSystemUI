import React, { Component } from 'react';
import {
    Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader,
    Col, Row, ListGroup, ListGroupItem, Table, Button, Modal, ModalBody, ModalHeader, ModalFooter,Input,FormGroup,ButtonGroup
} from 'reactstrap';
import SweetAlert from 'sweetalert-react';
import sacss from 'sweetalert/dist/sweetalert.css';
import { ClipLoader, PulseLoader, BounceLoader, CircleLoader, FadeLoader, MoonLoader, } from 'react-spinners';
import Axios from 'axios';
import { Bar, Doughnut, Line, Pie, Polar, Radar } from 'react-chartjs-2';
import Consts from './../Const';
import LoadingOverlay from 'react-loading-overlay';
import dateFormat from "dateformat";

export default class Datatable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: [],
            isLoaded: false,
            successDel: false,
            deleting: false,
            delerror: false,
            confirmdel: false,
            showDetail: false,
            delPerson: '',
            studentDetail: {},
            delId: '',
            search:'',
            pageSize:10,
            currentPage:1,
            serverData:"",
            totalPage:1,
            totalRecord:1,
            progress: 0,
            error: false,
            tableLoading:false,
            routineId:''
        }
    }

    errorDone(){
        this.setState({ error: false })
      }
    
      progressDone() {
        this.setState({ progress: 0 })
      }

    updateData = (event) =>{
        this.setState({
            [event.target.id]:event.target.value,
            currentPage:1,
        },()=>{
            this.renderPagination();
            this.getTableData();
        })
    }
    

     getTableData =async() => {
        this.setState({
            tableLoading:true,
        })
        var surl = 'http://localhost:47730/api/Student';
        var username = 'admin@gmail.com';
        var password = 'Password';
        // var basicAuth = 'Basic' + btoa(username + ':' + password);
        var authorization = {
            auth: {
                username: username,
                password: password,
            }
        };
        var params;
        if(this.props.paginated){
            params= "?pageSize="+this.state.pageSize+"&currentPage="+this.state.currentPage+"&searchText="+this.state.search;
            if(this.props.routineParam){
                params= "?pageSize="+this.state.pageSize+"&currentPage="+this.state.currentPage+"&searchText="+this.state.search+"&routineid="+this.props.routineId;
            }
        }else{
            params = "";
        }
        await Axios.get(Consts.BaseUrl + this.props.url+params)
            .then(res => {
                console.log(res)
                console.log(res.data);
                var tableData;
                var totalPage;
                var totalRecord;
                if(this.props.paginated){
                    tableData= res.data.Data.List;
                    totalPage = res.data.Data.totalPage;
                    totalRecord = res.data.Data.totalRecord;
                }else{
                    tableData=res.data;
                    totalPage=""
                }
                this.setState({
                    tableData: tableData,
                    isLoaded: true,
                    serverData:res.data.Data,
                    totalPage:totalPage,
                    totalRecord:totalRecord,
                    tableLoading:false,
                },()=>{
                    this.renderHeader();
                    this.renderBody();
                    this.renderPagination();
                })
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    isLoaded: true,
                    tableLoading:false, 
                })
            })
    }

    renderHeader = () => {
        var rawColumns = this.props.columns;
        var columnsArray = rawColumns.split(",");
        var properColumns = [];
        for(var i=0; i<columnsArray.length; i++){
            var ColumnNotSplitedWithEqual = columnsArray[i];
            var columnSplitedWithEqual = ColumnNotSplitedWithEqual.split("=");
            var mainColumn = columnSplitedWithEqual[0];
            properColumns.push(mainColumn);
            
        }  
        return (
            <tr>
                {properColumns.map((data,id)=>{
                    return(
                        <th key={id}>{data}</th>
                    )
                })}
            </tr>
        )
    }

    // for rendering the table body
    renderBody=()=>{
        var rawColumns = this.props.columns;
        var columnsArray = rawColumns.split(",");
        var properColumns = [];
        var properHeaderColumns =[];
        for(var i=0; i<columnsArray.length; i++){
            var ColumnNotSplitedWithEqual = columnsArray[i];
            var mainColumn;
            var headerColumn;
            if(ColumnNotSplitedWithEqual.includes("=")){
                var columnSplitedWithEqual = ColumnNotSplitedWithEqual.split("=");
                mainColumn = columnSplitedWithEqual[1];
                headerColumn = columnSplitedWithEqual[0];
            }else{
                mainColumn = ColumnNotSplitedWithEqual;
                headerColumn = mainColumn;
            }
            properColumns.push(mainColumn);
            properHeaderColumns.push(headerColumn);
        }  
        // var columns = columnsArray;
        if(this.state.tableData.length==0){
            return <tr><td colSpan={properColumns.length}><div md="12" className="text-center">No Data Available</div></td></tr>
        }
        return(
            this.state.tableData.map((data, id) => {
                var row=[];
                for(var j=0; j<properColumns.length; j++){
                    var eachHeaderColumn = properHeaderColumns[j];
                    var eachColumn = properColumns[j];
                    var newCol = <td key={j}>{data[eachColumn]}</td>;
                    if(eachHeaderColumn.includes("Date")||eachHeaderColumn.includes("Deadline")){
                        newCol = <td key={j}>{dateFormat(data[eachColumn],"yyyy-mm-dd")}</td>
                    }
                    if(eachColumn == "Action"){
                        newCol = <td key={j}>
                                
                                <a className="icon-user text-primary" title="show detail" onClick={(id)=>{this.props.showDetail(data.Id)}}></a>
                            {" "}
                            <a href={"#/"+this.props.route+"/update?id="+data.Id} title="Update" className="cui-pencil text-warning" color="primary" size="sm">
                            </a>
                            {/* {" "}
                            <a className="cui-trash text-danger" title="delete" onClick={() => { this.ConfirmDelete(data.Id, data.Name) }}></a>
                            {" "} */}
                        </td>
                    }
                    
                    if(eachColumn == "Action1"){
                        newCol = <td key={j}>
                            <a href={"#/"+this.props.route+"/update?id="+data.Id} title="Update" className="cui-pencil text-warning" color="primary" size="sm">
                            </a>
                        </td>
                    }
                    if(data[eachColumn]==0){
                        newCol = <td key={j}><i className="fa fa-close text-danger"></i></td>
                    }
                    if(data[eachColumn]==1){
                        newCol = <td key={j}><i className="fa fa-check text-success"></i></td>
                    }
                    if(eachColumn=="Assignmnet_Location"){
                        if(data[eachColumn]==0){
                            newCol=<td key={j}>College</td>
                        }
                        if(data[eachColumn]==1){
                            newCol=<td key={j}>Teacher</td>
                        }
                        if(data[eachColumn]==2){
                            newCol=<td key={j}>Student</td>
                        }
                    }
                    if(eachColumn=="Marking"){
                        if(data[eachColumn]==1){
                            newCol=<td key={j}><span className="text-danger h5">Fail</span></td>
                        }
                        if(data[eachColumn]==2){
                            newCol=<td key={j}><span className="text-success h5">Pass</span></td>
                        }
                        if(data[eachColumn]==3){
                            newCol=<td key={j}><span className="text-success h5">Merit</span></td>
                        }
                        if(data[eachColumn]==4){
                            newCol=<td key={j}><span className="text-success h5">Distinction</span></td>
                        }
                    }

                    row.push(newCol);
                }
                return (
                    <tr key={id}>
                        {row}
                    </tr>
                )
            })
        )
    }


    componentDidMount() {
        // console.log(this.props.columns);
        this.getTableData();
        this.renderHeader();
        this.renderBody();
        
    }

    ChangePage = (e) =>{
        console.log(e.target.id);
        var page = e.target.id;
        this.setState({
            currentPage:page,
        },()=>{
            this.getTableData();
        })
    }

    prebtn = ()=>{
        var currentPage = this.state.currentPage;
        this.setState({
            currentPage:currentPage-1,
        },()=>{
            this.getTableData();
        })
    }

    nextbtn = ()=>{
        var currentPage = parseInt(this.state.currentPage);
        console.log(currentPage);
        this.setState({
            currentPage:currentPage+1,
        },()=>{
            this.getTableData();
        })
    }

    renderPagination=()=>{
        if(this.props.paginated){
            var totalPage = this.state.serverData.totalPage;
        var btns=[];
        var prebtn = <Button key={-1} className="page-link" aria-label="Previous" disabled={this.state.currentPage==1} onClick={()=>this.prebtn()}>
                        <span aria-hidden="true">Prev</span>
                        <span className="sr-only">Previous</span>
                    </Button>;
        var nextbtn = <Button key={1000000000000000000000000000000} className="page-link" aria-label="Previous" disabled={this.state.currentPage==this.state.totalPage} onClick={()=>this.nextbtn()}>
                        <span aria-hidden="true">Next</span>
                        <span className="sr-only">Next</span>
                    </Button>
                    
        for(var i=0; i<totalPage; i++){  
            var eachbtn = <Button key={i} className="page-link" id={i+1} active={this.state.currentPage==i+1} onClick={this.ChangePage}>{i+1}</Button>
            btns.push(eachbtn);
        }
        var from = (this.state.pageSize*(this.state.currentPage-1))+1;
        var to;
        if(this.state.currentPage == this.state.totalPage){
            to = this.state.totalRecord;
        }else{
            to = parseInt(from)+parseInt(this.state.pageSize)-1;
        }
        var pagination = (
        <Row>
        <Col md="8" >
        <ButtonGroup className="pagination-btn">{[prebtn,btns,nextbtn]}</ButtonGroup>
        </Col>
        <Col className="text-right">
            Showing {from} to {to} of {this.state.totalRecord} entries
        </Col>
        </Row>
        );

        return pagination;
        }
    }

    delRow = (id) => {
        this.setState({
            confirmdel: false,
            deleting: true,
        });
        var fullurl = this.props.url;
        var url = fullurl.split("?")[0];
        Axios.delete(Consts.BaseUrl + url + "/" + id)
            .then(res => {
                this.setState({
                    deleting: false,
                    successDel: true,
                })
                this.getTableData();
                this.renderHeader();
                this.renderBody();
            })
            .catch(err => {
                console.log("inside the error");
                console.log(err);
                this.setState({
                    deleting: false,
                    delerror: true,
                })
            });
    }

    ConfirmDelete(id, name) {
        this.setState({
            delPerson: name,
            confirmdel: true,
            delId: id,
        })
    }

    showDetail = (id) => {
        this.setState({
            loadingDetail: true,
        })
        Axios.get(Consts.BaseUrl + "Student/" + id)
            .then(res => {
                console.log(res.data);
                this.setState({
                    loadingDetail: false,
                    studentDetail: res.data,
                    showDetail: true,
                })

            })
            .catch(res => {
                this.setState({
                    loadingDetail: false,
                    delerror: true,
                })
            });

    }

    render() {
        if (!this.state.isLoaded) {
            return (
                <div className="text-center" style={{width:"100%",height:"70vh",display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <PulseLoader
                     size={40}
                     color="#ef7e2d"
                     loading={true}
                    />  
                </div>
                // ClipLoader, PulseLoader, BounceLoader, CircleLoader, FadeLoader, MoonLoader,
            );
        }
        return (
            <Row>
                <Col xs="12" sm="12" md="12">
                    <Card>
                        <CardHeader>
                            <span className="h5">{this.props.tableName} List</span>
                            {"  "}
                            <a className='btn btn-primary btn-sm pull-right' href={"#/"+this.props.route+"/add"}><i className='fa fa-plus'></i> Add New</a>
                        </CardHeader>
                        <CardBody>
                            <FormGroup row hidden={this.props.noFilter}>
                                <Col md="3" hidden={!this.props.paginated}>
                                    <div className="input-prepend input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">Show Entries</span>
                                        </div>
                                    <Input type="select" id="pageSize" value={this.state.pageSize} onChange={this.updateData}>
                                        <option value="5">5</option>
                                        <option value="10">10</option>
                                        <option value="25">25</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                    </Input>
                                    </div>
                                </Col>
                                <Col md="4" xs="12" className="ml-auto">
                                <div className="input-prepend input-group">
                                    <div className="input-group-prepend">
                                        <i className="fa fa-search input-group-text"></i>
                                    </div>
                                <Input type="text" id="search" name="text-input" value={this.state.search} placeholder="Search" onChange={this.updateData} autoComplete="off"/>
                                </div>
                                </Col>
                            </FormGroup>
                            <div className="table-wrapper">
                            <LoadingOverlay
                                        active={this.state.tableLoading}
                                        spinner
                                        styles={{
                                            spinner: (base) => ({
                                              ...base,
                                              width: '100px',
                                              '& svg circle': {
                                                stroke: '#e48030'
                                              },
                                              marginTop:"50px",
                                            })
                                          }}
                                        text='Loading...'
                                        >
                            </LoadingOverlay>
                            <Table responsive bordered striped>
                            
                                <thead>
                                    <this.renderHeader />
                                </thead>
                                <tbody>
                                
                                    <this.renderBody/>
                                </tbody>
                            </Table>
                            </div>
                                
                                    {/* <Button className="page-link" aria-label="Previous" disabled={this.state.currentPage==1} onClick={()=>this.prebtn()}>
                                        <span aria-hidden="true">Prev</span>
                                        <span className="sr-only">Previous</span>
                                    </Button> */}
                                
                                
                                {this.renderPagination()}
                                
                                
                                    {/* <Button className="page-link" aria-label="Previous" disabled={this.state.currentPage==this.state.totalPage} onClick={()=>this.nextbtn()}>
                                        <span aria-hidden="true">Next</span>
                                        <span className="sr-only">Next</span>
                                    </Button> */}
                                
                        </CardBody>
                    </Card>
                </Col>
                <Modal isOpen={this.state.deleting} toggle={this.toggle} className={this.props.className}>
                    <ModalBody>
                        <Row>
                            <Col>
                                <h1>
                                    Deleteing
                    </h1>

                            </Col>
                            <Col>
                                <PulseLoader
                                    size={40}
                                    color="#59c9e7"
                                    loading={true}
                                />
                            </Col>
                        </Row>
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.loadingDetail}>
                    <ModalBody>
                        <Row>
                            <Col>
                                <h1>
                                    Please Wait
                    </h1>

                            </Col>
                            <Col>
                                <PulseLoader
                                    size={40}
                                    color="#59c9e7"
                                    loading={true}
                                />
                            </Col>
                        </Row>
                    </ModalBody>
                </Modal>
                <SweetAlert
                    show={this.state.successDel}
                    type="success"
                    title="Deleted SuccessFully"
                    // text="SweetAlert in React"
                    onConfirm={() => this.setState({ successDel: false })}
                    onOutsideClick={() => this.setState({ successDel: false })}
                />
                <SweetAlert
                    show={this.state.delerror}
                    type="error"
                    title="Error"
                    // text="SweetAlert in React"
                    onConfirm={() => this.setState({ delerror: false })}
                    onOutsideClick={() => this.setState({ delerror: false })}
                />
                <SweetAlert
                    show={this.state.confirmdel}
                    title={"Are you sure want to delete ?"}
                    showCancelButton
                    onConfirm={() => this.delRow(this.state.delId)}
                    onOutsideClick={() => this.setState({ confirmdel: false })}
                    onCancel={() => this.setState({ confirmdel: false })}
                />
            </Row>
        );
    }
}