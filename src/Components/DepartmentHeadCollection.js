import React, { Component } from "react";
import Moment from "react-moment"; //need npm install --save moment react-moment
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
        if (x.Id === this.props.department.collectionId) {
          collectionPoint = x.collectionPoint;
        }
      });
    } else {
      collectionPoint = "No collection point assigned.";
    }

    let collectionTime = null;
    if (this.props.department.collectionId != null) {
      this.props.collectionInfo.map((x) => {
        if (x.Id === this.props.department.collectionId) {
          collectionTime = x.collectionTime;
        }
      });
    } else {
      collectionTime = "No collection point assigned.";
    }

    return (
      <div>
        <div>
          <table className="componentTable">
            <tr className="tableHeader">
              <th>Collection Time</th>
            </tr>
            <tr className="tableRow">
              <td>
                <Moment format="HH:mm">{collectionTime}</Moment>
              </td>
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
