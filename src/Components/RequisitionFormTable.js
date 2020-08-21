import React, { Component } from "react";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { domain } from '../Configurations/Config';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


class RequisitionFormTableNew extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            requestData: [{
                id: "",
                category: "",
                description: "",
                quantity: "",
                unit: ""
            }
            ],
            //data: [],
            initial: true, editSupObj: []
        }
       
    }

    render() {
        if (this.state.initial == true) {
            this.state.data = this.props.data;
        }
        const reqItem = this.state.requestData.map(item =>
            <tr className="tableRow" key={item.id}>
                <td>{item.category}</td>
                <td>{item.description}</td>
                <td>{item.quantity}</td>
                <td>{item.unit}</td>
                <td>
                    <div className="tableIcons">
                        <EditIcon id={item.id} onClick={() => this.props.editRequestForm(item)} />

                    </div>
                </td>
            </tr>
        )

        return (
            <table className="requisitionTable">
                <tr className="tableHeader">
                    <th>Category</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Unit</th>
                    <th></th>
                </tr>
                {reqItem}
            </table>
        )
    }
}

export default RequisitionFormTableNew;