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
            data: [
                {
                    id: 1,
                    name: "Staplet",
                    quantity: 4
                },
                {
                    id: 2,
                    name: "Thumb Tracks Large",
                    quantity: 5
                },
                {
                    id: 3,
                    name: "Folder Plastic Blue",
                    quantity: 5
                },
                {
                    id: 4,
                    name: "Transparency Pen",
                    quantity: 5
                },
            ], 
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
                <Header/>
                <div className="container">
                    <div className="mt-1" ref={ref}>
                        <div class="col-md-12 mx-auto text-center">
                          <p class="display-4">Disbursement List</p>
                        </div>
                        <div className="row mt-1 pt-10">
                            <div className="col-sm-6">
                                <p>Date:  {this.date}</p>
                                <p>Collection point :  {this.collectionPoint}</p>
                            </div>
                            <div className="col-sm-6">
                                <div className="float-right">
                                    <p>Department name:   {this.department}</p>
                                    <p>Department representative:   {this.deptRept}</p>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <DisbursementRow data={this.state.data} />
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
                    </div>
                </div>
            </div>
        )
    }
}

export default DisbursementList;
