import React, { Component } from "react";
import "./InventoryTable.css";
import CurrencyFormat from "react-currency-format";

class PurchaseOrderDetailTable extends Component {
  constructor(props) {
      super(props);
      this.state = {
          data: this.props.data
      }
  }

  render() {
      var CurrencyFormat = require("react-currency-format");
      console.log('this is from purchase table', this.state.data)
    const orderItem = this.props.data.map((item) => (
      <tr className="tableRow">
        <td>{item.id}</td>
        <td>description</td>
        <td>{item.qty}</td>
        <td>
          <CurrencyFormat
            value={item.price}
            decimalScale={2}
            fixedDecimalScale={true}
            displayType={"text"}
            prefix={"$"}
          />{" "}
          /{item.unit}
        </td>
        <td>
          <CurrencyFormat
            value={item.price * item.qty}
            decimalScale={2}
            fixedDecimalScale={true}
            displayType={"text"}
            prefix={"$"}
          />
        </td>
       
      </tr>
    ));

      return (
          this.state.data!=null &&
      <table className="purchaseOrderTable">
        <thead className="tableHeader">
          <th>Item Code</th>
          <th>Description</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Amount</th>
         
        </thead>
        <tbody>{orderItem}</tbody>
      </table>
    );
  }
}
export default PurchaseOrderDetailTable;
