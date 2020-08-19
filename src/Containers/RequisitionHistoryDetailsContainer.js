import React from 'react';
import RequisitionHistoryDetails from '../Components/RequisitionHistoryDetails';
import Header from '../Components/Headers/Header';
import axios from 'axios';

class RequisitionHistoryDetailsContainer extends React.Component{
    constructor(){
        super()
        this.state = {
            //test data
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
                const items = response.hisData;
                this.setState({ hisData: items });
            })
    }

    render() {
        return (
            <div>
                <Header />
                <div className="requisitionFormBody">
                    <h1>Stationery Requisition History</h1>
                    <p>Click the ID to view the details</p>
                    <RequisitionHistoryTable hisData={this.state.hisData}/>
                    {/* <RequisitionHistoryDetails hisData={this.state.hisData}/> */}
                    <button className="checkInventoryButton" onClick={this.checkInventoryAction} >Check Inventory</button>
                </div>
            </div>
        )
    }

}

export default RequisitionHistoryDetailsContainer;