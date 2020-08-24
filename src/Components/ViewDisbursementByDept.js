import React, { Component } from "react";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {domain} from '../Configurations/Config';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


class ViewDisbursementByDept extends React.Component {
    constructor(props) {
        super(props)
        this.state = { data: []  , initial:true, editSupObj: []}
    }
    render() {
        if(this.state.initial==true){
            this.state.data = this.props.data;
        }
        
        const byEachDepartmentRecord = this.state.data.map(item =>
            <tr className="tableRow" key={item.id}>
                <td>{item.date}</td>
                <td>{item.departmentName}</td>
                <td>{item.representativeName}</td>
                <td>{item.itemCount}</td>
                <td>{item.status}</td>
                <td>
                   <button className="btn btn-outline-primary" id={item.id} onClick={()=>this.props.detailDisbursement(item)}>
                            Disbursement Detail
                   </button>
                </td>
            </tr>        
        )

        return (
            <table className="supplierTable text-center">
                <tr className="tableHeader">
                    <th>Date</th>
                    <th>Department</th>
                    <th>Department Representative</th>
                    <th>Item Count</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
                {byEachDepartmentRecord}
            </table>
        )
    }
}

export default ViewDisbursementByDept;