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
<<<<<<< HEAD
import SupplierList from './Containers/SupplierList';
import CheckInventory from './Containers/CheckInventory';

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

                  <Route path='/supplier'>
                      <SupplierList />

                  <Route path='/test1'>
                      <CheckInventory />
                  </Route>
              </Switch>
          </Router>
      </div>
  );
}

export default App;
