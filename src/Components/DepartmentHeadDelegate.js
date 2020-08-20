import React, { Component } from "react";
import AssignHeadPopup from "../Components/AssignHeadPopup";
import "./InventoryTable.css";

class DepartmentHeadDelegate extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <div>
          <table className="componentTable">
            <tr className="tableHeader">
              <th> Acting Department Head</th>
            </tr>
            <tr className="tableRow">
              <td> {this.props.department.delegate}</td>
            </tr>
          </table>
        </div>
        <div align="right">
          <AssignHeadPopup
            department={this.props.department}
            staff={this.props.staff}
            handleSubmit={this.props.handleSubmit.bind(this)}
          />
        </div>
      </div>
    );
  }
}
export default DepartmentHeadDelegate;
