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

    const thirtyStyle = {
      width: "30%",
    };

    const fourtyStyle = {
      width: "40%",
    };

    return (
      <div>
        <table classname="componentTable">
          <tr className="tableHeader">
            <th style={thirtyStyle}>Pending Stationery Request</th>
            <th style={fourtyStyle}>Action</th>
            <th style={thirtyStyle}>Comments</th>
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
                          <td style={thirtyStyle}>{x.employeeName}</td>
                          <td style={fourtyStyle}>
                            <button
                              className="redButton"
                              onClick={() => this.props.handleReject(x.id)}
                            >
                              Reject
                            </button>
                            <button
                              className="greenButton"
                              onClick={() => this.props.handleApprove(x.id)}
                            >
                              Approve
                            </button>
                          </td>
                          <td style={thirtyStyle}>
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
