import React, { Component } from "react";
import Header from "../Components/Headers/Header";
import StoreMStockAdjustmentApprovalTable from "../Components/StoreMStockAdjustmentApprovalTable";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import SupervisorDetailPopup from "../Components/SupervisorDetailPopup";
import SupervisorStockAdjustmentApprovalTable from "../Components/SupervisorStockAdjustmentApprovalTable";
import SupervisorStockAdjustmentSumTable from "../Components/SupervisorStockAdjustmentSumTable";
import StockAdjustmentPopup from "../Components/StockAdjustmentPopup";
import SupervisorCommmentPopup from "../Components/SupervisorCommmentPopup";
class SupervisorStockAdjustmentApproval extends Component {
    constructor() {
        super();
        this.state = {
            //test data
            data: [],
            isDataEmpty: false,
            popupData: [],
            detailApprovalData: [],
            displayPopup: false,
            displayDetailTable: false,
            detailInfo: [],
            voucherInfo: [],
            isShowCommentPopup: false,
            rejectItem: '',
        }
    }

    componentDidMount() {
        //HTTP get request
        axios.get('https://localhost:5001/api/Store/adjustmentList')
            .then(response => {
                const resdata = response.data
                this.setState({ data: resdata })
            })
    }
    componentDidUpdate(prevState) {
        if (prevState.data != this.state.data || prevState.isShowCommentPopup != this.state.isShowCommentPopup) {
            axios.get('https://localhost:5001/api/Store/adjustmentList')
                .then(response => {
                    const resdata = response.data
                    this.setState({ data: resdata })
                })
        }
    }

    showPopup = (item) => {
        fetch('https://localhost:5001/api/Store/issueVoucher', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        }).then(res => res.json()).then(itemList => {
            console.log(itemList);
            this.setState({
                displayPopup: true,
                popupData: itemList
            })
            itemList.map(item => this.setState({ voucherInfo: item }))
        });
    }
    rejectRequest = (item) => {
        this.setState({ isShowCommentPopup: true, rejectItem: item });
    }
    submitRejectComment = (comment) => {
        fetch('https://localhost:5001/api/Store/managerRejectRequest/' + comment, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.rejectItem)
        }).then(res => res.json()).then(itemList => {
            this.setState({
                isShowCommentPopup: false
            })
            //this.componentDidMount();
        });
        //this.componentDidMount();
    }
    showDetail = (item) => {
        this.setState({ detailInfo: item });
        fetch('https://localhost:5001/api/Store/getAllAdjustDetailLine', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        }).then(res => res.json()).then(item => {
            this.setState({
                displayDetailTable: true,
                displayPopup: false,
                detailApprovalData: item
            })
        });
    }
    closePopup = () => {
        this.setState({
            displayPopup: false,
            displayDetailTable: false,
            isShowCommentPopup: false
        })
        //this.componentDidMount();
    }

    render() {
        return (
            <div>
                <Header />
                {this.state.isShowCommentPopup ? <SupervisorCommmentPopup submitRejectComment={this.submitRejectComment} rejectItem={this.state.rejectItem} closePopup={this.closePopup} /> : null}
                {this.state.displayPopup ? <SupervisorDetailPopup popupData={this.state.popupData} voucherInfo={this.state.voucherInfo} closePopup={this.closePopup} /> : null}
                {this.state.displayDetailTable ? <SupervisorStockAdjustmentApprovalTable detailApprovalData={this.state.detailApprovalData} detailInfo={this.state.detailInfo} closePopup={this.closePopup} /> : null}
                <div className="inventoryBody mt-1">
                    {(this.state.data && this.state.data.length) ?
                        <SupervisorStockAdjustmentSumTable data={this.state.data} showDetail={this.showDetail} showPopup={this.showPopup} rejectRequest={this.rejectRequest} closePopup={this.closePopup} />
                        :
                        <div className="col-sm-6 mt-1"><p className="alert alert-primary"> No Stockadjustment request!</p></div>
                    }
                </div>
            </div>
        );
    }
}
export default SupervisorStockAdjustmentApproval;