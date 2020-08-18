import React, { Component } from "react";
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
      <table className="componentTable">
        <tr className="tableHeader">
          <th> Acting Department Head</th>
        </tr>
        <tr className="tableRow">
          <td> Wutt Yee</td>
        </tr>
      </table>
    );
  }
}
export default DepartmentHeadDelegate;
