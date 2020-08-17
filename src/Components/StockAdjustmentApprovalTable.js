import React, { Component } from "react";
import "./InventoryTable.css";
import { domain } from "../Configurations/Config";

class StockAdjustmentApprovalTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const approvalItem = this.props.data.map((item) => (
      <tr className="tableRow">
        <td>{item.id}</td>
        <td>{item.requestor}</td>
        <td>{item.amount}</td>
        <td>
          <button className="greenButton">Approve</button>
          <button className="redButton">Reject</button>
        </td>
      </tr>
    ));

    return (
      <table className="genericTable">
        <tr className="tableHeader">
          <th>Voucher No</th>
          <th>Requestor</th>
          <th>Amount</th>
          <th>Approve / Reject</th>
        </tr>
        {approvalItem}
      </table>
    );
  }
}

export default StockAdjustmentApprovalTable;
