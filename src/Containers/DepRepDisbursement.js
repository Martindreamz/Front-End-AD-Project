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
      department: {},
      collectionInfo: [],
    };
    this.changeView = this.changeView.bind(this);
  }

  //Run once before render - lifecycle
  componentDidMount() {
    //HTTP get request
    axios.get("https://localhost:5001/api/Dept/3").then((response) => {
      const items = response.data;
      this.setState({ department: items });
    });

    axios
      .get("https://localhost:5001/api/Dept/allCollectionpt")
      .then((response) => {
        const items = response.data;
        this.setState({ collectionInfo: items });
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
          department={this.state.department}
          collectionInfo={this.state.collectionInfo}
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
