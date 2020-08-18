// JavaScript source code

import React, { Component } from "react";
import PurchaseOrder from "../Components/PurchaseOrder";
import Header from "../Components/Headers/Header";
import "./general.css";
import Pdf from "react-to-pdf";
const ref = React.createRef();

class PurchaseOrderSubmit extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="tableBody">
          <div className="btn-group">
            <button class="button">Main Supplier</button>
            <button class="button">Sub supplier 1</button>
            <button class="button">Sub supplier 2</button>
          </div>
          <Pdf targetRef={ref} filename="PurchaseOrder.pdf">
            {({ toPdf }) => (
              <button class="button" onClick={toPdf}>
                Export
              </button>
            )}
          </Pdf>
          <div ref={ref}>
            <PurchaseOrder />
          </div>
        </div>
      </div>
    );
  }
}

export default PurchaseOrderSubmit;
