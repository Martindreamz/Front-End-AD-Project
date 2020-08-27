import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
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
import ManageInventory from "./Containers/ManageInventory";

class Navigation extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Router>
                {/*Route for clerk*/}
                {this.props.role === 'CLERK' ?
                    <Switch>
                        <Route path="/manageInventory">
                            <ManageInventory />
                        </Route>
                        <Route path="/receivedGoods/:id" component={ReceivedGoods}>
                        </Route>
                        <Route path="/checkInventory">
                            <CheckInventory />
                        </Route>
                        <Route path="/discrepancyList/:id" component={DiscrepancyList}></Route>
                        <Route path="/placeOrder">
                            <PlaceOrder />
                        </Route>
                        <Route path="/placeOrderSubmit">
                            <PurchaseOrderSubmit />
                        </Route>
                        <Route path="/DisbursementByDeptList">
                            <DisbursementByDeptList />
                        </Route>
                    </Switch>
                    :
                    null
                }
                {/*Route for Store Supervisor*/}
                {this.props.role === 'STRSUPV' ?
                    <Switch>
                        <Route path="/supervisorAdjustReqList">
                            <SupervisorStockAdjustmentApproval />
                        </Route>
                        <Route path="/trend">
                            <StockTrendAnalysis />
                        </Route>
                    </Switch>
                    :
                    null
                }
                {/*Route for Store Manager*/}
                {this.props.role === 'STRMGR' ?
                    <Switch>
                        <Route path="/StoreMStockAdjustmentApproval">
                            <StoreMStockAdjustmentApproval />
                        </Route>
                        <Route path="/supplier">
                            <SupplierList />
                        </Route> y
                        <Route path="/trend">
                            <StockTrendAnalysis />
                        </Route>
                    </Switch>
                    :
                    null
                }
                {/*Route for Dept Head*/}
                {this.props.role === 'HEAD' ?
                    <Switch>
                        <Route path="/manager">
                            <ManageDepartment />
                        </Route>
                        <Route path="/requisitionForm">
                            <RequisitionForm />
                        </Route>
                    </Switch>
                    :
                    null
                }
                {/*Route for Dept Staff*/}
                {this.props.role === 'STAFF' ?
                    <Switch>
                        <Route path="/requisitionForm">
                            <RequisitionForm />
                        </Route>
                    </Switch>
                    :
                    null
                }
                {/*Route for Dept Rep*/}
                {this.props.role === 'REPRESENTATIVE' ?
                    <Switch>
                        <Route path="/DepRepDisbursement">
                            <DepRepDisbursement />
                        </Route>
                    </Switch>
                    :
                    null
                }
            </Router>    
        )
    }
  
}

export default Navigation;
