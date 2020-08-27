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
    axios
      .get(
        "https://localhost:5001/api/Dept/" +
          JSON.parse(sessionStorage.getItem("mySession")).departmentId
      )
      .then((response) => {
        const departmentItems = response.data;
        this.setState({ department: departmentItems });
      });

    axios
      .get("https://localhost:5001/api/Dept/allCollectionpt")
      .then((response) => {
        const collectionItems = response.data;
        this.setState({ collectionInfo: collectionItems });

        axios
          .get(
            "https://localhost:5001/api/Dept/latestDisbursementByDept/" +
              JSON.parse(sessionStorage.getItem("mySession")).departmentId
          )
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

    axios
      .get(
        "https://localhost:5001/api/Dept/deptEmp/" +
          JSON.parse(sessionStorage.getItem("mySession")).departmentId
      )
      .then((response) => {
        const employeeItems = response.data;
        this.setState({ employee: employeeItems });

        axios
          .get(
            "https://localhost:5001/api/Dept/deptToDeliverReq/" +
              JSON.parse(sessionStorage.getItem("mySession")).departmentId
          )
          .then((response) => {
            const toDeliverReqItems = response.data;

            const newtoDeliverReqItems = [];
            toDeliverReqItems.forEach((toDeliverReqItem) => {
              const newtoDeliverReqItem = {
                id: toDeliverReqItem.id,
                employeeId: toDeliverReqItem.employeeId,
                employeeName: employeeItems.find(
                  (emp) => emp.id === toDeliverReqItem.employeeId
                ).name,
                dateOfRequest: toDeliverReqItem.dateOfRequest,
                dateOfAuthorizing: toDeliverReqItem.dateOfAuthorizing,
                authorizerId: toDeliverReqItem.authorizerId,
                status: toDeliverReqItem.status,
                comment: toDeliverReqItem.comment,
              };
              newtoDeliverReqItems.push(newtoDeliverReqItem);
            });

            this.setState({ requisition: newtoDeliverReqItems });

            axios
              .get("https://localhost:5001/api/Dept/stationery")
              .then((response) => {
                const stationeryItems = response.data;
                this.setState({ stationery: stationeryItems });

                axios
                  .get(
                    "https://localhost:5001/api/Dept/disbursementDetailByDept/" +
                      JSON.parse(sessionStorage.getItem("mySession"))
                        .departmentId
                  )
                  .then((response) => {
                    const disDetailItems = response.data;

                    axios
                      .get(
                        "https://localhost:5001/api/Dept/deptToDeliverReq/" +
                          JSON.parse(sessionStorage.getItem("mySession"))
                            .departmentId
                      )
                      .then((response) => {
                        const tempToDeliverReqItems = response.data;

                        const newtempToDeliverReqItems = [];
                        tempToDeliverReqItems.forEach(
                          (tempToDeliverReqItem) => {
                            const newtempToDeliverReqItem = {
                              id: tempToDeliverReqItem.id,
                              employeeName: employeeItems.find(
                                (emp) =>
                                  emp.id === tempToDeliverReqItem.employeeId
                              ).name,
                            };
                            newtempToDeliverReqItems.push(
                              newtempToDeliverReqItem
                            );
                          }
                        );

                        axios
                          .get(
                            "https://localhost:5001/api/Dept/deptToDeliverReqDetail/" +
                              JSON.parse(sessionStorage.getItem("mySession"))
                                .departmentId
                          )
                          .then((response) => {
                            const reqDetailsItems = response.data;

                            const newReqDetailItems = [];
                            reqDetailsItems.forEach((reqDetailItem) => {
                              const newReqDetailItem = {
                                id: reqDetailItem.id,
                                requisitionId: reqDetailItem.requisitionId,
                                employee: newtempToDeliverReqItems.find(
                                  (req) =>
                                    req.id === reqDetailItem.requisitionId
                                ).employeeName,
                                stationeryId: reqDetailItem.stationeryId,
                                desc: stationeryItems.find(
                                  (stat) =>
                                    stat.id === reqDetailItem.stationeryId
                                ).desc,
                                status: reqDetailItem.status,
                                reqQty: reqDetailItem.reqQty,
                                rcvQty: reqDetailItem.rcvQty,
                              };
                              newReqDetailItems.push(newReqDetailItem);
                            });

                            this.setState({
                              requisitionDetail: newReqDetailItems,
                            });

                            axios
                              .get(
                                "https://localhost:5001/api/Dept/latestDisbursementByDept/" +
                                  JSON.parse(
                                    sessionStorage.getItem("mySession")
                                  ).departmentId
                              )
                              .then((response) => {
                                const disItem = response.data;

                                const newDisDetailItems = [];
                                disDetailItems.forEach((disDetailItem) => {
                                  if (
                                    disDetailItem.disbursementListId ===
                                    disItem.id
                                  ) {
                                    const newDisDetailItem = {
                                      id: disDetailItem.id,
                                      disbursementListId:
                                        disDetailItem.disbursementListId,
                                      requisitionDetailId:
                                        disDetailItem.requisitionDetailId,
                                      stationeryDesc: newReqDetailItems.find(
                                        (reqDetail) =>
                                          reqDetail.id ===
                                          disDetailItem.requisitionDetailId
                                      ).desc,
                                      qty: disDetailItem.qty,
                                    };
                                    newDisDetailItems.push(newDisDetailItem);
                                  }
                                });

                                this.setState({
                                  disbursementDetail: newDisDetailItems,
                                });
                              });
                          });
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
