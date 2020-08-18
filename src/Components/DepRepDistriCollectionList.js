import React, { Component } from "react";

class DepRepDistriCollectionList extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    if (this.props.showDistribution) {
      return (
        <div>
          <h1>Distribution</h1>
        </div>
      );
    }
    return (
      <div>
        <h1>Collection</h1>
      </div>
    );
  }
}

export default DepRepDistriCollectionList;
