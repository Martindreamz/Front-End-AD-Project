import React, { Component } from "react";
import Header from '../Components/Headers/Header';
import DisbursementRow from '../Components/DisbursementRow';
import './RecievedGoods.css';
import { domain } from '../Configurations/Config';
import axios from 'axios';
import Pdf from "react-to-pdf";
const ref = React.createRef();

class DisbursementList extends React.Component {
    constructor() {
        super()
        this.date="12 Dec 2019"
        this.department= "Registrar Department"
        this.deptRept= "Mr John Lau"
        this.collectionPoint = "Science Department" 
        this.state = {
            data: [], 
        }
    }

    //Run once before render - lifecycle
    componentDidMount() {
        //HTTP get request
        axios.get('')
            .then(response => {
                const items = response.data;
                this.setState({ data: items });
            })
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="mt-1" ref={ref}>
                        <div class="col-md-12 mx-auto text-center">
                          <p class="display-4">Disbursement List</p>
                        </div>
                        <div className="row mt-1 pt-10">
                            <div className="col-sm-6">
                                <p>Date:  {this.props.deliveryInfo.date}</p>
                                <p>Collection point :  {this.props.deliveryInfo.collectionPoint}</p>
                            </div>
                            <div className="col-sm-6">
                                <div className="float-right">
                                    <p>Department name:   {this.props.deliveryInfo.departmentName}</p>
                                    <p>Department representative:   {this.props.deliveryInfo.representativeName}</p>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <DisbursementRow data={this.props.data}/>
                        </div>
                    </div>
                    <div className="row float-right">
                        <Pdf targetRef={ref} filename="DisbursementList.pdf">
                            {({ toPdf }) => (
                              <button class="button" onClick={toPdf}>
                                Print
                              </button>
                            )}
                        </Pdf>
                        <button class="button" onClick={()=>this.props.showList()}>
                                Back
                        </button>
                    </div>

                </div>
            </div>
        )
    }
}

export default DisbursementList;
