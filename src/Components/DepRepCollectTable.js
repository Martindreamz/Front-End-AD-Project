import React, { Component } from "react";
import Moment from "react-moment"; //need npm install --save moment react-moment
import "../Components/InventoryTable.css";

class DepRepCollectTable extends Component {
  constructor() {
    super();
    this.state = {
      selectedDeliveryPoint: null,
    };

    this.handleDeliveryPointInput = this.handleDeliveryPointInput.bind(this);
  }

  handleDeliveryPointInput(event) {
    this.setState({ selectedDeliveryPoint: event.target.value });
  }

  render() {
    const newDisbursementDetailList = [];
    this.props.disbursementDetail.forEach((disbursement) => {
      if (disbursement.status === "delivering") {
        newDisbursementDetailList.push(disbursement);
      }
    });

    const finalDisbursementDetailList = [];
    newDisbursementDetailList.forEach((disbursement) => {
      if (disbursement.deliveryPoint === this.state.selectedDeliveryPoint) {
        finalDisbursementDetailList.push(disbursement);
      }
    });

    let selectedCollectionTime = "0001-01-01 00:00:00.0000000";
    this.props.collectionInfo.map((collection) => {
      if (collection.collectionPoint === this.state.selectedDeliveryPoint) {
        selectedCollectionTime = collection.collectionTime;
      }
    });

    const selectStyle = {
      marginLeft: "0%",
    };

    if (this.state.selectedDeliveryPoint != null) {
      return (
        <div className="overallContainer">
          <div className="tableColumn">
            <h2>Collection Item List</h2>
            <table className="depRepCollectTable">
              <tr className="tableHeader">
                <th>Stationery Description</th>
                <th>Quantity</th>
              </tr>
              <div>
                {finalDisbursementDetailList.map((item) => (
                  <tr className="tableRow">
                    <td>{item.stationeryDesc}</td>
                    <td>{item.qty}</td>
                  </tr>
                ))}
              </div>
            </table>
          </div>

          <div className="cardColumn">
            <div className="card">
              <h3>Select Collection Point Here</h3>
              <select
                className="select-css"
                style={selectStyle}
                value={this.state.selectedDeliveryPoint}
                onChange={this.handleDeliveryPointInput}
              >
                {this.props.deliveryPointList.map((x) => {
                  return <option value={x}>{x}</option>;
                })}
              </select>
              <p>
                Delivery Date:{" "}
                <Moment format="D MMM YYYY">{this.props.deliveryDate}</Moment>{" "}
              </p>
              <p>
                Time: <Moment format="HH:mm A">{selectedCollectionTime}</Moment>
              </p>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="overallContainer">
          <div className="tableColumn">
            <h2>Collection Item List</h2>
            <table className="depRepCollectTable">
              <tr className="tableHeader">
                <th>Stationery Description</th>
                <th>Quantity</th>
              </tr>
              <div>
                <tr className="tableRow">
                  Please select the collection point to display data.
                </tr>
              </div>
            </table>
          </div>

          <div className="cardColumn">
            <div className="card">
              <h3>Select Collection Point Here</h3>
              <select
                className="select-css"
                style={selectStyle}
                value={this.state.selectedDeliveryPoint}
                onChange={this.handleDeliveryPointInput}
              >
                {this.props.deliveryPointList.map((x) => {
                  return <option value={x}>{x}</option>;
                })}
              </select>
              <p>
                Delivery Date:{" "}
                <Moment format="D MMM YYYY">{this.props.deliveryDate}</Moment>{" "}
              </p>
              <p>
                Time: <Moment format="HH:mm A">{selectedCollectionTime}</Moment>
              </p>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default DepRepCollectTable;
