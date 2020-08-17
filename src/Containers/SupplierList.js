import React, { Component } from "react";
import Header from '../Components/Headers/Header';
import SupplierTable from '../Components/SupplierTable';
import './RecievedGoods.css';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { domain } from '../Configurations/Config';
import axios from 'axios';
import InventoryPopup from "../Components/InventoryPopup";

class RecievedGoods extends React.Component {
    constructor() {
        super()
        this.state = {
            //test data
            data: [], 
        }
    }

    //Run once before render - lifecycle
    componentDidMount() {
        //HTTP get request
        axios.get('https://localhost:5001/api/Supplier')
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
                <div className="recievedGoodsBody">
                    <AddCircleIcon/>
                    <SupplierTable data={this.state.data}/>
                </div>
            </div>
        )
    }
}

export default RecievedGoods;