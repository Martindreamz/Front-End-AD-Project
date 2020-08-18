import React, { Component } from "react";
import Header from '../Components/Headers/Header';
import SupplierTable from '../Components/SupplierTable';
import './RecievedGoods.css';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { domain } from '../Configurations/Config';
import axios from 'axios';
import InventoryPopup from "../Components/InventoryPopup";
import SupplierForm from '../Components/SupplierForm';
import 'bootstrap/dist/css/bootstrap.min.css';

class RecievedGoods extends React.Component {
    constructor() {
        super()
        this.state = {
            //test data
            data: [],
            showSupplierForm : false, 
        }
        this.addSupplierFun = this.addSupplierFun.bind(this)
    }

    addSupplierFun(previousState) {
        this.setState(
            {showSupplierForm: !previousState,}
        )
        this.componentDidMount();
    }

    //Run once before render - lifecycle
    componentDidMount() {
        //HTTP get request
        axios.get('https://localhost:5001/api/Store/Suppliers')
            .then(response => {
                const items = response.data;
                this.setState({ data: items });
            })
    }

    checkSupplierAction = () => {
        //redirect to check inventory url
        window.location.href = domain
    }

    render() {
        return (
        <div>
            <Header />
            <div className="container">
                <div className="row" >
                    <div className="col-sm-12 text-right mt-1">
                        <button className="btn btn-warning mt-1" onClick={() => this.addSupplierFun(this.state.showSupplierForm)}>
                              {!this.state.showSupplierForm
                                ? "Add Supplier"
                                : "Go to Suppplier List"}
                        </button>
                    </div>
                </div>

                <div className="row" >
                    {!this.state.showSupplierForm ?
                        <div className="col-sm-12  ">
                            <SupplierTable data={this.state.data}/>
                        </div> 
                        : null
                    }
                    {this.state.showSupplierForm ?
                        <SupplierForm />
                        : null
                    }
                </div>
            </div>
        </div>
        )
    }
}

export default RecievedGoods;