import React, { Component } from "react";
import RequisitionHistory from "../Components/RequisitionHistory";
import RequisitionHistoryDetails from "../Components/RequisitionHistoryDetails";
import Header from '../Components/Headers/Header';
import RequisitionApplyForm from "../Components/RequisitionApplyForm";
import RequisitionForm from "./RequisitionForm";

class RequisitionHistoryDetailsView extends Component {
    constructor() {
        super();
        this.state = {
            details: [],
            hisDetailsData: [],
            showHistoryDetails: false,
            showHistory: true,
            detailInfo: '',
            showRequestForm: false,
            identity: JSON.parse(sessionStorage.getItem("mySession")),
            showApplyForm: false
        };
        this.historyDetails = this.historyDetails.bind(this)
        this.changeView = this.changeView.bind(this);
        this.goApplyForm = this.goApplyForm.bind(this)
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
            showHistory: true,
        });
    }

    goApplyForm(previousState) {
        this.setState({
            showApplyForm: previousState,
            //showForm: false
        });
    }

    showHisDetail = (item) => {
        this.setState({ detailInfo: item });

        fetch('https://localhost:5001/api/dept/getAllItemList', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        }).then(res => res.json()).then(item => {
            this.setState({
                hisDetailsData: item,
                showHistoryDetails: true
            })
            item.map(r => this.setState({ detailInfo: r }))
        });
    }

    render() {
        return (
            <div>

                <div className="container">
                    <div className="row" >
                        {(this.state.showHistory == true && this.state.showHistoryDetails == false ) ?
                            <div className="col-sm-12  ">
                                <h1>History</h1>
                                <RequisitionHistory historyDetails={this.showHisDetail} />

                            </div>
                            : null
                        }
                        {(this.state.showHistoryDetails == true) ?
                            <div className="col-sm-12  ">
                                <h1>History Details</h1>
                                <RequisitionHistoryDetails details={this.state.hisDetailsData} detailInfo={this.state.detailInfo} id={this.state.identity.id} />
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
