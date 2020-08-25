import React, { Component } from "react";
import Popup from "reactjs-popup";
import "./InventoryTable.css";

class AssignRepPopup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rep: "",
      availEmployees: null,
      open: false,
    };

    this.handleRepInput = this.handleRepInput.bind(this);
    this.submit = this.submit.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleRepInput(event) {
    this.setState({ rep: event.target.value });
  }

  submit() {
    this.props.handleRepSubmit(this.state.rep);
    this.setState({ open: false });
  }

  openModal() {
    this.setState({ open: true });
    this.props.employee.map((x) => {
      if (x.role === "REPRESENTATIVE") {
        this.setState({ rep: x.name });
      }
    });

    let empList = [];
    this.props.employee.map((x) => {
      if (x.role === "STAFF" || x.role === "REPRESENTATIVE") {
        empList.push(x);
      }
    });
    this.setState({ availEmployees: empList });
  }

  closeModal() {
    this.setState({ open: false });
  }

  render() {
    let deptRep = "No Department Representative assigned.";
    this.props.employee.map((x) => {
      if (x.role === "REPRESENTATIVE") {
        deptRep = x.name;
      }
    });

    return (
      <div>
        <button className="manageButton" onClick={this.openModal}>
          {this.props.department.rep === "" ? "Assign" : "Change"}{" "}
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
                  {this.props.department.rep === ""
                    ? "Assign Representative"
                    : "Current Representative"}{" "}
                </h2>
                <h4>{deptRep}</h4>
              </div>
              <br />
              <div className="dialogContent">
                <select
                  className="select-css"
                  value={this.state.rep}
                  onChange={this.handleRepInput}
                >
                  {this.state.availEmployees.map((x) => {
                    return <option value={x.name}>{x.name}</option>;
                  })}
                </select>
              </div>
              <br />
              <div className="popupButtons">
                <button className="greenButton" onClick={this.submit}>
                  Submit
                </button>
              </div>
            </div>
          )}
        </Popup>
      </div>
    );
  }
}

export default AssignRepPopup;
