import React, { Component } from "react";
import Popup from "reactjs-popup";
import "./InventoryTable.css";

class AssignRepPopup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rep: "",
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
  }

  openModal() {
    console.log("Popup called!");

    this.setState({ open: true });
    this.setState({ rep: this.props.department.rep });
  }

  closeModal() {
    this.setState({ open: false });
  }

  render() {
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
                <h4>{this.props.department.rep}</h4>
              </div>
              <br />
              <div className="dialogContent">
                <select
                  className="select-css"
                  value={this.state.rep}
                  onChange={this.handleRepInput}
                >
                  {this.props.employee.map((x) => {
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
