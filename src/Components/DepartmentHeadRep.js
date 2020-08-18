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
                <table className="componentTable" >
                    <tr className="tableHeader"><th> Acting Department Head</th></tr>
                    <tr className="tableRow"><td> { this.props.rep}</td></tr>
                </table></div>)
    }
}
export default DepartmentHeadDelegate;
