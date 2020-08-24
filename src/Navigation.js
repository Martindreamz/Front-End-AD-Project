import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function Navigation(props) {
    <Router>
        {/*Route for clerk*/}
        {this.props.role === 'CLERK' ?
            <Switch>
                <Route path="/clerk">
                    <Header />
                </Route>
                <Route path="/test">
                    <RecievedGoods />
                </Route>
                <Route path="/test1">
                    <CheckInventory />
                </Route>
                <Route path="/test2">
                    <DiscrepancyList />
                </Route>
            </Switch>
            :
            null
        }
        {/*Route for Store Supervisor*/}
        {this.props.role === 'STRSUPV' ?
            <Switch>
                <Route path="/StoreMStockAdjustmentApproval">
                    <StoreMStockAdjustmentApproval />
                </Route>
            </Switch>
            :
            null
        }
        {/*Route for Store Manager*/}
        {this.props.role === 'STRMGR' ?
            <Switch>
               
            </Switch>
            :
            null
        }
        {/*Route for Dept Head*/}
        {this.props.role === 'HEAD' ?
            <Switch>

            </Switch>
            :
            null
        }
        {/*Route for Dept Staff*/}
        {this.props.role === 'STAFF' ?
            <Switch>

            </Switch>
            :
            null
        }
        {/*Route for Dept Rep*/}
        {this.props.role === 'REPRESENTATIVE' ?
            <Switch>

            </Switch>
            :
            null
        }
    </Router>
}

export default Navigation;