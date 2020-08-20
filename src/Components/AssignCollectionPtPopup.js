import React, { Component } from "react";
import Popup from "reactjs-popup";
import "./InventoryTable.css";

class AssignCollectionPtPopup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentCollectionPt: "",
      open: false,
    };

    this.handleDelegateInput = this.handleDelegateInput.bind(this);
    this.submit = this.submit.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    if (this.props.department.collectionId != null) {
      this.props.collectionInfo.map((x) => {
        if (x.id === this.props.department.collectionId) {
          this.setState({ currentCollectionPt: x.collectionPt });
        }
      });
    } else {
      this.setState({ currentCollectionPt: "No collection point assigned." });
    }
  }

  handleDelegateInput(event) {
    this.setState({ delegate: event.target.value });
  }

  submit() {}

  openModal() {
    console.log("Popup called!");
    this.setState({ open: true });
  }

  closeModal() {
    this.setState({ open: false });
  }

  render() {
    return (
      <div>
        <button className="manageButton" onClick={this.openModal}>
          {this.props.department.collectionId === null ? "Set" : "Change"}{" "}
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
                  {this.props.department.collectionId === null
                    ? "Select Stationery Collection Point"
                    : "Current Stationery Collection Point"}{" "}
                </h2>
                <h4>{this.state.currentCollectionPt}</h4>
              </div>
              <br />
              <div className="dialogContent">
                <div onChange={this.onChangeValue}>
                  {this.props.collectionInfo.map((x) => {
                    return (
                      <div>
                        <input
                          type="radio"
                          value={x.collectionPt}
                          checked={
                            x.collectionPt === this.state.currentCollectionPt
                          }
                          name="CollectionPt"
                        />{" "}
                        {x.collectionPt}
                      </div>
                    );
                  })}
                </div>
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
export default AssignCollectionPtPopup;
