import React from 'react';
import RequisitionHistoryTable from '../Components/RequisitionHistoryTable';
import RequisitionHistoryDetails from '../Components/RequisitionHistoryDetails';
import Header from '../Components/Headers/Header';
import axios from 'axios';

class RequisitionHistory extends React.Component{
    constructor(){
        super()
        this.state = {
            //test data
            reqData: [
                {
                    ReqID: "DDS/111/10",
                    DateOfRequest: "04/08/2020",
                    Status: "Pending"
                },
                {
                    ReqID: "DDS/111/09",
                    DateOfRequest: "01/07/2020",
                    Status: "Approved"
                },
                {
                    ReqID: "DDS/111/08",
                    DateOfRequest: "01/06/2020",
                    Status: "Approved"
                },
                {
                    ReqID: "DDS/111/07",
                    DateOfRequest: "17/05/2020",
                    Status: "Approved"
                },
                {
                    ReqID: "DDS/111/99",
                    DateOfRequest: "14/05/2020",
                    Status: "Rejected"
                },
            ],
            hisData: [
                {
                    Description: "Clip Double 2",
                    Quantity: 10,
                    Unit: "Dozen",
                    Status: "Pending"
                },
                {
                    Description: "Clip Double 2",
                    Quantity: 10,
                    Unit: "Dozen",
                    Status: "Pending"
                },
                {
                    Description: "Clip Double 2",
                    Quantity: 10,
                    Unit: "Dozen",
                    Status: "Pending"
                },
                {
                    Description: "Clip Double 2",
                    Quantity: 10,
                    Unit: "Dozen",
                    Status: "Pending"
                },
                {
                    Description: "Clip Double 2",
                    Quantity: 10,
                    Unit: "Dozen",
                    Status: "Pending"
                },
            ],
        }
    }

    //Run once before render - lifecycle
    componentDidMount() {
        //HTTP get request
        axios.get('api here')
            .then(response => {
                const items = response.reqData;
                this.setState({ reqData: items });
            })
    }

    retrieveRequestDetails

    render() {
        return (
            <div>
                <Header />
                <div className="requisitionFormBody">
                    <h1>Stationery Requisition History</h1>
                    <p>Click the ID to view the details</p>
                    <RequisitionHistoryTable reqData={this.state.reqData}/>
                    <RequisitionHistoryDetails hisData={this.state.reqData}/>
                    <button className="checkInventoryButton" onClick={this.checkInventoryAction} >Check Inventory</button>
                </div>
            </div>
        )
    }

}

export default RequisitionHistory;