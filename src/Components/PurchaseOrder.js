// JavaScript source code

import React, { Component } from "react"
import "./PurchaseOrder.css"
import { domain } from '../Configurations/Config';
import axios from 'axios';
import PurchaseOrderTable from "../Components/PurchaseOrderTable"


class PurchaseOrder extends Component {
    constructor() {
        super()
        this.state = {
            purchaseOrderDetail: [
                {
                    itemCode: "C0101",
                    desc: "Clips Double 2",
                    reOrderQty: 10,
                    price: 0.8,
                    unit: "box of 10",
                    supplier: "Main Supplier"

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

            purchaseOrder:
            {
                OrdID: 200068,
                ClerkID: "001",
                SupplierID: 1,
                DateOfOrder: "12 / 07 / 2020"
            }

            ,

            supplier:
            {
                supplierId: 1,
                name: "Main Supplier"
            }

        }
    }

    //Run once before render - lifecycle
    componentDidMount() {
        //HTTP get request
        axios.get(/*replace with api url*/)
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
        var CurrencyFormat = require('react-currency-format')
        //const
        return (
            <div className="page">
                <div className="subpage">
                        
                    <div className="pageHeader">
                            PO Number:{this.state.purchaseOrder.OrdID}
                    </div>
                   
                    
                  
                        <div className="pageTitle">
                                    LOGIC UNIVERSITY<br />
                                    Stationery Purchase Order
                            </div>
                        
                    <div>
                                Supplier: {this.state.supplier.name} <br/>
                                Deliver to: Logic University Store  <br />
                                Attn: Daryl<br />
                         
                           Clerk
                </div>
                      
                           
                <div className="tableBody">
                                    <PurchaseOrderTable data={this.state.purchaseOrderDetail} />
                                </div>
               

                </div>

            </div>
      


        )

    }

}

export default PurchaseOrder

