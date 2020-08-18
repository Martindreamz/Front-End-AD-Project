import React, { Component } from "react";
import Header from "../Components/Headers/Header";
import DepRepDistriCollectionList from "../Components/DepRepDistriCollectionList";
import axios from "axios";

class DepRepDisbursement extends Component {
  constructor() {
    super();
    this.state = {
      showDistribution: false,
    };
    this.changeView = this.changeView.bind(this);
  }

  changeView() {
    this.setState((prevState) => {
      return {
        showDistribution: !prevState.showDistribution,
      };
    });
  }

  render() {
    return (
      <div>
        <Header />
        <DepRepDistriCollectionList
          showDistribution={this.state.showDistribution}
        />
        <button className="changeView" onClick={this.changeView}>
          {this.state.showDistribution
            ? "Show Collection"
            : "Show Distribution"}
        </button>
      </div>
    );
  }
}

export default DepRepDisbursement;
