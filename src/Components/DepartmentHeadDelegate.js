import React, { Component } from "react";
import AssignHeadPopup from "../Components/AssignHeadPopup";
import "./InventoryTable.css";

class DepartmentHeadDelegate extends Component {
  constructor() {
    super();
    this.state = {
      staff: [],
      requisition: [],
      department: "",
      haveDelegate: true,
    };
  }

  componentDidMount() {
    if (this.props.delegate === "") {
      this.setState({ haveDelegate: false });
    } else {
      this.setState({ haveDelegate: true });
    }
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
          <AssignHeadPopup haveDelegate={this.state.haveDelegate} />
        </div>
      </div>
    );
  }
}
export default DepartmentHeadDelegate;
