import React, { Component } from "react";
import axios from "axios";

class DepRepDistriTable extends Component {
  constructor() {
    super();
    this.state = {
      selectedRequestor: null,
    };

    this.handleRequestorInput = this.handleRequestorInput.bind(this);
  }

  handleRequestorInput(event) {
    this.setState({ selectedRequestor: event.target.value });
  }

  render() {
    const newDisbursementDetailList = [];
    this.props.disbursementDetail.forEach((disbursement) => {
      if (
        disbursement.status === "delivered" ||
        disbursement.status === "completed"
      ) {
        newDisbursementDetailList.push(disbursement);
      }
    });

    const finalDisbursementDetailList = [];
    newDisbursementDetailList.forEach((disbursement) => {
      if (disbursement.requestor === this.state.selectedRequestor) {
        finalDisbursementDetailList.push(disbursement);
      }
    });

    const distriItem = finalDisbursementDetailList.map((item) => (
      <tr className="tableRow">
        <td>{item.stationeryDesc}</td>
        <td>{item.qty}</td>
      </tr>
    ));

    const selectStyle = {
      marginLeft: "0%",
      marginTop: "0.5%",
      marginBottom: "1%",
      width: "30%",
    };

    if (this.state.selectedRequestor != null) {
      return (
        <table className="depRepDistriTable">
          <span>Select Requestor Name here: </span>
          <select
            className="select-css"
            style={selectStyle}
            value={this.state.selectedRequestor}
            onChange={this.handleRequestorInput}
          >
            {this.props.requestorList.map((x) => {
              return <option value={x}>{x}</option>;
            })}
          </select>
          <tr className="tableHeader">
            <th>Stationery Description</th>
            <th>Received Quantity</th>
          </tr>
          {distriItem}
        </table>
      );
    } else {
      return (
        <table className="depRepDistriTable">
          <span>Select Requestor Name here: </span>
          <select
            className="select-css"
            style={selectStyle}
            value={this.state.selectedRequestor}
            onChange={this.handleRequestorInput}
          >
            {this.props.requestorList.map((x) => {
              return <option value={x}>{x}</option>;
            })}
          </select>
          <tr className="tableHeader">
            <th>Stationery Description</th>
            <th>Received Quantity</th>
          </tr>
          <tr className="tableRow">
            Please select the requestor name to display data.
          </tr>
        </table>
      );
    }
  }
}

export default DepRepDistriTable;
