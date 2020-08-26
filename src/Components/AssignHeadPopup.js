import React, { Component } from "react";
import Popup from "reactjs-popup";
import "./InventoryTable.css";

class AssignHeadPopup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      delegate: "",
      startDate: "",
      endDate: "",
      availEmployees: null,
      open: false,
    };

    this.handleDelegateInput = this.handleDelegateInput.bind(this);
    this.handleStartDateInput = this.handleStartDateInput.bind(this);
    this.handleEndDateInput = this.handleEndDateInput.bind(this);
    this.revoke = this.revoke.bind(this);
    this.submit = this.submit.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleDelegateInput(event) {
    this.setState({ delegate: event.target.value });
  }

  //need to install dateformat by npm install dateformat
  handleStartDateInput(event) {
    if (event.target.value > this.state.endDate) {
      window.alert("Start Date can't be after End Date!");
    } else {
      this.setState({ startDate: event.target.value });
    }
  }

  handleEndDateInput(event) {
    if (event.target.value < this.state.startDate) {
      window.alert("End Date can't be before Start Date!");
    } else {
      this.setState({ endDate: event.target.value });
    }
  }

  revoke() {
    if (window.confirm("Are you sure you want to revoke?")) {
      this.props.handleDelegateRevoke();
      this.closeModal();
      window.location.reload(true);
    }
  }

  submit() {
    if (
      this.state.delegate === "" ||
      this.state.startDate === "1-01-01" ||
      this.state.endDate === "1-01-01"
    ) {
      window.alert("You need to complete all inputs!");
    }

    if (
      this.state.delegate != "" &&
      this.state.startDate != "1-01-01" &&
      this.state.endDate != "1-01-01"
    ) {
      this.props.handleDelegateSubmit(
        this.state.delegate,
        this.state.startDate,
        this.state.endDate
      );
      this.closeModal();
    }
  }

  //$ npm install dateformat
  openModal() {
    this.setState({ open: true });

    this.props.employee.map((x) => {
      if (x.role === "DELEGATE") {
        this.setState({ delegate: x.name });
      }
    });

    var dateFormat = require("dateformat");
    this.setState({
      startDate: dateFormat(
        this.props.department.delgtStartDate,
        "yyyy-mm-dd"
      ).toString(),
    });
    this.setState({
      endDate: dateFormat(
        this.props.department.delgtEndDate,
        "yyyy-mm-dd"
      ).toString(),
    });

    let empList = [];
    this.props.employee.map((x) => {
      if (x.role === "STAFF" || x.role === "DELEGATE") {
        empList.push(x);
      }
    });
    this.setState({ availEmployees: empList });
  }

  closeModal() {
    this.setState({ open: false });
  }

  render() {
    return (
      <div>
        <button className="manageButton" onClick={this.openModal}>
          {this.props.department.delegate === "" ? "Assign" : "Change"}{" "}
        </button>
        <Popup
          open={this.state.open}
          closeOnDocumentClick
          onClose={this.closeModal}
          modal
        >
          {(close) => (
            <div className="popupDialog">
              <a className="close" onClick={close}>
                &times;
              </a>
              <div className="dialogHeader">
                <h2>
                  {this.props.department.delegate === ""
                    ? "Assign Department Head"
                    : "Change / Revoke Department Head"}{" "}
                </h2>
              </div>
              <br />
              <div className="dialogContent">
                <select
                  className="select-css"
                  value={this.state.delegate}
                  onChange={this.handleDelegateInput}
                >
                  {this.state.availEmployees.map((x) => {
                    return <option value={x.name}>{x.name}</option>;
                  })}
                </select>
                <p>Start Date: </p>
                <input
                  type="date"
                  name="startDate"
                  value={this.state.startDate}
                  onChange={this.handleStartDateInput}
                />
                <p>End Date:</p>
                <input
                  type="date"
                  name="endDate"
                  value={this.state.endDate}
                  onChange={this.handleEndDateInput}
                />
              </div>
              <br />
              <div className="popupButtons">
                <button className="redButton" onClick={this.revoke}>
                  Revoke
                </button>
                <button className="greenButton" onClick={this.submit}>
                  Submit
                </button>
              </div>
              <div>
                <button
                  className="backButton"
                  onClick={() => {
                    console.log("Modal closed!");
                    close();
                  }}
                >
                  Cancel
                </button>
                <br />
                <br />
              </div>
            </div>
          )}
        </Popup>
      </div>
    );
  }
}

export default AssignHeadPopup;
