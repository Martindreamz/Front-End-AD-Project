import React, { Component } from "react";
import './InventoryTable.css';

class RequisitionHistoryDetails extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        //mapping data 
        const hisData = this.props.hisData.map(item =>
            <tr className="tableRow">
                <td>{item.description}</td>
                <td>{item.quantity}</td>
                <td>{item.unit}</td>
                <td>{item.Status}</td>
            </tr>
        )

        return (
            <table className="requisitionTable">
                <tr className="tableHeader">
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Unit</th>
                    <th>Status</th>
                </tr>
                {hisData}
            </table>
        )
    }
}

export default RequisitionHistoryDetails;