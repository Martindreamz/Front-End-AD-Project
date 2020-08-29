import React, { Component } from "react";
import Header from '../Components/Headers/Header';
import SupplierTable from '../Components/SupplierTable';
import { domain, api } from '../Configurations/Config';
import axios from 'axios';
import InventoryPopup from "../Components/InventoryPopup";
import 'bootstrap/dist/css/bootstrap.min.css';
import SupplierForm from '../Components/SupplierForm';
import ViewDisbursementByDept from "../Components/ViewDisbursementByDept";
import DisbursementList from "../Containers/DisbursementList";

class DisbursementByDeptList extends React.Component {
    constructor() {
        super()
        this.state = {
            //test data
            data: [],
            showItemDetail: false, 
            itemDetailData: [],
            deliveryInfo: [],
            collectionInfo:'',
        }
    }

    showList=()=>{
        this.setState({ showItemDetail: false,})
    }

    detailDisbursement = (item) =>{
        this.setState({ deliveryInfo: item });

        fetch(api + 'api/Store/getDisburseItemDetail', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
          }).then(res => res.json()).then(item => {
            this.setState({
                  showItemDetail: true,
                  itemDetailData : item
            })
              item.map(r => this.setState({ collectionInfo: r }))
          });
    }

    //Run once before render - lifecycle
    componentDidMount() {
        //HTTP get request
        axios.get(api + 'api/Store/getAllRequesterRow/' + JSON.parse(sessionStorage.getItem("mySession")).id)
            .then(response => {
                const items = response.data;
                this.setState({ data: items });
            })
    }

    render() {
        return (
        <div>
            <Header />
                {this.state.showItemDetail ?
                    <DisbursementList deliveryInfo={this.state.deliveryInfo} collectionInfo={this.state.collectionInfo} data={this.state.itemDetailData} showList={this.showList} />
                    : 
                <div className="container">
                    <div className="col-sm-12" >
                       <ViewDisbursementByDept data={this.state.data} detailDisbursement={this.detailDisbursement}/>
                    </div>
                </div> 
            }
        </div>
        )
    }
}

export default DisbursementByDeptList;