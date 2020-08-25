import React, { Component } from "react";
import Header from "../Components/Headers/Header";
import StoreMStockAdjustmentApprovalTable from "../Components/StoreMStockAdjustmentApprovalTable";
import axios from "axios";
import StockAdjustmentPopup from "../Components/StockAdjustmentPopup";
import StoreMgrStockAdjustmentSumTable from "../Components/StoreMgrStockAdjustmentSumTable";
import 'bootstrap/dist/css/bootstrap.min.css';

class StoreMStockAdjustmentApproval extends Component {
  constructor() {
    super();
    this.state = {
      //test data
        data: [],
        isDataEmpty: false,
        popupData: [],
        detailApprovalData: [],
        displayPopup: false,
        displayDetailTable:false,
        detailInfo: [],
        voucherInfo:[],
    }
  }

  //Run once before render - lifecycle
  componentDidMount() {
    //HTTP get request
    axios.get(/* api here */).then((response) => {
      const items = response.data;
      this.setState({ data: items });
    });
    }

   /* showPopup = (event) => {
        console.log(event)
        //post request with id to retrieve stock adjustment details
        this.setState({
            displayPopup: true
        })
    }*/

    showPopup = (item) =>{
        fetch('https://localhost:5001/api/Store/issueVoucher', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
          }).then(res => res.json()).then(itemList => {
            this.setState({
                  displayPopup: true,
                  popupData : itemList
             })
            itemList.map(item => this.setState({voucherInfo:item}))
          });
    }

    rejectRequest = (item) =>{
        fetch('https://localhost:5001/api/Store/managerRejectRequest', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
          }).then(res => res.json()).then(itemList => {
              this.componentDidMount();
          });
        
    }


    showDetail = (item) =>{
        this.setState({detailInfo:item});

        fetch('https://localhost:5001/api/Store/getAllAdjustDetailLine', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
          }).then(res => res.json()).then(item => {
            this.setState({
                  displayDetailTable: true,
                  detailApprovalData : item
             })
          });
    }

    closePopup = () => {
        this.setState({
            displayPopup: false,
            displayDetailTable: false
        })
        this.componentDidMount();
    }
    componentDidMount() {
        //HTTP get request
        axios.get('https://localhost:5001/api/Store/adjustmentList')
            .then(response => {
                const resdata =response.data
                this.setState({ data: resdata})
            })
    }

  render() {
    return (
      <div>
            <Header />
            {this.state.displayPopup ? < StockAdjustmentPopup popupData={this.state.popupData} voucherInfo={this.state.voucherInfo} closePopup={this.closePopup}/> : null}
            {this.state.displayDetailTable? <StoreMStockAdjustmentApprovalTable detailApprovalData={this.state.detailApprovalData} detailInfo={this.state.detailInfo} closePopup={this.closePopup}/>:null}
            <div className="inventoryBody mt-1">
               {(this.state.data && this.state.data.length)? 
                  <StoreMgrStockAdjustmentSumTable data={this.state.data} showDetail={this.showDetail} rejectRequest={this.rejectRequest} showPopup={this.showPopup} closePopup={this.closePopup}/>
                  :
                  <div className="col-sm-6 mt-1"><p className="alert alert-primary"> No Stockadjustment request!</p></div>
                }
              
            </div>
      </div>
    );
  }
}

export default StoreMStockAdjustmentApproval;
