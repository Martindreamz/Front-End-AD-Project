// JavaScript source code

import React, { Component } from "react"
import "./PurchaseOrder.css"
import { domain } from '../Configurations/Config';
import axios from 'axios';
import PurchaseOrderTable from "../Components/PurchaseOrderTable"
import PlaceOrderTable from "./PlaceOrderTable";

class PurchaseOrder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.data,
            supplier: this.props.supplier,
            clerk: this.props.clerk,
            pod: this.props.pod
        };
    }

    //Run once before render - lifecycle
    componentDidMount() {
        this.setState({ data: this.props.data })
    }


    render() {

        console.log('this is from child', this.props.data)
        const po = this.props.data
        const supplier = this.props.data.supplier
       return(

            po != null &&
                < div className="page" >
                    <div className="subpage">
                        <div className="pageHeader">
                            PO Number:{po.poNum} <br />
                        Date of Order: {this.props.data.date}

                        </div>
                        <div className="pageTitle">
                            LOGIC UNIVERSITY<br />
                        Stationery Purchase Order
                        </div>
                       <div className="box">
                           {this.props.data.supplier == null ? null :
                               <div>
                                   Supplier<br />
                            Name:  {this.props.data.supplier.name} <br />
                            Attn to:  {this.props.data.supplier.contactPerson}<br />
                            contact: {supplier.phoneNum}<br />
                               </div>}
                            <div>Clerk </div>
                        </div>
                       <div className="tableBody">
                           {this.props.data.pod!=null &&

                               <PurchaseOrderTable data={this.props.data.pod} />
                           }
                        </div>
                    </div>

                </div >

               

        )
    }

}

export default PurchaseOrder

