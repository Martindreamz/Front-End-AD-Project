import React, { Component } from 'react';
import Header from '../Components/Headers/Header';
import { Button } from '@material-ui/core';
import "./Home.css";
import { domain } from '../Configurations/Config';

class Home extends Component {
    constructor() {
        super()

        this.state = {
            identity: JSON.parse(sessionStorage.getItem("mySession"))
        }
    }

    render() {
        return (
            <div>
                <Header />
                {this.state.identity.role === 'CLERK' ? 
                    <div className="homeBodyClerk">
                        <Button>Stationery Retrieval</Button>
                        <Button>Disbursement List</Button>
                        <Button onClick={() => window.location.href = domain + "placeOrder"}>Raise Purchase Order</Button>
                        <Button onClick={() => window.location.href = domain + "manageInventory"}>Manage Inventory</Button>
                        <Button onClick={() => window.location.href = domain + "receivedGoods"}>Received Goods</Button>
                    </div>
                    :
                    null
                }
                {this.state.identity.role === 'STRSUPV' ?
                    <div className="homeBodySup">
                        <Button onClick={() => window.location.href = domain + "supervisorAdjustReqList"}>Stock Adjustment Voucher Requests</Button>
                        <Button onClick={() => window.location.href = domain + "trend"}>View Trend Analysis</Button>
                    </div>
                    :
                    null
                }
                {this.state.identity.role === 'STRMGR' ?
                    <div className="homeBodyMgr">
                        <Button onClick={() => window.location.href = domain + "StoreMStockAdjustmentApproval"}>Stock Adjustment Voucher Requests</Button>
                        <Button onClick={() => window.location.href = domain + "supplier"}>View Supplier List</Button>
                        <Button onClick={() => window.location.href = domain + "trend"}>View Trend Analysis</Button>
                    </div>
                    :
                    null
                }
                {this.state.identity.role === 'HEAD' ?
                    <div className="homeBodyHead">
                        <Button onClick={() => window.location.href = domain + "requisitionForm"}>Request Items</Button>
                        <Button onClick={() => window.location.href = domain + "manager"}>Manage Department</Button>
                    </div>
                    :
                    null
                }
            </div>
        )
    }
}

export default Home;