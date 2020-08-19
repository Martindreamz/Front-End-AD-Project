import React, { Component } from "react";
import axios from "axios";
import "../Components/InventoryTable.css";

class RequisitionHistoryDetails extends Component {
    constructor() {
        super();
        this.state = {
            //test data
            hisDetailsData: [
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
        };
    }

    //Run once before render - lifecycle
    componentDidMount() {
        //HTTP get request
        axios.get(/* api here */).then((response) => {
            const items = response.hisDetailsData;
            this.setState({ hisDetailsData: items });
        });
    }

    render() {
        const hisDetailsItem = this.state.hisDetailsData.map((item) => (
            <tr className="tableRow">
                <td>{item.Description}</td>
                <td>{item.Quantity}</td>
                <td>{item.Unit}</td>
                <td>{item.Status}</td>
            </tr>
        ));
        return (
            <table className="genericTable">
                <tr className="tableHeader">
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Unit</th>
                    <th>Status</th>
                </tr>
                {hisDetailsItem}
            </table>
        );
    }
}

export default RequisitionHistoryDetails;
