import React, { Component } from "react";
import Header from "../Components/Headers/Header";
import RequisitionHistoryDetailsView from "../Components/RequisitionHistoryDetailsView";


class RequisitionHistory extends Component {
    constructor() {
        super();
        this.state = {
            showHistory: true,
            class: "history",
        };
        this.changeView = this.changeView.bind(this);
    }

    changeView() {
        this.setState((prevState) => {
            return {
                showHistory: !prevState.showHistory,
            };
        });
        if (this.state.showHistory) {
            this.setState({ class: "history" });
        } else {
            this.setState({ class: "historyDetails" });
        }
    }

    render() {
        return (
            <div>
                <Header />

                <RequisitionHistoryDetailsView
                    showHistory={this.state.showHistory}
                />
                <div className={this.state.class}>
                    <button onClick={this.changeView}>
                        {this.state.showHistory
                            ? "Show History Details"
                            : "Show History"}
                    </button>
                </div>
            </div>
        );
    }
}

export default RequisitionHistory;
