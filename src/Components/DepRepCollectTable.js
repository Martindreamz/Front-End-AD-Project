import React, { Component } from "react";
import axios from "axios";
import "../Components/InventoryTable.css";

class DepRepCollectTable extends Component {
  constructor() {
    super();
    this.state = {
      //test data
      data: [
        {
          id: 1,
          description: "Clips Double 2",
          qty: 5,
        },
        {
          id: 2,
          description: "Short Hand Book",
          qty: 15,
        },
        {
          id: 3,
          description: "Pad Post It 2 x 4",
          qty: 50,
        },
        {
          id: 4,
          description: "Trays in/out",
          qty: 25,
        },
        {
          id: 5,
          description: "Stapler No.28",
          qty: 55,
        },
      ],

      collectionPoint: null,
      collectionTime: null,
    };
  }

  componentDidMount() {
    let collectionPoint = null;
    let collectionTime = null;
    if (this.props.department.collection != null) {
      this.props.collectionInfo.map((x) => {
        if (x.id === this.props.department.collection) {
          collectionPoint = x.collectionPoint;
          collectionTime = x.collectionTime;
        }
      });
    } else {
      collectionPoint = "No collection point assigned.";
      collectionTime = "-- : --";
    }

    this.setState({ collectionPoint: collectionPoint });
    this.setState({ collectionTime: collectionTime });
  }

  render() {
    const collectItem = this.state.data.map((item) => (
      <tr className="tableRow">
        <td>{item.description}</td>
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
            <h2>Collection Point: {this.state.collectionPoint} </h2>
            <p>Date: </p>
            <p>Time: {this.state.collectionTime} </p>
          </div>
        </div>
      </div>
    );
  }
}

export default DepRepCollectTable;
