// JavaScript source code

import React, { Component } from "react"
import "./PurchaseOrder.css"
import { domain } from '../Configurations/Config';
import axios from 'axios';
import PurchaseOrderDetailTable from "../Components/PurchaseOrderDetailTable"
import PlaceOrderTable from "./PlaceOrderTable";
import Moment from 'moment';

class PurchaseOrder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.data,
            //supplier: this.props.supplier,
            //clerk: this.props.clerk,
            pod: this.props.pod
        };
    }

    //Run once before render - lifecycle
    componentDidMount() {
        this.setState({ data: this.props.data })
        console.log('this is from po print', this.state.data)
        console.log('this is from po print props', this.props.data)
    }


    render() {

        //console.log('this is from child', this.props.data)
        const po = this.props.data
        //const supplier = this.props.data.supplier
        //const clerk = this.props.data.clerk
       return(

            po != null &&
                < div className="page" >
                    <div className="subpage">
                        <div className="pageHeader">
                            PO Number:{po.poNum} <br />
                        Date of Order: {Moment(this.props.data.date).format('DD MMMM yyyy')}

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
                            Person to contact:  {this.props.data.supplier.contactPerson}<br />
                            contact: {this.props.data.phoneNum}<br />
                               </div>}
                       <div>
                           Attn to: {this.props.data.clerk.name}<br />
                           Deliver to: Logic University Stationery Store
                           contact: {this.props.data.clerk.phoneNum}
                          
                            
                           </div>
                        </div>
                       <div className="tableBody">
                           {this.props.data.pod!=null &&

                               <PurchaseOrderDetailTable data={this.props.data.pod} />
                       }
                       {this.props.data.subtotal}
                        </div>
                    </div>

                </div >

               

        )
    }

}

export default PurchaseOrder

