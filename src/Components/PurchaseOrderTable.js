// JavaScript source code
import "./InventoryTable.css"
import React, { Component } from "react";
import Moment from 'moment';

class PurchaseOrderTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:this.props.data
        }
    }

    render() {
        //Moment.locale('en');
        var CurrencyFormat = require("react-currency-format");
        const orderItem =
            this.props.data != null &&
            this.props.data.map((item, index) => (
                <tr className="tableRow" key={item.poNum}>
                    <td>{item.poNum}</td>
                    <td>{item.Sname}</td>
                    <td>{Moment(item.date).format('YYYY-MM-DD HH:mm')}</td>
                    <td>
                        <CurrencyFormat
                            value={item.subtotal}
                            decimalScale={2}
                            thousandSeparator={true}
                            fixedDecimalScale={true}
                            displayType={"text"}
                            prefix={"$"}
                        />
                    </td>
                    <td>
                        <button name="view" onClick={event => this.props.handleChange(event,index)}>View details</button>
                    </td>
                    <td>{item.status == "ordered" ?
                        <button value={item.id} name="delivered" onClick={event => this.props.handleChange(event, index)}>Recieved</button>
                        :
                        item.status
                        }
                    </td>
                </tr>
            ));

        return (
            this.props.data != null &&
            <table className="placeOrderTable">
                <tr className="tableHeader">
                    <th>PO number</th>
                    <th>Supplier</th>
                    <th>Order Date</th>
                    <th>Subtotal</th>
                    <th>Status</th>
                   
                </tr>
                <tbody className="tbody">{orderItem}</tbody>
            </table>
        );
    }
}

export default PurchaseOrderTable;
