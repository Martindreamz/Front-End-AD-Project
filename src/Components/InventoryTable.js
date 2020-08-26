import React, { Component } from "react";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import './InventoryTable.css';
import { domain } from '../Configurations/Config';
import Axios from "axios";


class InventoryTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            //state to reuse table for managed recieve goods and inventory check screens
            isCheckInvTable: props.type,
            isReceivedGoods: props.isReceivedGoods
        }
    }
    //event Listeners
    deleteButton = (event) => {
        //actions to delete record
        const selectedId = event.currentTarget.id
        Axios.delete('https://localhost:5001/api/store/stationery/delete/' + selectedId);
    }

    render() {
        const inventoryItem = this.props.data.map(item =>
            <tr className="tableRow" >
                <td>{item.Id}</td>
                {this.state.isCheckInvTable ? null : <td>{item.category}</td>}
                <td>{item.desc}</td>
                <td>{item.unit}</td>
                <td className="tableQuantity">
                    {item.inventoryQty}
                    {this.state.isCheckInvTable ? null :
                        <div className="tableIcons">
                            <EditIcon id={item.Id} onClick={this.props.editData} />
                            <DeleteIcon id={item.Id} onClick={this.deleteButton} />
                        </div>
                    }
                </td>
                {this.state.isCheckInvTable ?
                    <td>
                        {this.state.isReceivedGoods ? "+" : null}
                        <input id={item.Id} type="number" min="0" max="9999" onChange={this.props.handleQtyInput} />
                    </td>
                    : null
                }
            </tr>
        )

        return (
            <table className="inventoryTable">
                <tr className="tableHeader">
                    <th>Item Code</th>
                    {this.state.isCheckInvTable ? null : <th>Category</th>}
                    <th>Description</th>
                    <th>Unit</th>
                    <th>Total Quantity</th>
                    {this.state.isCheckInvTable ? <th>Inventory Quantity</th> : null}
                </tr>
                {inventoryItem}
            </table>
        )
    }
}

export default InventoryTable;