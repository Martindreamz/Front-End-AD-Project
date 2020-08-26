import React, { Component } from "react";
import AssignHeadPopup from "../Components/AssignHeadPopup";
import "./InventoryTable.css";

class DepartmentHeadDelegate extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    let deptDelegate = "No Department Delegate assigned.";
    this.props.employee.map((x) => {
      if (x.role === "DELEGATE") {
        deptDelegate = x.name;
      }
    });

    return (
      <div>
        <div>
          <table className="componentTable">
            <tr className="tableHeader">
              <th> Acting Department Head</th>
            </tr>
            <tr className="tableRow">
              <td> {deptDelegate}</td>
            </tr>
          </table>
        </div>
        <div align="right">
          <AssignHeadPopup
            department={this.props.department}
            employee={this.props.employee}
            handleDelegateSubmit={this.props.handleDelegateSubmit.bind(this)}
            handleDelegateRevoke={this.props.handleDelegateRevoke.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default DepartmentHeadDelegate;
