import React, { Component } from "react";
import Header from "../Components/Headers/Header";
import DepRepDistriCollectionList from "../Components/DepRepDistriCollectionList";
import axios from "axios";

class DepRepDisbursement extends Component {
  constructor() {
    super();
    this.state = {
      showDistribution: false,
      class: "collectView",
    };
    this.changeView = this.changeView.bind(this);
  }

  componentDidMount() {
    axios.get("https://localhost:5001/api/Dept/stationery").then((response) => {
      const items = response.data;
      this.setState({ stationery: items });
    });

    axios.get("https://localhost:5001/api/Dept/reqDetails").then((response) => {
      const items = response.data;

      const sItems = [];
      items.forEach((item) => {
        const newItem = {
          id: item.id,
          stationeryId: item.stationeryId,
          desc: this.state.stationery.find(
            (stat) => stat.id === item.stationeryId
          ).desc,
        };
        sItems.push(newItem);
      });

      this.setState({ requisitionDetail: sItems });
    });

    axios
      .get("https://localhost:5001/api/Dept/disbursementDetailByDept/3")
      .then((response) => {
        const disDetailItems = response.data;

        const sItems = [];
        disDetailItems.forEach((disDetailItem) => {
          const newItem = {
            id: disDetailItem.id,
            disbursementListId: disDetailItem.disbursementListId,
            requisitionDetailId: disDetailItem.requisitionDetailId,
            stationeryDesc: this.state.requisitionDetail.find(
              (req) => req.id === disDetailItem.requisitionDetailId
            ).desc,
            qty: disDetailItem.qty,
          };
          sItems.push(newItem);
        });

        this.setState({ disbursementDetail: sItems });
      });

    axios
      .get("https://localhost:5001/api/Dept/latestDisbursementByDept/3")
      .then((response) => {
        const item = {
          id: response.data.id,
          departmentId: response.data.departmentId,
          date: response.data.date,
          deliveryPoint: response.data.deliveryPoint,
        };

        this.setState({ disbursement: item });
      });
  }
  changeView() {
    this.setState((prevState) => {
      return {
        showDistribution: !prevState.showDistribution,
      };
    });
    if (this.state.showDistribution) {
      this.setState({ class: "collectView" });
    } else {
      this.setState({ class: "distriView" });
    }
  }

  render() {
    return (
      <div>
        <Header />
        <DepRepDistriCollectionList
          showDistribution={this.state.showDistribution}
        />
        <div className={this.state.class}>
          <button onClick={this.changeView}>
            {this.state.showDistribution
              ? "Show Collection"
              : "Show Distribution"}
          </button>
        </div>
      </div>
    );
  }
}

export default DepRepDisbursement;
