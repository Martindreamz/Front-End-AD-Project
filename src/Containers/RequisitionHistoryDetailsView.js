import React, { Component } from "react";
import RequisitionHistory from "../Components/RequisitionHistory";
import RequisitionHistoryDetails from "../Components/RequisitionHistoryDetails";
import { domain, api } from '../Configurations/Config';

class RequisitionHistoryDetailsView extends Component {
    constructor() {
        super();
        this.state = {
            details: [],
            hisDetailsData: [],
            showHistoryDetails: false,
            showHistory: true,
            detailInfo: '',
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
            showHistory: true,
        });
    }

    showHisDetail = (item) => {
        this.setState({ detailInfo: item });

        fetch(api + 'api/dept/getAllItemList', {
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
                                <RequisitionHistoryDetails details={this.state.hisDetailsData} detailInfo={this.state.detailInfo}/>
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
