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
            <div>
                <div>
                <table className="componentTable" >
                    <tr className="tableHeader"><th> Department Representative</th></tr>
                    <tr className="tableRow"><td> { this.props.rep}</td></tr>
                    </table>
                </div><div align="right">
                    <button > {this.props.rep === "" ? "Assign" : "Change"}</button>
                </div>
            </div>)
    }
}
export default DepartmentHeadDelegate;
