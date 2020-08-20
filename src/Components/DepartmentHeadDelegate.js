import React, { Component } from "react";
import AssignHeadPopup from "../Components/AssignHeadPopup";
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
              <th> Acting Department Head</th>
            </tr>
            <tr className="tableRow">
              <td> {this.props.delegate}</td>
            </tr>
          </table>
        </div>
        <div align="right">
          <AssignHeadPopup />
          <button> {this.props.delegate === "" ? "Assign" : "Revoke"}</button>
        </div>
      </div>
    );
  }
}
export default DepartmentHeadDelegate;
