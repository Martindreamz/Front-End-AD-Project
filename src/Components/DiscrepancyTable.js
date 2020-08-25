import React, { Component } from "react";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import './InventoryTable.css';
import { domain } from '../Configurations/Config';


class DiscrepancyTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        const discrepancyItem = this.props.data.map(item =>
            <tr className="tableRow" >
                <td>{item.stationeryId}</td>
                <td>{item.desc}</td>
                <td className="tableQuantity">
                    {item.discpQty}
                </td>
                <td>
                    <input id={item.stationeryId} type="text" onChange={this.props.handleReasonsInput} />
                </td>
            </tr>
        )

        return (
            <table className="inventoryTable">
                <tr className="tableHeader">
                    <th>Item Code</th>
                    <th>Description</th>
                    <th>Discrepancy Quantity</th>
                    <th>Reasons</th>
                </tr>
                {discrepancyItem}
            </table>
        )
    }
}

export default DiscrepancyTable;