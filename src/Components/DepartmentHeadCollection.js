import React, { Component } from "react";
import AssignCollectionPtPopup from "../Components/AssignCollectionPtPopup";
import "./InventoryTable.css";

class DepartmentHeadCollection extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {}

  render() {
    let collectionPoint = null;
    if (this.props.department.collectionId != null) {
      this.props.collectionInfo.map((x) => {
        if (x.id === this.props.department.collectionId) {
          collectionPoint = x.collectionPt;
        }
      });
    } else {
      collectionPoint = "No collection point assigned.";
    }
    return (
      <div>
        <div>
          <table className="componentTable">
            <tr className="tableHeader">
              <th> Next Delivery</th>
            </tr>
            <tr className="tableRow">
              <td> {this.props.department.nextCollection}</td>
            </tr>
          </table>
        </div>
        <div>
          <table className="componentTable">
            <tr className="tableHeader">
              <th> Stationery Collection Point</th>
            </tr>
            <tr className="tableRow">
              <td> {collectionPoint}</td>
            </tr>
          </table>
        </div>
        <div align="right">
          <AssignCollectionPtPopup
            department={this.props.department}
            collectionInfo={this.props.collectionInfo}
            handleCollectionSubmit={this.props.handleCollectionSubmit.bind(
              this
            )}
          />
        </div>
      </div>
    );
  }
}

export default DepartmentHeadCollection;
