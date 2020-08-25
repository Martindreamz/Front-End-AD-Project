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
      disbursement: {},
      requisition: {},
      stationery: [],
      requisitionDetail: [],
      disbursementDetail: [],
    };
    this.changeView = this.changeView.bind(this);
  }

  componentDidMount() {
    axios.get("https://localhost:5001/api/Dept/2").then((response) => {
      const departmentItems = response.data;
      this.setState({ department: departmentItems });
    });

    axios
      .get("https://localhost:5001/api/Dept/allCollectionpt")
      .then((response) => {
        const collectionItems = response.data;
        this.setState({ collectionInfo: collectionItems });

        axios
          .get("https://localhost:5001/api/Dept/latestDisbursementByDept/2")
          .then((response) => {
            const disbursementItem = response.data;

            let newDisbursementItem = {};
            newDisbursementItem = {
              id: disbursementItem.id,
              departmentId: disbursementItem.departmentId,
              date: disbursementItem.date,
              time: collectionItems.find(
                (collect) =>
                  collect.collectionPoint === disbursementItem.deliveryPoint
              ).collectionTime,
              deliveryPoint: disbursementItem.deliveryPoint,
            };

            this.setState({ disbursement: newDisbursementItem });
          });
      });

    axios.get("https://localhost:5001/api/Dept/deptEmp/3").then((response) => {
      const employeeItems = response.data;
      this.setState({ employee: employeeItems });

      axios
        .get("https://localhost:5001/api/Dept/deptPendingReq/3")
        .then((response) => {
          const pendingReqItems = response.data;

          const newPendingReqItems = [];
          pendingReqItems.forEach((pendingReqItem) => {
            const newPendingReqItem = {
              id: pendingReqItem.id,
              employeeId: pendingReqItem.employeeId,
              employeeName: employeeItems.find(
                (emp) => emp.id === pendingReqItem.employeeId
              ).name,
              dateOfRequest: pendingReqItem.dateOfRequest,
              dateOfAuthorizing: pendingReqItem.dateOfAuthorizing,
              authorizerId: pendingReqItem.authorizerId,
              status: pendingReqItem.status,
              comment: pendingReqItem.comment,
            };
            newPendingReqItems.push(newPendingReqItem);
          });

          this.setState({ requisition: newPendingReqItems });

          axios
            .get("https://localhost:5001/api/Dept/stationery")
            .then((response) => {
              const stationeryItems = response.data;
              this.setState({ stationery: stationeryItems });

              axios
                .get("https://localhost:5001/api/Dept/deptToDeliverReqDetail/2")
                .then((response) => {
                  const reqDetailsItems = response.data;

                  const newReqDetailItems = [];
                  reqDetailsItems.forEach((reqDetailItem) => {
                    const newReqDetailItem = {
                      id: reqDetailItem.id,
                      stationeryId: reqDetailItem.stationeryId,
                      desc: stationeryItems.find(
                        (stat) => stat.id === reqDetailItem.stationeryId
                      ).desc,
                      status: reqDetailItem.status,
                      reqQty: reqDetailItem.reqQty,
                    };
                    newReqDetailItems.push(newReqDetailItem);
                  });

                  this.setState({ requisitionDetail: newReqDetailItems });

                  axios
                    .get(
                      "https://localhost:5001/api/Dept/disbursementDetailByDept/2"
                    )
                    .then((response) => {
                      const disDetailItems = response.data;

                      const newDisDetailItems = [];

                      this.setState({ disbursementDetail: disDetailItems });
                    });
                });
            });
        });
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
    console.log(this.state.requisitionDetail);
    return (
      <div>
        <Header />
        <DepRepDistriCollectionList
          showDistribution={this.state.showDistribution}
          disbursement={this.state.disbursement}
          disbursementDetail={this.state.disbursementDetail}
          requisitionDetail={this.state.requisitionDetail}
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
