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
    if (this.props.department.collection != null) {
      this.props.collectionInfo.map((x) => {
        if (x.id === this.props.department.collection) {
          collectionPoint = x.collectionPoint;
        }
      });
    } else {
      collectionPoint = "No collection point assigned.";
    }

    let collectionTime = null;
    if (this.props.department.collection != null) {
      this.props.collectionInfo.map((x) => {
        if (x.id === this.props.department.collection) {
          collectionTime = x.collectionTime;
        }
      });
    } else {
      collectionTime = null;
    }

    return (
      <div>
        {collectionTime != null ? (
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
        ) : (
          <div></div>
        )}
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
            collectionPoint={collectionPoint}
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
