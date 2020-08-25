import React, { Component } from "react";
import DepRepDistriTable from "../Components/DepRepDistriTable";
import DepRepCollectTable from "../Components/DepRepCollectTable";

class DepRepDistriCollectionList extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    let requisitionDetailinDisbursement = [];
    this.props.requisitionDetail.map((x) => {
      this.props.disbursementDetail.map((y) => {
        if (x.id === y.requisitionDetailId) {
          requisitionDetailinDisbursement.push(x);
        }
      });
    });

    if (this.props.showDistribution) {
      return (
        <div className="inventoryBody">
          <h1>Distribution</h1>
          <DepRepDistriTable
            requisitionDetail={requisitionDetailinDisbursement}
          />
        </div>
      );
    }

    return (
      <div className="inventoryBody">
        <h1>Collection</h1>
        <DepRepCollectTable
          disbursement={this.props.disbursement}
          disbursementDetail={this.props.disbursementDetail}
        />
      </div>
    );
  }
}

export default DepRepDistriCollectionList;
