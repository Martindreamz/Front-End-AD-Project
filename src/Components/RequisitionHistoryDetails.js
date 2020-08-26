import React, { Component } from "react";
import axios from "axios";
import "../Components/InventoryTable.css";
import { Label } from "reactstrap";

class RequisitionHistoryDetails extends Component {
    constructor() {
        super();
        this.state = {
            //test data
            hisDetailsData: [],
            aut: '',
        };

    }


    //Run once before render - lifecycle
    componentDidMount() {
        //HTTP get request
        axios.get('api here').then((response) => {
            const items = response.hisDetailsData;
            this.setState({ hisDetailsData: items });
        });
    }



    render() {
        const hisDetailsItem = this.props.details.map((item) => (
            <tr className="tableRow">
                <td>{item.description}</td>
                <td>{item.quantity}</td>
                <td>{item.unit}</td>
                <td>{item.status}</td>
            </tr>
        ));
        return (
            <div>
                <div>

                    <div>Approved By: {this.props.detailInfo.authorizer} </div>
                </div>
                <div>
                    <div>Date: {this.props.detailInfo.authorizedDate} </div>

                </div>
                <table className="genericTable">
                    <tr className="tableHeader">
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Unit</th>
                        <th>Status</th>
                    </tr>
                    {hisDetailsItem}
                </table>
            </div>
        );
    }
}

export default RequisitionHistoryDetails;
