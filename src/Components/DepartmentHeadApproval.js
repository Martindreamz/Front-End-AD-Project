import React, { Component } from "react";
import "./InventoryTable.css";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";

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
          {this.props.requisition.map((x) => {
            return (
              <tr className="tableRow">
                <Accordion style={accordionStyle}>
                  <AccordionSummary>
                    <td> {x.employeeId}</td>
                    <td>
                      <button className="redButton">Reject</button>
                      <button className="greenButton">Approve</button>
                    </td>
                    <td>
                      <textarea />
                    </td>
                  </AccordionSummary>
                  <AccordionDetails>Testing details</AccordionDetails>
                </Accordion>
              </tr>
            );
          })}
        </table>
      </div>
    );
  }
}
export default DepartmentHeadApproval;
