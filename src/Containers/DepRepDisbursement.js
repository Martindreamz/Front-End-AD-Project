import React, { Component } from "react";
import Header from "../Components/Headers/Header";
import DepRepDistriCollectionList from "../Components/DepRepDistriCollectionList";
import axios from "axios";
import { domain, api } from "../Configurations/Config";

class DepRepDisbursement extends Component {
  constructor() {
    super();
    this.state = {
      showDistribution: false,
      class: "collectView",
      department: {},
      collectionInfo: [],
      disbursementList: [],
      deliveryDate: null,
      deliveryPointList: [],
      requisition: {},
      stationery: [],
      requisitionDetail: [],
      disbursementDetail: [],
      requestorList: [],
    };
    this.changeView = this.changeView.bind(this);
  }

  componentDidMount() {
    axios
      .get(
        api +
          "api/Dept/" +
          JSON.parse(sessionStorage.getItem("mySession")).departmentId
      )
      .then((response) => {
        const departmentItems = response.data;
        this.setState({ department: departmentItems });
      });

    axios.get(api + "api/Dept/allCollectionpt").then((response) => {
      const collectionItems = response.data;
      this.setState({ collectionInfo: collectionItems });

      axios
        .get(
          api +
            "api/Dept/nearestDisbursementListByDept/" +
            JSON.parse(sessionStorage.getItem("mySession")).departmentId
        )
        .then((response) => {
          const disbursementItems = response.data;

          const newDisbursementItems = [];
          disbursementItems.forEach((disbursementItem) => {
            const newDisbursementItem = {
              id: disbursementItem.id,
              departmentId: disbursementItem.departmentId,
              date: disbursementItem.date,
              deliveryPoint: disbursementItem.deliveryPoint,
              deliveryTime: collectionItems.find(
                (collectionItem) =>
                  collectionItem.collectionPoint ===
                  disbursementItem.deliveryPoint
              ).collectionTime,
              status: disbursementItem.status,
            };
            newDisbursementItems.push(newDisbursementItem);
          });

          this.setState({ disbursementList: newDisbursementItems });
          this.setState({ deliveryDate: newDisbursementItems[0].date });

          const deliveryPoints = [];
          newDisbursementItems.forEach((item) => {
            deliveryPoints.push(item.deliveryPoint);
          });

          const uniqueDeliveryPoints = new Set(deliveryPoints);

          const finalDeliveryPoints = [];
          uniqueDeliveryPoints.forEach((point) =>
            finalDeliveryPoints.push(point)
          );

          this.setState({ deliveryPointList: finalDeliveryPoints });

          axios
            .get(
              api +
                "api/Dept/deptEmp/" +
                JSON.parse(sessionStorage.getItem("mySession")).departmentId
            )
            .then((response) => {
              const employeeItems = response.data;
              this.setState({ employee: employeeItems });

              axios
                .get(
                  api +
                    "api/Dept/deptToDeliverReq/" +
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

                  axios.get(api + "api/Dept/stationery").then((response) => {
                    const stationeryItems = response.data;
                    this.setState({ stationery: stationeryItems });

                    axios
                      .get(
                        api +
                          "api/Dept/disbursementDetailByDept/" +
                          JSON.parse(sessionStorage.getItem("mySession"))
                            .departmentId
                      )
                      .then((response) => {
                        const disDetailItems = response.data;

                        axios
                          .get(
                            api +
                              "api/Dept/deptToDeliverReq/" +
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
                                api +
                                  "api/Dept/deptToDeliverReqDetail/" +
                                  JSON.parse(
                                    sessionStorage.getItem("mySession")
                                  ).departmentId
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

                                const newDisDetailItems = [];
                                disDetailItems.forEach((disDetailItem) => {
                                  newDisbursementItems.forEach(
                                    (newDisDetailItem) => {
                                      if (
                                        disDetailItem.disbursementListId ===
                                        newDisDetailItem.id
                                      ) {
                                        const newDisDetailItem = {
                                          id: disDetailItem.id,
                                          disbursementListId:
                                            disDetailItem.disbursementListId,
                                          requisitionDetailId:
                                            disDetailItem.requisitionDetailId,
                                          requestor: newReqDetailItems.find(
                                            (reqDetail) =>
                                              reqDetail.id ===
                                              disDetailItem.requisitionDetailId
                                          ).employee,
                                          stationeryDesc: newReqDetailItems.find(
                                            (reqDetail) =>
                                              reqDetail.id ===
                                              disDetailItem.requisitionDetailId
                                          ).desc,
                                          qty: disDetailItem.qty,
                                          status: newDisbursementItems.find(
                                            (newDisbursementItem) =>
                                              newDisbursementItem.id ===
                                              disDetailItem.disbursementListId
                                          ).status,
                                          deliveryPoint: newDisbursementItems.find(
                                            (newDisbursementItem) =>
                                              newDisbursementItem.id ===
                                              disDetailItem.disbursementListId
                                          ).deliveryPoint,
                                        };
                                        newDisDetailItems.push(
                                          newDisDetailItem
                                        );
                                      }
                                    }
                                  );
                                });

                                this.setState({
                                  disbursementDetail: newDisDetailItems,
                                });

                                const requestors = [];
                                newDisDetailItems.forEach((item) => {
                                  requestors.push(item.requestor);
                                });

                                const uniqueRequestors = new Set(requestors);

                                const finalRequestors = [];
                                uniqueRequestors.forEach((requestor) =>
                                  finalRequestors.push(requestor)
                                );

                                this.setState({
                                  requestorList: finalRequestors,
                                });
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
          collectionInfo={this.state.collectionInfo}
          deliveryDate={this.state.deliveryDate}
          deliveryPointList={this.state.deliveryPointList}
          disbursementDetail={this.state.disbursementDetail}
          requestorList={this.state.requestorList}
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
