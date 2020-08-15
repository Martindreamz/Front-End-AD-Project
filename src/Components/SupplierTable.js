import React, { Component } from "react";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import './InventoryTable.css';
import {domain} from '../Configurations/Config';


class SupplierTable extends React.Component {
    constructor(props) {
        super(props)

        this.deleteButton = this.deleteButton.bind(this)
    }
    //event Listeners
    deleteButton = () => {
        //actions to delete record
    }

    render() {
        const supplierItem = this.props.data.map(item =>
            <tr className="tableRow" >
                <td>{item.supplierCode}</td>
                <td>{item.name}</td>
                <td>{item.contactPerson}</td>
                <td>{item.priority}</td>
                <td>
                    <div className="tableIcons">
                        <EditIcon id={item.id}/>
                        <DeleteIcon />
                    </div>
                </td>
            </tr>        
        )

        return (
            <table className="inventoryTable">
                <tr className="tableHeader">
                    <th>Supplier Code</th>
                    <th>Name</th>
                    <th>Contact Person</th>
                    <th>Priority</th>
                    <th></th>
                </tr>
                {supplierItem}
            </table>
        )
    }
}

export default SupplierTable;