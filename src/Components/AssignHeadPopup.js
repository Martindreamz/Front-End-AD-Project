import React, { Component } from "react";
import Popup from "reactjs-popup";
import "./InventoryTable.css";

class AssignHeadPopup extends Component {
  constructor() {
    super();
    this.state = {
      checked: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.setState({ checked: !this.state.checked });
  }

  render() {
    return (
      <Popup trigger={<button className="manageButton"> Manage </button>} modal>
        {(close) => (
          <div className="popupDialog">
            <a className="close" onClick={close}>
              &times;
            </a>
            <div className="dialogHeader">
              <label class="switch">
                <input type="checkbox" onChange={this.handleChange} />
                <span class="slider round"></span>
              </label>
              <p>Delegate Mode</p>
            </div>
            <br />
            {this.state.checked ? (
              <div className="dialogContent">
                <form>
                  <select className="select-css" id="delegate" name="delegate">
                    <option value="Bianca">Bianca</option>
                    <option value="Daryl">Daryl</option>
                    <option value="Jane">Jane</option>
                    <option value="Martin">Martin</option>
                  </select>
                  <p>Start Date:</p>
                  <input type="date" id="startDate" name="startDate" />
                  <p>End Date:</p>
                  <input type="date" id="endDate" name="endDate" />
                  <br />
                  <input type="reset" value="Clear"></input>
                  <input type="submit"></input>
                </form>
              </div>
            ) : (
              <p>No assigned Department Delegate!</p>
            )}
          </div>
        )}
      </Popup>
    );
  }
}
export default AssignHeadPopup;
