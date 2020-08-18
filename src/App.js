import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import './App.css';
import Header from './Components/Headers/Header';
import Login from './Components/Login';
import RecievedGoods from './Containers/RecievedGoods';
import PlaceOrder from "./Containers/PlaceOrder"
import PurchaseOrderSubmit from "./Containers/PurchaseOrderSubmit"

function App() {
  return (
      <div className="App">
          <Router>
              <Switch>
                  <Route path='/' exact>
                      <Login />
                  </Route>
                  <Route path='/clerk'>
                      <Header />
                  </Route>
                  <Route path='/test'>
                      <RecievedGoods />
                  </Route>
                  <Route path='/placeOrder'>
                      <PlaceOrder />
                  </Route>
                  <Route path='/placeOrderSubmit'>
                      <PurchaseOrderSubmit />
                  </Route>
              </Switch>
          </Router>
      </div>
  );
}

export default App;
