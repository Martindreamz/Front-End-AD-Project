import React, { Component } from "react";
import "./InventoryTable.css";
import { domain } from "../Configurations/Config";

class StoreMStockAdjustmentApprovalTable extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const approvalItem = this.props.data.map((item) => (
      <tr className="tableRow">
        <td>{item.id}</td>
        <td>{item.requestor}</td>
        <td>{item.amount}</td>
        <td>
          <button className="redButton">Reject</button>
          <button className="greenButton">Approve</button>
        </td>
      </tr>
    ));

    return (
      <table className="genericTable">
        <tr className="tableHeader">
          <th>Voucher No</th>
          <th>Requestor</th>
          <th>Amount</th>
          <th>Reject / Approve</th>
        </tr>
        {approvalItem}
      </table>
    );
  }
}

export default StoreMStockAdjustmentApprovalTable;
