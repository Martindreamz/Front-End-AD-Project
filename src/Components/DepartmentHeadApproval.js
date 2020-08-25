import React, { Component } from "react";
import "./InventoryTable.css";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { set } from "numeral";

class DepartmentHeadApproval extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const accordionStyle = {
      width: "100%",
    };

    return (
      <div>
        <table classname="componentTable">
          <tr className="tableHeader">
            <th> Pending Stationery Request</th>
            <th> Action</th>
            <th> Comments</th>
          </tr>
          {this.props.requisition.find((req) => req.status === "Applied") !=
          null ? (
            <div>
              {this.props.requisition.map((x) => {
                if (x.status === "Applied") {
                  return (
                    <tr className="tableRow">
                      <Accordion style={accordionStyle}>
                        <AccordionSummary>
                          <td>{x.employeeName}</td>
                          <td>
                            <button
                              className="redButton"
                              onClick={() => this.props.handleApprove(x.id)}
                            >
                              Reject
                            </button>
                            <button
                              className="greenButton"
                              onClick={() => this.props.handleReject(x.id)}
                            >
                              Approve
                            </button>
                          </td>
                          <td>
                            <textarea
                              onChange={(e) =>
                                this.props.handleComment(x.id, e.target.value)
                              }
                            />
                          </td>
                        </AccordionSummary>
                        <AccordionDetails>
                          <table>
                            <tr>
                              <th>Description</th>
                              <th>Quantity</th>
                              <th>Unit</th>
                            </tr>
                            {this.props.requisitionDetail.map((y) => {
                              if (x.id === y.requisitionId) {
                                return (
                                  <tr>
                                    <th>{y.stationeryDesc}</th>
                                    <th>{y.reqQty}</th>
                                    <th>{y.stationeryUnit}</th>
                                  </tr>
                                );
                              }
                            })}
                          </table>
                        </AccordionDetails>
                      </Accordion>
                    </tr>
                  );
                }
              })}
            </div>
          ) : (
            <tr>No pending requisitions.</tr>
          )}
        </table>
      </div>
    );
  }
}
export default DepartmentHeadApproval;
