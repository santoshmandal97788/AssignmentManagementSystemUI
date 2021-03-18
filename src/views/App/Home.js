import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader,
     Col, Row,ListGroup,ListGroupItem,Table } from 'reactstrap';
import Axios from 'axios';
import { Bar, Doughnut, Line, Pie, Polar, Radar } from 'react-chartjs-2';

const pie = {
    labels: [
      'john',
      'santosh',
      'Yellow',
    ],
    datasets: [
      {
        data: [800, 500, 100],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
        ],
        hoverBackgroundColor: [
          '#FF6339',
          '#36A2EB',
          '#FFCE56',
        ],
      }],
  };
class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            isloaded:false,
            data:null,
        }
    }
    
    componentDidMount(){
        var username = 'admin@gmail.com';
        var password = 'Password';
        var basicAuth = 'Basic ' + btoa(username + ':' + password);
        var authorization =  {headers: { 'Authorization': + basicAuth }};
        Axios.get('http://localhost:47730/api/Student',authorization)
        .then(res=>{
            console.log(res);
            this.setState({
                data:res.data,
                isLoaded:true,
            })
        })
        .catch(err=>{
            console.log(err);
            this.setState({
                isLoaded:true,
            })
        })
    }

  render() {
      if(!this.state.isloaded){
          return(
              <div>
                  <h1>
                      Loading....
                  </h1>
              </div>
          );
      }
    return (
      <div className="animated fadeIn">
       <Row>
       <Col xs="12" sm="12" md="12">
            <Card>
              <CardHeader>
                  Countries
              </CardHeader>
              <CardBody>
                  <Table responsive bordered>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Capital</th>
                            <th>Region</th>
                            <th>Population</th>
                            <th>Area</th>
                            <th>Flag</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.data.map((data,id)=>{
                                return(
                                    <tr key={id}>
                                        <td>{data.name}</td>
                                        <td>{data.capital}</td>
                                        <td>{data.region}</td>
                                        <td>{data.population}</td>
                                        <td>{data.area}</td>
                                        <td>
                                            <img src={data.flag} width={100}/>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                  </Table>
              </CardBody>
            </Card>
          </Col>
       </Row>
      </div>
    );
  }
}

export default Home;
