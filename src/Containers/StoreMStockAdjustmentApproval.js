import React, { Component } from "react";
import Header from "../Components/Headers/Header";
import StoreMStockAdjustmentApprovalTable from "../Components/StoreMStockAdjustmentApprovalTable";
import axios from "axios";

class StoreMStockAdjustmentApproval extends Component {
  constructor() {
    super();
    this.state = {
      //test data
      data: [
        {
          id: 1,
          requestor: "John",
          amount: 260,
        },
        {
          id: 2,
          requestor: "Mary",
          amount: 300,
        },
        {
          id: 3,
          requestor: "Jenny",
          amount: 284,
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
    return (
      <div>
        <Header />
        <div className="inventoryBody">
          <StoreMStockAdjustmentApprovalTable data={this.state.data} />
        </div>
      </div>
    );
  }
}

export default StoreMStockAdjustmentApproval;
