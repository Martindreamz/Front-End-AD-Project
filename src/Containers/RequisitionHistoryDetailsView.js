import React, { Component } from "react";
import RequisitionHistory from "../Components/RequisitionHistory";
import RequisitionHistoryDetails from "../Components/RequisitionHistoryDetails";
import Header from '../Components/Headers/Header';

class RequisitionHistoryDetailsView extends Component {
    constructor() {
        super();
        this.state = {
            details: [],
            showHistoryDetails: false,
            showHistory: true,
        };
        this.historyDetails = this.historyDetails.bind(this)
        this.changeView = this.changeView.bind(this);
    }

    historyDetails(details) {
        this.setState({
            details: details,
            showHistoryDetails: true
        });
    }

    changeView() {
        this.setState({
            showHistoryDetails: false,
            showHistory: true
        });
    }

    render() {
        return (
            <div>
            <Header />
            <div className="container">
                <div className="row" >
                    {(this.state.showHistory == true && this.state.showHistoryDetails == false) ?
                        <div className="col-sm-12  ">
                            <h1>History</h1>
                            <RequisitionHistory historyDetails={this.historyDetails} />
                        </div>
                        : null
                    }
                    {(this.state.showHistoryDetails == true) ?
                        <div className="col-sm-12  ">
                            <h1>History Details</h1>
                                <RequisitionHistoryDetails details={this.state.details} />
                                <button className="btn btn-warning mt-1" onClick={() => this.changeView(this.state.showHistory)}>
                                    BACK
                                </button>
                        </div>
                        : null
                    }
                </div>
            </div>
            </div>
           )
    }
}

export default RequisitionHistoryDetailsView;
