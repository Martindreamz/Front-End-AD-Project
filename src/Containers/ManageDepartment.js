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
      employee: [],
      requisition: [],
      department: {},
      collectionInfo: [],
    };

    this.handleDelegateSubmit = this.handleDelegateSubmit.bind(this);
    this.handleRepSubmit = this.handleRepSubmit.bind(this);
    this.handleCollectionSubmit = this.handleCollectionSubmit.bind(this);
  }

  //Run once before render - lifecycle
  componentDidMount() {
    //HTTP get request
    axios.get("https://localhost:5001/api/Dept/3").then((response) => {
      const items = response.data;
      this.setState({ department: items });
    });

    axios.get("https://localhost:5001/api/Dept/deptEmp/3").then((response) => {
      const items = response.data;
      this.setState({ employee: items });
    });

    axios
      .get("https://localhost:5001/api/Dept/allCollectionpt")
      .then((response) => {
        const items = response.data;
        this.setState({ collectionInfo: items });
      });

    axios
      .get("https://localhost:5001/api/Dept/deptPendingReq/3")
      .then((response) => {
        const items = response.data;
        this.setState({ requisition: items });
      });
  }

  handleDelegateSubmit(selectedDelegate, selectedStartDate, selectedEndDate) {
    this.setState(
      Object.assign(this.state.department, {
        DelgtStartDate: selectedStartDate,
        DelgtEndDate: selectedEndDate,
      }),
      () => {
        console.log(this.state);
      }
    );

    let oldDelegate = null;

    this.state.employee.map((x) => {
      if (x.role === "DELEGATE") {
        oldDelegate = x;
        oldDelegate.role = "STAFF";
        this.setState({ x: oldDelegate });
      }
    });

    let newDelegate = null;
    this.state.employee.map((x) => {
      if (x.name === selectedDelegate) {
        newDelegate = x;
        newDelegate.role = "DELEGATE";
        this.setState({ x: newDelegate });
      }
    });
  }

  handleRepSubmit(selectedRep) {
    let oldRepresentative = null;

    this.state.employee.map((x) => {
      if (x.role === "REPRESENTATIVE") {
        oldRepresentative = x;
        oldRepresentative.role = "STAFF";
        this.setState({ x: oldRepresentative });
      }
    });

    let newRepresentative = null;
    this.state.employee.map((x) => {
      if (x.name === selectedRep) {
        newRepresentative = x;
        newRepresentative.role = "REPRESENTATIVE";
        this.setState({ x: newRepresentative });
      }
    });
  }

  handleCollectionSubmit(selectedCollectionPoint) {
    let updatedCollectionId = null;
    this.state.collectionInfo.map((x) => {
      if (x.collectionPoint === selectedCollectionPoint) {
        updatedCollectionId = x.id;
      }
    });
    this.setState(
      Object.assign(this.state.department, {
        collection: updatedCollectionId,
      }),
      () => {
        console.log(this.state);
      }
    );

    //this needs to modify further!
    console.log("Post");
    axios.post(
      "https://localhost:5001/api/Dept/updateDeptInfo/3",
      this.state.department
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
