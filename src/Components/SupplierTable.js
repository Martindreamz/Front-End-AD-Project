import React, { Component } from "react";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import './InventoryTable.css';
import {domain} from '../Configurations/Config';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


class SupplierTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = { data: []  , initial:true,}
        this.deleteSupplier = this.deleteSupplier.bind(this)
    }
    
    deleteSupplier(id) {  
     
    axios.delete('https://localhost:5001/api/Store/deleteSupplier/' + id).then(result=>{  
       this.setState({  
          data: this.state.data.filter(s=>s.id !== id), 
          initial: false,
        });

      });
        
    } 

    render() {
        if(this.state.initial==true){
            this.state.data = this.props.data;
        }
        const supplierItem = this.state.data.map(item =>
            <tr className="tableRow" key={item.id}>
                <td>{item.supplierCode}</td>
                <td>{item.name}</td>
                <td>{item.contactPerson}</td>
                <td>{item.priority}</td>
                <td>
                    <div className="tableIcons">
                        <EditIcon id={item.id}/>
                        <DeleteIcon id={item.id} onClick={() => this.deleteSupplier(item.id)}/>
                    </div>
                </td>
            </tr>        
        )

        return (
            <table className="supplierTable">
                <tr className="tableHeader">
                    <th>Supplier Code</th>
                    <th>Name</th>
                    <th>Contact Person</th>
                    <th>Priority</th>
                    <th></th>
                    <th></th>
                </tr>
                {supplierItem}
            </table>
        )
    }
}

export default SupplierTable;