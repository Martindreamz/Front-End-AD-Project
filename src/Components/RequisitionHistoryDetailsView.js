import React, { Component } from "react";
import RequisitionHistory from "../Components/RequisitionHistory";
import RequisitionHistoryDetails from "../Components/RequisitionHistoryDetails";

class RequisitionHistoryDetailsView extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        if (this.props.showHistory) {
            return (
                <div className="inventoryBody">
                    <h1>History</h1>
                    <RequisitionHistory />
                </div>
            );
        }
        return (
            <div className="inventoryBody">
                <h1>History Details</h1>
                <RequisitionHistoryDetails />
            </div>
        );
    }
}

export default RequisitionHistoryDetailsView;
