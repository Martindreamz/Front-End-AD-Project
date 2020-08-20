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
    this.state = {
      employee: [
        { id: 1, name: "Bianca Cao", role: "STAFF" },
        { id: 2, name: "Daryl Kouk", role: "DELEGATE" },
        { id: 3, name: "Jane Lee", role: "STAFF" },
        { id: 4, name: "Martin Ng", role: "STAFF" },
        { id: 5, name: "Theingi Aung Win", role: "STAFF" },
        { id: 6, name: "Wayne Khine Myo", role: "STAFF" },
      ],
      requisition: [
        {
          Id: 1,
          dateOfRequest: "08 / 08 / 2020",
          dateOfAuthorizing: "08 / 08 / 2020",
          status: "pending",
          comment: "",
          EmployeeId: "Bianca Cao",
          AuthorizerId: "",
        },
        {
          Id: 2,
          dateOfRequest: "08 / 08 / 2020",
          dateOfAuthorizing: "08 / 08 / 2020",
          status: "pending",
          comment: "",
          EmployeeId: "Daryl Kouk",
          AuthorizerId: "",
        },
        {
          Id: 3,
          dateOfRequest: "08 / 08 / 2020",
          dateOfAuthorizing: "08 / 08 / 2020",
          status: "pending",
          comment: "",
          EmployeeId: "Jane Lee",
          AuthorizerId: "",
        },
        {
          Id: 4,
          dateOfRequest: "08 / 08 / 2020",
          dateOfAuthorizing: "08 / 08 / 2020",
          status: "pending",
          comment: "",
          EmployeeId: "Jane Lee",
          AuthorizerId: "",
        },
        {
          Id: 5,
          dateOfRequest: "08 / 08 / 2020",
          dateOfAuthorizing: "08 / 08 / 2020",
          status: "pending",
          comment: "",
          EmployeeId: "Jane Lee",
          AuthorizerId: "",
        },
      ],
      department: {
        name: "hello",
        rep: "Martin",
        delegate: "Bianca Cao",
        DelgtStartDate: "2020-06-13",
        DelgtEndDate: "2020-07-31",
        nextCollection: "2020-08-08",
        collectionId: 2,
      },
      collectionInfo: [
        { id: 1, collectionPt: "Stationery Store - Administration Building" },
        { id: 2, collectionPt: "Management School" },
        { id: 3, collectionPt: "Medical School" },
        { id: 4, collectionPt: "Engineering School" },
        { id: 5, collectionPt: "Science School" },
        { id: 6, collectionPt: "University Hospital" },
      ],
    };

    this.handleDelegateSubmit = this.handleDelegateSubmit.bind(this);
    this.handleCollectionSubmit = this.handleCollectionSubmit.bind(this);
  }

  handleDelegateSubmit(selectedDelegate, selectedStartDate, selectedEndDate) {
    this.setState(
      Object.assign(this.state.department, {
        delegate: selectedDelegate,
        DelgtStartDate: selectedStartDate,
        DelgtEndDate: selectedEndDate,
      }),
      () => {
        console.log(this.state);
      }
    );
  }

  handleCollectionSubmit(selectedCollectionPt) {
    this.setState(
      Object.assign(this.state.department, {
        collectionPt: selectedCollectionPt,
      }),
      () => {
        console.log(this.state);
      }
    );
  }

  render() {
    return (
      <div>
        <div className="toppane">
          <Header />
          <h1>LOGIC UNIVERSITY</h1>
          <h1>DEPARTMENT INFORMATION</h1>
        </div>
        <div className="leftpane">
          <h4>Your People</h4>
          <div>
            <DepartmentHeadDelegate
              department={this.state.department}
              employee={this.state.employee}
              handleDelegateSubmit={this.handleDelegateSubmit.bind(this)}
            />
          </div>
          <div>
            <DepartmentHeadEmployee employee={this.state.employee} />
          </div>
          <div>
            <DepartmentHeadRep rep={this.state.department.rep} />
          </div>
        </div>
        <div className="middlepane">
          <h4>Your Tasks</h4>
          <DepartmentHeadApproval requisition={this.state.requisition} />
        </div>
        <div className="rightpane">
          <h4>Your Logistics</h4>
          <DepartmentHeadCollection
            department={this.state.department}
            collectionInfo={this.state.collectionInfo}
            handleCollectionSubmit={this.handleCollectionSubmit.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default ManageDepartment;
