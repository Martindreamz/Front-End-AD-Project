import React, { Component } from "react";
import DepRepDistriTable from "../Components/DepRepDistriTable";
import DepRepCollectTable from "../Components/DepRepCollectTable";

class DepRepDistriCollectionList extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    if (this.props.showDistribution) {
      return (
        <div className="inventoryBody">
          <h1>Distribution</h1>
          <DepRepDistriTable
            disbursementDetail={this.props.disbursementDetail}
            requestorList={this.props.requestorList}
          />
        </div>
      );
    }

    return (
      <div className="inventoryBody">
        <h1>Collection</h1>
        <DepRepCollectTable
          deliveryPointList={this.props.deliveryPointList}
          collectionInfo={this.props.collectionInfo}
          deliveryDate={this.props.deliveryDate}
          disbursementDetail={this.props.disbursementDetail}
        />
      </div>
    );
  }
}

export default DepRepDistriCollectionList;
