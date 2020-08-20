import React, { Component } from "react";
import Header from "../Components/Headers/Header";
import StoreMStockAdjustmentApprovalTable from "../Components/StoreMStockAdjustmentApprovalTable";
import axios from "axios";
import StockAdjustmentPopup from "../Components/StockAdjustmentPopup";

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
        popupData: [],
        displayPopup: false
    }
  }

  //Run once before render - lifecycle
  componentDidMount() {
    //HTTP get request
    axios.get(/* api here */).then((response) => {
      const items = response.data;
      this.setState({ data: items });
    });
    }

    showPopup = (event) => {
        console.log(event.currentTarget.id)
        const id = event.currentTarget.id
        //post request with id to retrieve stock adjustment details
        this.setState({
            popupData: [
                {
                    id: id,
                    quantity: id * 5,
                    amount: id * 100,
                    reason: "lost"
                },
                {
                    id: id,
                    quantity: id * 10,
                    amount: id * 200,
                    reason: "missing"
                }
            ],
            displayPopup: true
        })
    }
    closePopup = () => {
        this.setState({
            displayPopup: false
        })
    }

  render() {
    return (
      <div>
            <Header />
            {this.state.displayPopup ? < StockAdjustmentPopup popupData={this.state.popupData} closePopup={this.closePopup} /> : null}
            <div className="inventoryBody">
                <StoreMStockAdjustmentApprovalTable data={this.state.data} showPopup={this.showPopup} />
            </div>
      </div>
    );
  }
}

export default StoreMStockAdjustmentApproval;
