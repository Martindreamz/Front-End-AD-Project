import React, { Component } from "react";
import "./InventoryTable.css";

class DepartmentHeadApproval extends Component {
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
          <th> Pending Stationery Request</th>
          <th colspan="2"> Action</th>
          <th> Comments</th>
        </tr>
        <tr className="tableRow">
          <td> Bianca Cao</td>
          <td>
            <button className="redButton">Reject</button>
            <button className="greenButton">Approve</button>
          </td>
          <td>
            <textarea />
          </td>
        </tr>
        <tr className="tableRow">
          <td> Daryl Kouk</td>
          <td>
            <button className="redButton">Reject</button>
            <button className="greenButton">Approve</button>
          </td>
          <td>
            <textarea />
          </td>
        </tr>
        <tr className="tableRow">
          <td> Jane Lee</td>
          <td>
            <button className="redButton">Reject</button>
            <button className="greenButton">Approve</button>
          </td>
          <td>
            <textarea />
          </td>
        </tr>
        <tr className="tableRow">
          <td> Jane Lee</td>
          <td>
            <button className="redButton">Reject</button>
            <button className="greenButton">Approve</button>
          </td>
          <td>
            <textarea />
          </td>
        </tr>
        <tr className="tableRow">
          <td> Jane Lee</td>
          <td>
            <button className="redButton">Reject</button>
            <button className="greenButton">Approve</button>
          </td>
          <td>
            <textarea />
          </td>
        </tr>
      </table>
    );
  }
}
export default DepartmentHeadApproval;
