import React, { Component } from "react";
import axios from "axios";

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
    const collectItem = this.state.data.map((item) => (
      <tr className="tableRow">
        <td>{item.description}</td>
        <td>{item.qty}</td>
      </tr>
    ));
    return (
      <table className="genericTable">
        <tr className="tableHeader">
          <th>Stationery Description</th>
          <th>Quantity</th>
        </tr>
        {collectItem}
      </table>
    );
  }
}

export default DepRepCollectTable;
