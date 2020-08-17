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
    //event Listeners
    deleteButton = () => {
        //actions to delete record
    }

    render() {
        const discrepancyItem = this.props.data.map(item =>
            <tr className="tableRow" >
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td className="tableQuantity">
                    {item.quantity}
                </td>
                <td>${item.cost}</td>
                <td>${item.cost * item.quantity}</td>
                <td>
                    <input id={item.id} type="text" onChange={this.props.handleReasonsInput} />
                </td>
            </tr>
        )

        return (
            <table className="inventoryTable">
                <tr className="tableHeader">
                    <th>Item Code</th>
                    <th>Description</th>
                    <th>Total Quantity</th>
                    <th>Cost</th>
                    <th>Subtotal</th>
                    <th>Reasons</th>
                </tr>
                {discrepancyItem}
            </table>
        )
    }
}

export default DiscrepancyTable;