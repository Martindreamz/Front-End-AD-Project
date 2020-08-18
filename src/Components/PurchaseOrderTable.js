import React, { Component } from "react";
import "./InventoryTable.css";
import CurrencyFormat from "react-currency-format";

class PurchaseOrderTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var CurrencyFormat = require("react-currency-format");
    const orderItem = this.props.data.map((item) => (
      <tr className="tableRow">
        <td>{item.itemCode}</td>
        <td>{item.desc}</td>
        <td>{item.reOrderQty}</td>
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
            value={item.price * item.reOrderQty}
            decimalScale={2}
            fixedDecimalScale={true}
            displayType={"text"}
            prefix={"$"}
          />
        </td>
        <td>{item.supplier}</td>
      </tr>
    ));

    return (
      <table className="purchaseOrderTable">
        <thead className="tableHeader">
          <th>Item Code</th>
          <th>Description</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Amount</th>
          <th>Supplier</th>
        </thead>
        <tbody>{orderItem}</tbody>
      </table>
    );
  }
}
export default PurchaseOrderTable;
