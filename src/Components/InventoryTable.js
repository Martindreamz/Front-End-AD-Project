import React, { Component } from "react";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import './InventoryTable.css';
import {domain} from '../Configurations/Config';


class InventoryTable extends React.Component {
    constructor(props) {
        super(props)

        this.editButton = this.editButton.bind(this)
        this.deleteButton = this.deleteButton.bind(this)
    }
    //event Listeners
    editButton = () => {
        //redirect to edit page
        window.location.href = domain
    }
    deleteButton = () => {
        //actions to delete record
    }

    render() {
        const inventoryItem = this.props.data.map(item =>
            <tr className="tableRow">
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td className="tableQuantity">
                    {item.quantity}
                    <div className="tableIcons">
                        <EditIcon onClick={this.editButton} />
                        <DeleteIcon onClick={this.deleteButton} />
                    </div>
                </td>
            </tr>        
        )

        return (
            <table className="inventoryTable">
                <tr className="tableHeader">
                    <th>Item Code</th>
                    <th>Description</th>
                    <th>Total Quantity</th>
                </tr>
                {inventoryItem}
            </table>
        )
    }
}

export default InventoryTable;