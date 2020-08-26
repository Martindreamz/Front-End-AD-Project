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
                            {this.state.identity != null ? (this.state.identity.role === "STAFF" ? <RequisitionForm /> : < Home /> ) : < Login />}
                        </Route>
                        <Route path="/requisitionForm">
                            <RequisitionForm />
                        </Route>
                        <Route path="/supplier">
                            <SupplierList />
                        </Route>
                        <Route path="/test3">
                            <StockTrendAnalysis />
                        </Route>
                        <Route path="/test4">
                            <ManageInventory />
                        </Route>
                        <Route path="/test1">
                            <ReceivedGoods />
                        </Route>
                        <Route path="/home">
                            <Home />
                        </Route>
                        <Route path="/RequisitionHistoryDetailsView">
                            <RequisitionHistoryDetailsView />
                        </Route>
                        <Route path="/StoreMStockAdjustmentApproval">
                            <StoreMStockAdjustmentApproval />
                        </Route>
                        <Route path="/DepRepDisbursement">
                            <DepRepDisbursement />
                        </Route>
                        <Route path="/manager">
                            <ManageDepartment />
                        </Route>
                        <Route path="/placeOrder">
                            <PlaceOrder />
                        </Route>
                        <Route path="/placeOrderSubmit">
                            <PurchaseOrderSubmit />
                        </Route>

                        <Route path="/disbursementList">
                          <DisbursementList />
                        </Route>
                        <Route path="/supervisorAdjustReqList">
                          <SupervisorStockAdjustmentApproval />
                        </Route>
                        <Route path="/DisbursementByDeptList">
                          <DisbursementByDeptList />
                        </Route>
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default App;
