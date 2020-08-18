import React, { Component } from "react";
import Header from "../Components/Headers/Header";
import DepartmentHeadDelegate from "../Components/DepartmentHeadDelegate";
import DepartmentHeadCollection from "../Components/DepartmentHeadCollection";
import DepartmentHeadEmployee from "../Components/DepartmentHeadEmployee";
import DepartmentHeadRep from "../Components/DepartmentHeadRep";
import DepartmentHeadApproval from "../Components/DepartmentHeadApproval";
import "../Components/ManagerPartition.css";

class ManageDepartment extends Component {
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
        <div className="container">
          <div className="toppane">
            <Header />
            <h1>LOGIC UNIVERSITY</h1>
            <h1>DEPARTMENT INFORMATION</h1>
          </div>
          <div className="leftHeader">
            <h4>Your People</h4>
          </div>
          <div className="middleHeader">
            <h4>Your Tasks</h4>
          </div>
          <div className="rightHeader">
            <h4>Your Logistics</h4>
          </div>
          <div className="leftpane">
            <div>
              <DepartmentHeadDelegate />
            </div>
            <div>
              <DepartmentHeadEmployee />
            </div>
            <div>
              <DepartmentHeadRep />
            </div>
          </div>
          <div className="middlepane">
            <DepartmentHeadApproval />
          </div>
          <div className="rightpane">
            <DepartmentHeadCollection />
          </div>
        </div>
      </div>
    );
  }
}

export default ManageDepartment;
