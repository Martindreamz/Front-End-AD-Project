import React, { Component } from "react"
import Header from '../Components/Headers/Header';
import PlaceOrderTable from "../Components/PlaceOrderTable"
import './RecievedGoods.css';
import './general.css';
import { domain } from '../Configurations/Config';
import axios from 'axios';

class PlaceOrder extends Component {
    constructor() {
        super()
        this.state = {
            subTotal:0,
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
                ,

                {
                    itemCode: "P049",
                    desc: "Pad Postit 2 x 4",
                    reOrderQty: 100,
                    price: 5.6,
                    unit: "dozen",
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
        axios.get('https://localhost:5001/api/placeOrder')
            .then(response => {
                const items = response.data;
                this.setState({ data: items });
                
            })
        var total = this.state.data.map(item => item.price * item.reOrderQty).reduce((total, price) => total + price)
        this.setState({ subTotal: total })

    }

    checkInventoryAction = () => {
        //redirect to check inventory url
        window.location.href = domain
    }

    render() {
        var CurrencyFormat = require('react-currency-format')
        return (
            <div>
                <Header />
                <div className="tableBody">
                    <PlaceOrderTable data={this.state.data} />
                   
                    <br />
                    <div className="tablebottom">
                        <h3>Sub total:
                        <CurrencyFormat value={this.state.subTotal} decimalScale={2} fixedDecimalScale={true} displayType={'text'} prefix={'$'} />
                        </h3>
                        <br/>
                        <button className="button">Edit</button>
                        <button className="button">Submit</button>
                    </div>
                </div>
            </div>
        )
    }

}

export default PlaceOrder
