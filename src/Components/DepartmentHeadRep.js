import React, { Component } from "react";
import AssignRepPopup from "../Components/AssignRepPopup";
import "./InventoryTable.css";

class DepartmentHeadDelegate extends Component {
  constructor() {
    super();
    /*this.state() = {
            staff: [],
            requisition: [],
            department: ""
        }*/
  }

  render() {
    let deptRep = "No Department Representative assigned.";
    this.props.employee.map((x) => {
      if (x.role === "REPRESENTATIVE") {
        deptRep = x.name;
      }
    });

    return (
      <div>
        <div>
          <table className="componentTable">
            <tr className="tableHeader">
              <th> Department Representative</th>
            </tr>
            <tr className="tableRow">
              <td> {deptRep}</td>
            </tr>
          </table>
        </div>
        <div align="right">
          <AssignRepPopup
            department={this.props.department}
            employee={this.props.employee}
            handleRepSubmit={this.props.handleRepSubmit.bind(this)}
          />
        </div>
      </div>
    );
  }
}
export default DepartmentHeadDelegate;
