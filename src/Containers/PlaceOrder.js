import React, { Component } from "react"
import Header from '../Components/Headers/Header';
import PlaceOrderTable from "../Components/PlaceOrderTable"
import './RecievedGoods.css';
import './general.css';
import { domain } from '../Configurations/Config';
import axios from 'axios';
import { Link } from 'react-router-dom';

import PurchaseOrder from "../Components/PurchaseOrder";

class PlaceOrder extends Component {
    constructor() {
        super()
        this.state = {
            today: "",
            subTotal: 0,
            data: [],
            selected: [],
            clerk: {},
            purchaseOrders: [],
            isEditing:false  
        }
        this.handleChange = this.handleChange.bind(this);


    }

    //Run once before render - lifecycle
    componentDidMount() {
        var date = new Date().toLocaleString()

        //HTTP get request
        axios.get('https://localhost:5001/api/Store/placeOrder')
            .then(response => {
                const items = response.data;
                this.setState({ data: items });

            })
        //HTTP get clerk Id
        axios.get('https://localhost:5001/api/Store/clerk')
            .then(response => {
                const currentClerk = response.data;
                this.setState({ clerk: currentClerk  });

            })
        //var total = this.state.data.map(item => item.suppliers==null?1:item.suppliers[0].supplierItems[0].price * item.stationery.reOrderQty).reduce((total, price) => total + price)
        this.setState({
            //subTotal: total,
            today: date
        })

    }


    addItem(value) {
        console.log("add item")
        console.log(value)
        this.setState({
            //selected: [...this.state.selected, { value }]
            selected: value
        })
        this.updateSubtotal()
    }

    updateSubtotal() {
        //console.log("updateSubtotal")
        const dict = this.state.selected;
        const newSubtotal = 0;
        for (var key in dict) {
            //console.log(dict[key])
            if (dict[key] === true) {
                var price = this.state.data.map(item => item.id === dict[key] ?
                    item.suppliers == null ? 0 : item.suppliers[0].supplierItems.map(x => x.id === item.stationery.id ? x.price : null) * 1 : null)
                if (!price === null) {
                    newSubtotal+=price
                }
            }

        }

        this.setState({ subTotal: newSubtotal })

    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    onSubmit() {
        const dict = this.state.selected;
        var newSelectedItems = [];
        for (var key in dict) {
            //console.log(dict[key])
            if (dict[key] === true) {
                var item = this.state.data.map(item => item.id === dict[key] ? item : null)
                if (!item === null) {
                    //populate all items into an array
                    newSelectedItems.push(item)
                }
            }
        }
        //get all unique supplier ids
        var suppliers = new Set(newSelectedItems.map(item => item.suppliers[0]))
        

        //group all selectedItems by supplier Id and create PO
        for (var supplier in suppliers) {
            var date = new Date()
            var msec = date.getMilliseconds()
            var POId = msec + supplier.id
            var podetails = []
            var poBySupplier = []
            var purchaseOrders=[]

            //group all selectedItems by supplier Id
            newSelectedItems.map(item => item.suppliers[0] === supplier.id ? poBySupplier.push(item) : null)

            //create PO
            for (item in poBySupplier) {
                var detail =
                {
                    id: item.id,
                    PurchaseOrderId: POId,
                    stationeryId: item.stationery.id,
                    qty: item.stationery.reOrderQty
                }
                podetails.push(detail)
            }
            var purchaseOrder = {
                id: POId,
                clerkId: this.state.clerk.id,
                SupplierId: supplier.id,
                dateOfOrder: date,
                status: "ordered",
                StockAdjustmentId:null,
                PurchaseOrderDetails:podetails
            }

            purchaseOrders.push(purchaseOrder)

        }

        //post to controller
        axios.post('https://localhost:5001/api/Store/generatePO', purchaseOrders)
            .then(response => {
                console.log(response)
                console.log(response.data)
            })

    }

    render() {
        var CurrencyFormat = require('react-currency-format')
        return (
            <div>
                <Header />
                <h1>{this.state.today}</h1>
                <div className="tableBody">
                    <PlaceOrderTable
                        data={this.state.data}
                        onSelect={value => this.addItem(value)}
                        onEdit={this.state.isEditing}
        
                    />
                    <br />
                    <div className="tablebottom">
                        <h3>Sub total:
                        <CurrencyFormat value={this.state.subTotal} decimalScale={2} fixedDecimalScale={true} displayType={'text'} prefix={'$'} />
                        </h3>
                        <br />
                        <button name="isEditing" value={true} className="button" onClick={this.handleChange}>Edit</button>
                        <Link to="/placeOrderSubmit">
                            <button className="button" name="submit">Submit</button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

}

export default PlaceOrder
