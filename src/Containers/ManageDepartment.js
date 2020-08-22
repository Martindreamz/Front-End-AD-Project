import React, { Component } from "react";
import axios from "axios";
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
        { Id: 1, name: "Bianca Cao", role: "REPRESENTATIVE" },
        { Id: 2, name: "Daryl Kouk", role: "DELEGATE" },
        { Id: 3, name: "Jane Lee", role: "STAFF" },
      ],

      requisition: [
        {
          Id: 1,
          EmployeeId: 1,
          dateOfRequest: "2020-08-17 08:00:00.0000000",
          dateOfAuthorizing: null,
          AuthorizerId: 2,
          status: "Applied",
          comment: "",
        },
        {
          Id: 2,
          EmployeeId: 1,
          dateOfRequest: "2020-08-17 09:30:52.0000000",
          dateOfAuthorizing: null,
          AuthorizerId: 2,
          status: "Applied",
          comment: "",
        },
        {
          Id: 3,
          EmployeeId: 3,
          dateOfRequest: "2020-08-18 10:30:00.0000000",
          dateOfAuthorizing: null,
          AuthorizerId: 2,
          status: "Applied",
          comment: "",
        },
      ],

      department: {
        Id: 1,
        deptName: "Zoology Dept",
        deptCode: "ZOOL",
        delgtStartDate: "2019-12-20 00:00:00.0000000",
        delgtEndDate: "2020-01-03 00:00:00.0000000",
        collectionId: 2,
      },

      collectionInfo: [
        {
          Id: 1,
          collectionTime: "2020-08-01 09:30:00.0000000",
          collectionPoint: "Stationery Store - Administration Building",
        },
        {
          Id: 2,
          collectionTime: "2020-08-01 11:00:00.0000000",
          collectionPoint: "Management School",
        },
        {
          Id: 3,
          collectionTime: "2020-08-02 09:30:00.0000000",
          collectionPoint: "Medical School",
        },
      ],
    };

    this.handleDelegateSubmit = this.handleDelegateSubmit.bind(this);
    this.handleRepSubmit = this.handleRepSubmit.bind(this);
    this.handleCollectionSubmit = this.handleCollectionSubmit.bind(this);
  }

  //Run once before render - lifecycle
  componentDidMount() {
    //HTTP get request
    axios.get("https://localhost:5001/api/Dept/1").then((response) => {
      const items = response.data;
      this.setState({ department: items });
    });

    axios.get("https://localhost:5001/api/Dept/deptEmp/1").then((response) => {
      const items = response.data;
      this.setState({ employee: items });
    });

    axios
      .get("https://localhost:5001/api/Dept/allCollectionpt")
      .then((response) => {
        const items = response.data;
        this.setState({ collectionInfo: items });
      });

    axios.get("https://localhost:5001/api/Dept/pendingReq").then((response) => {
      const items = response.data;
      this.setState({ requisition: items });
    });
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

  handleRepSubmit(selectedRep) {}

  handleCollectionSubmit(selectedCollectionPoint) {
    let updatedCollectionId = null;
    this.state.collectionInfo.map((x) => {
      if (x.collectionPoint === selectedCollectionPoint) {
        updatedCollectionId = x.Id;
      }
    });
    this.setState(
      Object.assign(this.state.department, {
        collectionId: updatedCollectionId,
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
            <DepartmentHeadRep
              department={this.state.department}
              employee={this.state.employee}
              handleRepSubmit={this.handleRepSubmit.bind(this)}
            />
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
