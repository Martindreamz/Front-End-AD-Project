import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Header from "./Components/Headers/Header";
import Login from "./Components/Login";
import RecievedGoods from "./Containers/RecievedGoods";
import SupplierList from "./Containers/SupplierList";
import CheckInventory from "./Containers/CheckInventory";
import DiscrepancyList from "./Containers/DiscrepancyList";
import RequisitionForm from "./Containers/RequisitionForm";
import StockAdjustmentApproval from "./Containers/StockAdjustmentApproval";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Login />
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

                  <Route path='/supplier'>
                      <SupplierList />
                  </Route>

          <Route path="/test1">
            <CheckInventory />
          </Route>
          <Route path="/test2">
            <DiscrepancyList />
          </Route>
          <Route path="/requisitionForm">
            <RequisitionForm />
          </Route>
          <Route path="/stockAdjustmentApproval">
            <StockAdjustmentApproval />
                  </Route>
                  <Route path='/manager'>
                      <ManageDepartment />
                  </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
