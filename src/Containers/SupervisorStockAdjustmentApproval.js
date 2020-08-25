import React, { Component } from "react";
import Header from "../Components/Headers/Header";
import StoreMStockAdjustmentApprovalTable from "../Components/StoreMStockAdjustmentApprovalTable";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import SupervisorDetailPopup from "../Components/SupervisorDetailPopup";
import SupervisorStockAdjustmentApprovalTable from "../Components/SupervisorStockAdjustmentApprovalTable";
import SupervisorStockAdjustmentSumTable from "../Components/SupervisorStockAdjustmentSumTable";
import StockAdjustmentPopup from "../Components/StockAdjustmentPopup";

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
        fetch('https://localhost:5001/api/Store/supervisorissueVoucher', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
          }).then(res => res.json()).then(itemList => {
            console.log(itemList);
            this.setState({
                  displayPopup: true,
                  popupData : itemList
             })
            itemList.map(item => this.setState({voucherInfo:item}))
          });
        
    }

    rejectRequest = (item) =>{
        fetch('https://localhost:5001/api/Store/supervisorRejectRequest', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
          }).then(res => res.json()).then(itemList => {
              this.componentDidMount();
          });
        this.componentDidMount();
    }

    showDetail = (item) =>{
        this.setState({detailInfo:item});

        fetch('https://localhost:5001/api/Store/getAllSupervisorAdjustDetailLine', {
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
      axios.get('https://localhost:5001/api/Store/supervisorAdjustment')
            .then(response => {
                const resdata =response.data
                this.setState({ data: resdata})
      })
    }
   
  render() {
    
    return ( 
      <div>
            <Header />
            {this.state.displayPopup ? <StockAdjustmentPopup  popupData={this.state.popupData} voucherInfo={this.state.voucherInfo} closePopup={this.closePopup}/> : null}
            {this.state.displayDetailTable? <SupervisorStockAdjustmentApprovalTable detailApprovalData={this.state.detailApprovalData} detailInfo={this.state.detailInfo} closePopup={this.closePopup}/>:null}
            <div className="inventoryBody mt-1">
                {(this.state.data && this.state.data.length)? 
                  <SupervisorStockAdjustmentSumTable data={this.state.data} showDetail={this.showDetail} showPopup={this.showPopup} rejectRequest={this.rejectRequest} closePopup={this.closePopup}/> 
                  :
                  <div className="col-sm-6 mt-1"><p className="alert alert-primary"> No Stockadjustment request!</p></div>
                }
            </div>
      </div>
    );
  }
}

export default SupervisorStockAdjustmentApproval;
