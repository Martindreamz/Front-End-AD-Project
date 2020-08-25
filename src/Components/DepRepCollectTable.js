import React, { Component } from "react";
import Moment from "react-moment"; //need npm install --save moment react-moment
import "../Components/InventoryTable.css";

class DepRepCollectTable extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const collectItem = this.props.disbursementDetail.map((item) => (
      <tr className="tableRow">
        <td>{item.stationeryDesc}</td>
        <td>{item.qty}</td>
      </tr>
    ));

    return (
      <div className="overallContainer">
        <div className="tableColumn">
          <h2>Collection Item List</h2>
          <table className="componentTable">
            <tr className="tableHeader">
              <th>Stationery Description</th>
              <th>Quantity</th>
            </tr>
            {collectItem}
          </table>
        </div>

        <div className="cardColumn">
          <div className="card">
            <h2>
              Collection Point:{" "}
              {this.props.disbursement.deliveryPoint
                ? this.props.disbursement.deliveryPoint
                : "No Collection Point assigned!"}
            </h2>
            <p>
              Date:{" "}
              <Moment format="D MMM YYYY">
                {this.props.disbursement.date}
              </Moment>
            </p>
            <p>
              Time:{" "}
              <Moment format="HH:mm A">{this.props.disbursement.time}</Moment>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default DepRepCollectTable;
