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
    return (
      <div>
        <div>
          <table className="componentTable">
            <tr className="tableHeader">
              <th> Department Representative</th>
            </tr>
            <tr className="tableRow">
              <td> {this.props.department.rep}</td>
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
