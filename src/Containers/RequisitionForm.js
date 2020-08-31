import React, { Component } from "react";
import Header from '../Components/Headers/Header';
import { domain } from '../Configurations/Config';
import 'bootstrap/dist/css/bootstrap.min.css';
import RequisitionApplyForm from '../Components/RequisitionApplyForm';
import RequisitionHistoryDetailsView from "./RequisitionHistoryDetailsView";

class RequisitionForm extends React.Component {
    constructor() {
        super()
        this.state = {
            showReqList: false
        }
        this.goHistory = this.goHistory.bind(this)
    }

    goHistory(previousState) {
        this.setState({
            showReqList: previousState,
        });
    }

    render() {
        return (
            <div>
                <Header />
                {this.state.showReqList ?
                    <RequisitionHistoryDetailsView goHistory={this.goHistory} />
                    :
                    <div className="row" >
                        <RequisitionApplyForm isEdit={this.state.isEdit} data={this.state.dropdownData} category={this.state.category} goHistory={this.goHistory} />
                    </div>
                }
            </div>

        )
    }
}

export default RequisitionForm;