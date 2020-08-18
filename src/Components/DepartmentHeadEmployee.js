import React, { Component } from "react";
import "./InventoryTable.css";

class DepartmentHeadEmployee extends Component {
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
          <th> Employees under your care</th>
        </tr>
        <tr className="tableRow">
          <td> Bianca Cao</td>
        </tr>
        <tr className="tableRow">
          <td> Daryl Kouk</td>
        </tr>
        <tr className="tableRow">
          <td> Jane Lee</td>
        </tr>
        <tr className="tableRow">
          <td> Martin Ng</td>
        </tr>
        <tr className="tableRow">
          <td> Theingi Aung Win</td>
        </tr>
        <tr className="tableRow">
          <td> Wayne Khine Myo</td>
        </tr>
      </table>
    );
  }
}
export default DepartmentHeadEmployee;
