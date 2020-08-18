import React, { Component } from "react";
import "./InventoryTable.css";

class DepartmentHeadCollection extends Component {
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
              <th> Next Delivery</th>
            </tr>
            <tr className="tableRow">
              <td> 08/08/2020</td>
            </tr>
          </table>
        </div>

        <div>
          <table className="componentTable">
            <tr className="tableHeader">
              <th> Stationery Collection Point</th>
            </tr>
            <tr className="tableRow">
              <td> University Hospital</td>
            </tr>
          </table>
        </div>
      </div>
    );
  }
}
export default DepartmentHeadCollection;
