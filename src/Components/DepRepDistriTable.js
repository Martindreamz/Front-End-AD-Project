import React, { Component } from "react";
import axios from "axios";

class DepRepDistriTable extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const distriItem = this.props.disbursementDetail.map((item) => (
      <tr className="tableRow">
        <td>{item.stationeryDesc}</td>
        <td>{item.requestor}</td>
        <td>{item.qty}</td>
      </tr>
    ));
    return (
      <table className="depRepDistriTable">
        <tr className="tableHeader">
          <th>Stationery Description</th>
          <th>Requestor</th>
          <th>Received Quantity</th>
        </tr>
        {distriItem}
      </table>
    );
  }
}

export default DepRepDistriTable;
