import React, { Component } from "react";
import Popup from "reactjs-popup";
import "./InventoryTable.css";

class AssignCollectionPtPopup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      updatedCollectionPt: "",
      open: false,
    };

    this.submit = this.submit.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleCollectionPtInput = this.handleCollectionPtInput.bind(this);
  }

  handleCollectionPtInput(event) {
    this.setState({ updatedCollectionPt: event.target.value });
  }

  submit() {
    this.props.handleCollectionSubmit(this.state.updatedCollectionPt);
    this.setState({ open: false });
  }

  openModal() {
    this.setState({ open: true });
  }

  closeModal() {
    this.setState({ open: false });
  }

  render() {
    return (
      <div>
        <button className="manageButton" onClick={this.openModal}>
          {this.props.department.collection === null ? "Set" : "Change"}{" "}
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
                  {this.props.department.collection === null
                    ? "Select Stationery Collection Point"
                    : "Current Stationery Collection Point"}
                </h2>
                <h4>{this.props.collectionPoint}</h4>
              </div>
              <br />
              <div className="dialogContent">
                {this.props.collectionInfo.map((x) => {
                  return (
                    <div onChange={this.handleCollectionPtInput}>
                      <input
                        type="radio"
                        value={x.collectionPoint}
                        name="CollectionPoint"
                      />{" "}
                      <span>{x.collectionPoint}</span>
                    </div>
                  );
                })}
              </div>
              <div className="popupButtons">
                <button className="greenButton" onClick={this.submit}>
                  Submit
                </button>
              </div>
              <br />
            </div>
          )}
        </Popup>
      </div>
    );
  }
}

export default AssignCollectionPtPopup;
