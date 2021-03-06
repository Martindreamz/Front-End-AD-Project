// JavaScript source code

import React, { Component } from "react"
import "./PurchaseOrder.css"
import PurchaseOrderDetailTable from "../Components/PurchaseOrderDetailTable"
import Moment from 'moment';


class PurchaseOrder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.data,
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
        const po = this.props.data
        var CurrencyFormat = require("react-currency-format");
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
                               <div className="innerbox">
                            <h5>Vendor:</h5>
                            {this.props.data.supplier.name} <br />
                           {this.props.data.supplier.contactPerson}<br />
                            {this.props.data.supplier.phoneNum}<br />
                               </div>}
                       <div className="innerbox">
                       
                           <h5>Attention to:</h5>
                            Logic University Stationery Store<br />
                          {this.props.data.clerk.name}<br />
                           {this.props.data.clerk.phoneNum}
                          
                            
                           </div>
                        </div>
                       <div className="tableBody">
                           {this.props.data.pod!=null &&

                               <PurchaseOrderDetailTable data={this.props.data.pod} />
                       }
                       Subtotal: 
                       <CurrencyFormat
                           value={this.props.data.subtotal}
                           decimalScale={2}
                           thousandSeparator={true}
                           fixedDecimalScale={true}
                           displayType={"text"}
                           prefix={"$"}
                       />
                        </div>
                    </div>

                </div >

               

        )
    }

}

export default PurchaseOrder

