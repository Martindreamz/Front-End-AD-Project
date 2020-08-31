import React, { Component } from "react";
import axios from "axios";
import "../Components/InventoryTable.css";
import { Label } from "reactstrap";
import Moment from 'moment';

class RequisitionHistoryDetails extends Component {
    constructor() {
        super();
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
                {(this.props.detailInfo.status!="Applied")?
                    <div>
                        <div>Authorized By: {this.props.detailInfo.authorizer} </div>
                        <div>Authorized Date: {Moment(this.props.detailInfo.authorizedDate).format('DD-MM-YYYY')} </div>

                    </div>
                :null}
                
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
