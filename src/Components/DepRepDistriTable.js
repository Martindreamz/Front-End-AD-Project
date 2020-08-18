import React, { Component } from "react";
import axios from "axios";

class DepRepDistriTable extends Component {
  constructor() {
    super();
    this.state = {
      //test data
      data: [
        {
          id: 1,
          description: "Clips Double 2",
          requestor: "Yirui",
          qty: 5,
        },
        {
          id: 2,
          description: "Short Hand Book",
          requestor: "Wutt Yee",
          qty: 15,
        },
        {
          id: 3,
          description: "Pad Post It 2 x 4",
          requestor: "Theingi",
          qty: 50,
        },
        {
          id: 4,
          description: "Trays in/out",
          requestor: "Martin",
          qty: 25,
        },
        {
          id: 5,
          description: "Stapler No.28",
          requestor: "Wayne",
          qty: 55,
        },
      ],
    };
  }

  //Run once before render - lifecycle
  componentDidMount() {
    //HTTP get request
    axios.get(/* api here */).then((response) => {
      const items = response.data;
      this.setState({ data: items });
    });
  }

  render() {
    const distriItem = this.state.data.map((item) => (
      <tr className="tableRow">
        <td>{item.description}</td>
        <td>{item.requestor}</td>
        <td>{item.qty}</td>
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
