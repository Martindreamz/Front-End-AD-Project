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
      requisitionDetail: [],
      requisitionListWithDetail: [],
      department: {},
      collectionInfo: [],
      stationery: [],
    };

    this.handleDelegateSubmit = this.handleDelegateSubmit.bind(this);
    this.handleRepSubmit = this.handleRepSubmit.bind(this);
    this.handleCollectionSubmit = this.handleCollectionSubmit.bind(this);
    this.handleApprove = this.handleApprove.bind(this);
    this.handleReject = this.handleReject.bind(this);
    this.handleComment = this.handleComment.bind(this);
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

    axios.get("https://localhost:5001/api/Dept/stationery").then((response) => {
      const items = response.data;
      this.setState({ stationery: items });
    });

    axios
      .get("https://localhost:5001/api/Dept/deptPendingReq/3")
      .then((response) => {
        const items = response.data;

        const sItems = [];
        items.forEach((item) => {
          const newItem = {
            id: item.id,
            employeeId: item.employeeId,
            employee: this.state.employee.find(
              (emp) => emp.id === item.employeeId
            ),
            dateOfRequest: item.dateOfRequest,
            dateOfAuthorizing: item.dateOfAuthorizing,
            authorizerId: item.authorizerId,
            status: item.status,
            comment: item.comment,
          };
          sItems.push(newItem);
        });

        this.setState({ requisition: sItems });
      });

    axios
      .get("https://localhost:5001/api/Dept/deptPendingReqDetail/3")
      .then((response) => {
        const items = response.data;

        const sItems = [];
        items.forEach((item) => {
          const newItem = {
            id: item.id,
            requisitionId: item.requisitionId,
            stationeryId: item.stationeryId,
            stationery: this.state.stationery.find(
              (stat) => stat.id === item.stationeryId
            ),
            reqQty: item.reqQty,
            rcvQty: item.rcvQty,
            status: item.status,
          };
          sItems.push(newItem);
        });

        this.setState({ requisitionDetail: sItems });
      });
  }

  handleDelegateSubmit(selectedDelegate, selectedStartDate, selectedEndDate) {
    this.setState(
      Object.assign(this.state.department, {
        delgtStartDate: selectedStartDate,
        delgtEndDate: selectedEndDate,
      })
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

    console.log(this.state.department);
    console.log(this.state.employee);
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

    console.log(this.state.employee);
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
        console.log(this.state.department);
      }
    );

    axios.post(
      "https://localhost:5001/api/Dept/deptCollection/3",
      this.state.department
    );
  }

  handleApprove(requisitionId) {
    let newRequisition = null;
    this.state.requisition.map((x) => {
      if (x.id === requisitionId) {
        newRequisition = x;
        newRequisition.status = "Approved";
        this.setState({ x: newRequisition });
      }
    });

    console.log(this.state.requisition);
  }

  handleReject(requisitionId) {
    let newRequisition = null;
    this.state.requisition.map((x) => {
      if (x.id === requisitionId) {
        newRequisition = x;
        newRequisition.status = "Declined";
        this.setState({ x: newRequisition });
      }
    });

    console.log(this.state.requisition);
  }

  handleComment(requisitionId, comment) {
    let newRequisition = null;
    this.state.requisition.map((x) => {
      if (x.id === requisitionId) {
        newRequisition = x;
        newRequisition.comment = comment;
        this.setState({ x: newRequisition });
      }
    });

    console.log(this.state.requisition);
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
          <DepartmentHeadApproval
            requisition={this.state.requisition}
            requisitionDetail={this.state.requisitionDetail}
            handleApprove={this.handleApprove.bind(this)}
            handleReject={this.handleReject.bind(this)}
            handleComment={this.handleComment.bind(this)}
          />
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
