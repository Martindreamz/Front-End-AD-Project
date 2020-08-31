import React, { Component } from "react";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {domain, api} from '../Configurations/Config';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


class SupplierTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = { data: []  , initial:true, editSupObj: []}
        this.deleteSupplier = this.deleteSupplier.bind(this)
    }
    
    deleteSupplier(supplier) {  
      fetch(api + 'api/Store/deleteSupplier', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(supplier)
            }).then(res => res.json()).then(result => {
                this.setState({  
                  data: this.state.data.filter(s=>s.id !== supplier.id), 
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
                        <EditIcon id={item.id} onClick={()=>this.props.editSupplier(item)}/>
                        <DeleteIcon id={item.id} onClick={() => this.deleteSupplier(item)}/>
                    </div>
                </td>
            </tr>        
        )

        return (
            <table className="supplierTable text-center">
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