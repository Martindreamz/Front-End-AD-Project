import React, { Component } from "react";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import 'bootstrap/dist/css/bootstrap.min.css';
import {domain} from '../Configurations/Config';
import axios from 'axios';



class SupplierTable extends React.Component {
    constructor(props) {
        super(props)
    }
    
    
    render() {
        const disbursementItem = this.props.data.map(item =>
            <tr className="tableRow" key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
            </tr>        
        )

        return (
            <table className="supplierTable text-center">
                <tr className="tableHeader">
                    <th>SN</th>
                    <th>Stationary Description</th>
                    <th>Quantity</th>
                </tr>
                {disbursementItem}
            </table>
        )
    }
}

export default SupplierTable;