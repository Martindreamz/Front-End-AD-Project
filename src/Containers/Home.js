import React, { Component } from 'react';
import Header from '../Components/Headers/Header';
import { Button } from '@material-ui/core';
import "./Home.css";

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
                    <div className="homeBody">
                        <Button>Stationery Retrieval</Button>
                        <Button>Disbursement List</Button>
                        <Button>Raise Purchase Order</Button>
                        <Button>Recieved Goods</Button>
                    </div>
                    :
                    null
                }
                {this.state.identity.role === 'STRSUPV' ?
                    <div className="homeBody">
                        <Button>Stock Adjustment Voucher Requests</Button>
                        <Button>View Trend Analysis</Button>
                    </div>
                    :
                    null
                }
                {this.state.identity.role === 'STRMGR' ?
                    <div className="homeBody">
                        <Button>Stock Adjustment Voucher Requests</Button>
                        <Button>View Supplier List</Button>
                        <Button>View Trend Analysis</Button>
                    </div>
                    :
                    null
                }
            </div>
        )
    }
}

export default Home;