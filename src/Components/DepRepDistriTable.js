import React, { Component } from "react";
import axios from "axios";

class DepRepDistriTable extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const distriItem = this.props.requisitionDetail.map((item) => (
      <tr className="tableRow">
        <td>{item.desc}</td>
        <td>{item.employee}</td>
        <td>{item.reqQty}</td>
      </tr>
    ));
    return (
      <table className="genericTable">
        <tr className="tableHeader">
          <th>Stationery Description</th>
          <th>Requestor</th>
          <th>Quantity</th>
        </tr>
        {distriItem}
      </table>
    );
  }
}

export default DepRepDistriTable;
