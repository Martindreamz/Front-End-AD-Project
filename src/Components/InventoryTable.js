import React, { Component } from "react";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import './InventoryTable.css';
import {domain} from '../Configurations/Config';


class InventoryTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            //state to reuse table for managed recieve goods and inventory check screens
            isCheckInvTable: props.type
        }
        this.deleteButton = this.deleteButton.bind(this)
    }
    //event Listeners
    deleteButton = () => {
        //actions to delete record
    }

    render() {
        const inventoryItem = this.props.data1.map(item =>
            <tr className="tableRow" >
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td className="tableQuantity">
                    {item.quantity}
                    {this.state.isCheckInvTable ? null :
                        <div className="tableIcons">
                            <EditIcon id={item.id} onClick={this.props.editData} />
                            <DeleteIcon onClick={this.deleteButton} />
                        </div>
                    }
                </td>
                {this.state.isCheckInvTable ?
                    <td>
                        <input id={item.id} type="number" min="0" max="9999" onChange={this.props.handleQtyInput} />
                    </td>
                    : null
                }
            </tr>        
        )

        return (
            <table className="inventoryTable">
                <tr className="tableHeader">
                    <th>Item Code</th>
                    <th>Description</th>
                    <th>Total Quantity</th>
                    {this.state.isCheckInvTable ? <th>Inventory Quantity</th> : null}
                </tr>
                {inventoryItem}
            </table>
        )
    }
}

export default InventoryTable;