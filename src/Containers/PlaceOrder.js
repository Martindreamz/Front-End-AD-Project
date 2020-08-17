import React, { Component } from "react"
import Header from '../Components/Headers/Header';
import PlaceOrderTable from "../Components/PlaceOrderTable"
import './RecievedGoods.css';
import { domain } from '../Configurations/Config';
import axios from 'axios';

class PlaceOrder extends Component {
    constructor() {
        super()
        this.state = {
            //test data
            data: [
                {
                    itemCode: "C0101",
                    desc: "Clips Double 2",
                    reOrderQty: 10,
                    price: 0.8,
                    unit: "box of 10",
                    supplier:"Main Supplier"

                },

                {
                    itemCode: "S002",
                    desc: "Short hand book",
                    reOrderQty: 45,
                    price: 1.0,
                    unit: "each",
                    supplier: "Main Supplier"

                }

            ],

            supplier: [
                {
                    supplierId: 1,
                    name: "Main Supplier"
                },
                {
                    supplierID: 2,
                    name: "Sub Supplier 1"
                },
                {
                    supplierID: 3,
                    name: "Sub Supplier 3"
                }
            ]


        }
    }

    //Run once before render - lifecycle
    componentDidMount() {
        //HTTP get request
        axios.get('https://localhost:5001/api/invt')
            .then(response => {
                const items = response.data;
                this.setState({ data: items });
            })
    }

    checkInventoryAction = () => {
        //redirect to check inventory url
        window.location.href = domain
    }

    render() {
        return (
            <div>
                <Header />
                <div className="recievedGoodsBody">
                    <PlaceOrderTable data={this.state.data} />
                </div>
            </div>
        )
    }

}

export default PlaceOrder
