import React, { Component } from "react";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import './InventoryTable.css';
import {domain} from '../Configurations/Config';


class InventoryTable extends React.Component {
    constructor(props) {
        super(props)

        this.deleteButton = this.deleteButton.bind(this)
    }
    //event Listeners
    deleteButton = () => {
        //actions to delete record
    }

    render() {
        const inventoryItem = this.props.data.map(item =>
            <tr className="tableRow" >
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td className="tableQuantity">
                    {item.quantity}
                    <div className="tableIcons">
                        <EditIcon id={item.id} onClick={this.props.editData} />
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