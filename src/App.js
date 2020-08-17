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
import RequisitionForm from './Containers/RequisitionForm';

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
                    <Route path='/requisitionForm'>
                        <RequisitionForm />
                    </Route>
              </Switch>
             </Router>
            </div>
  );
}

export default App;
