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
        <td className="tableQuantity">{item.amount}</td>
        <td>
          <button className="approveButton">Approve</button>
          <button className="rejectButton">Reject</button>
        </td>
      </tr>
    ));

    return (
      <table className="inventoryTable">
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
