import React, { Component } from "react";
import "./InventoryTable.css";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";

class DepartmentHeadApproval extends Component {
  constructor() {
    super();
    this.state = {
      requisitionTable: [
        {
          id: 1,
          employeeId: "Joe5",
          dateOfAuthorizing: null,
          status: "Applied",
          comment: null,

          requisitionDetail: [
            {
              id: 1,
              stationeryId: 1,
              reqQty: 15,
              status: "Applied",
            },
          ],
        },

        {
          id: 2,
          employeeId: "Joe2",
          dateOfAuthorizing: null,
          status: "Applied",
          comment: null,

          requisitionDetail: [
            {
              id: 3,
              stationeryId: 3,
              reqQty: 5,
              status: "Applied",
            },
            {
              id: 5,
              stationeryId: 3,
              reqQty: 50,
              status: "Applied",
            },
          ],
        },
      ],
    };
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
                    <td>
                      {this.props.employee.map((y) => {
                        if (x.employeeId === y.id) {
                          return y.name;
                        }
                      })}
                    </td>
                    <td>
                      <button className="redButton">Reject</button>
                      <button className="greenButton">Approve</button>
                    </td>
                    <td>
                      <textarea />
                    </td>
                  </AccordionSummary>
                  <AccordionDetails>
                    <table>
                      <tr>
                        <th>Description</th>
                        <th>Quantity</th>
                      </tr>
                      {this.props.requisitionDetail.map((z) => {
                        if (x.id === z.requisitionId) {
                          return (
                            <tr>
                              <th>{z.id}</th>
                              <th>{z.reqQty}</th>
                            </tr>
                          );
                        }
                      })}
                    </table>
                  </AccordionDetails>
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
