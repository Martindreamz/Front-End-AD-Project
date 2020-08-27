import React, { Component} from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Header from "./Components/Headers/Header";
import Login from "./Components/Login";
import ReceivedGoods from "./Containers/ReceivedGoods";
import PlaceOrder from "./Containers/PlaceOrder";
import PurchaseOrderSubmit from "./Containers/PurchaseOrderSubmit";
import CheckInventory from "./Containers/CheckInventory";
import DiscrepancyList from "./Containers/DiscrepancyList";
import RequisitionForm from "./Containers/RequisitionForm";
import StoreMStockAdjustmentApproval from "./Containers/StoreMStockAdjustmentApproval";
import ManageDepartment from "./Containers/ManageDepartment";
import DepRepDisbursement from "./Containers/DepRepDisbursement";
import SupplierList from "./Containers/SupplierList";
import RequisitionHistoryDetailsView from "./Containers/RequisitionHistoryDetailsView";
import DisbursementList from "./Containers/DisbursementList";
import SupervisorStockAdjustmentApproval from "./Containers/SupervisorStockAdjustmentApproval";
import DisbursementByDeptList from "./Containers/DisbursementByDeptList";
import StockTrendAnalysis from "./Containers/StockTrendAnalysis";
import Home from './Containers/Home';
import ManageInventory from "./Containers/ManageInventory";
import Navigation from "./Navigation";

class App extends Component {
    constructor() {
        super()

        this.state = {
            identity: JSON.parse(sessionStorage.getItem("mySession"))
        }
    }

    render() {
        return (
            <div className="App">
                <Router>
                    <Switch>
                        <Route path="/" exact>
                            {this.state.identity != null ? (this.state.identity.role === "STAFF" || this.state.identity.role === "HEAD" ? (this.state.identity.role === "STAFF" ? < RequisitionForm /> : <ManageDepartment />) : < Home />) : < Login />}
                        </Route>
                        
                        <Route path="/DepRepDisbursement">
                            <DepRepDisbursement />
                        </Route>

                        <Route path="/disbursementList">
                            <DisbursementList />
                        </Route>
                        
                        
                    </Switch>
                </Router>
                {this.state.identity != null ? <Navigation role={this.state.identity.role} /> : null}
            </div>
        )
    }
}

export default App;
