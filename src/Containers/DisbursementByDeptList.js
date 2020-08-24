import React, { Component } from "react";
import Header from '../Components/Headers/Header';
import SupplierTable from '../Components/SupplierTable';
import { domain } from '../Configurations/Config';
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
        }
    }

    detailDisbursement = (item) =>{
        this.setState({detailInfo:item});

        fetch('https://localhost:5001/api/Store/getDisburseItemDetail', {
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
          });
    }

    //Run once before render - lifecycle
    componentDidMount() {
        //HTTP get request
        axios.get('https://localhost:5001/api/Store/getAllRequesterRow')
            .then(response => {
                const items = response.data;
                this.setState({ data: items });
            })
    }

    render() {
        return (
        <div>
            <Header />
            <div className="container">
                <div className="row" >
                    {this.state.showItemDetail? <DisbursementList />: 
                      <ViewDisbursementByDept data={this.state.data} detailDisbursement={this.detailDisbursement}/>
                    }
                </div>
            </div>
        </div>
        )
    }
}

export default DisbursementByDeptList;