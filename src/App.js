import React, { Component} from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Header from "./Components/Headers/Header";
import Login from "./Components/Login";
import RecievedGoods from "./Containers/RecievedGoods";
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
import StockTrendAnalysis from "./Containers/StockTrendAnalysis";
import Home from './Containers/Home';

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
                            {this.state.identity != null ? <Home /> : < Login />}
                        </Route>
                        <Route path="/home">
                            <Home />
                        </Route>
                        <Route path="/clerk">
                            <Header />
                        </Route>
                        <Route path="/test">
                            <RecievedGoods />
                        </Route>
                        <Route path="/requisitionForm">
                            <RequisitionForm />
                        </Route>
                        <Route path="/supplier">
                            <SupplierList />
                        </Route>
                        <Route path="/test1">
                            <CheckInventory />
                        </Route>
                        <Route path="/test2">
                            <DiscrepancyList />
                        </Route>
                        <Route path="/test3">
                            <StockTrendAnalysis />
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
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default App;
