import React, { Component } from "react";
import "./InventoryTable.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { domain } from "../Configurations/Config";

class StoreMStockAdjustmentApprovalTable extends Component {
    constructor(props) {
        super(props);
        this.state = {};
  }

  render() {
      const approvalItem = this.props.data.map((item) => (
          <tr className="tableRow" id={item.stockAdustmentId}>
            <td onClick={()=>this.props.showDetail(item)}>{item.stockAdustmentId}</td>
            <td onClick={()=>this.props.showDetail(item)}>{item.empName}</td>
            <td onClick={()=>this.props.showDetail(item)}>{(item.amount).toFixed(2)}</td>
            <td>
              <button className="redButton mr-1" onClick={()=>this.props.rejectRequest(item)}>Reject</button>
              <button className="greenButton ml-1" onClick={()=>this.props.showPopup(item)}>Approve</button>
            </td>
          </tr>
    ));

    return (
      <table className="genericTable">
        <tr className="tableHeader">
          <th>StockAdjustment No</th>
          <th>Requestor</th>
          <th>Amount</th>
          <th>Action</th>
        </tr>
        <tbody className="sumTable">
          {approvalItem}
        </tbody>
      </table>
    );
  }
}

export default StoreMStockAdjustmentApprovalTable;
