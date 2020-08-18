// JavaScript source code

import React, { Component } from "react"
import PurchaseOrder from "../Components/PurchaseOrder"
import Header from '../Components/Headers/Header';
import "./general.css"


class PurchaseOrderSubmit extends Component {



    render() {

        return (
            
            <div>
                <Header />
                <div className="tableBody">
                <div className="btn-group">
                    <button class="button">Main Supplier</button>
                    <button class="button">Sub supplier 1</button>
                    <button class="button">Sub supplier 2</button>
                </div>
                <div>
                    <PurchaseOrder />
                </div>
                </div>
                </div>
            )


    }

}

export default PurchaseOrderSubmit
