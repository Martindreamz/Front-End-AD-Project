import React, { Component } from "react";
import './InventoryTable.css';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Link } from "@material-ui/core";

const Details = props => {
    return (
        <table className="requisitionTable">
            <tr className="tableHeader">
                <th>Description</th>
                <th>Quantity</th>
                <th>Unit</th>
                <th>Status</th>
            </tr>
            <tr>
                {props.hisData.map(item => {
                    return(
                        <td>{item.Description}</td>
                        // <td>{item.Quantity}</td>
                        // <td>{item.Unit}</td>
                        // <td>{item.Status}</td>
                    )
                })}
            </tr>
        </table>
    );
}

class RequisitionHistoryTable extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        open: false
    }

    handleOpen = () => {
        this.setState({
            open: true
        })
       
    }

    handleClose = () => {
        this.setState({
            open: false
        })
       
    }

    render() {
        //mapping data 
        const hisRecord = this.props.reqData.map(item =>
            <tr className="tableRow">
                <td><Link onClick={this.handleOpen}>{item.ReqID}</Link>
                    <Dialog onClose={this.handleClose} open={this.state.open} className="dialogContent">
                        <DialogTitle onClose={this.handleClose}>
                            Requisition History Details
                        </DialogTitle>
                        <DialogContent dividers>
                            {/* <RequisitionHistoryDetails />                           */}
                           {Details}
                        </DialogContent>
                            <DialogActions>
                                <Button autoFocus onClick={this.handleClose} color="primary">
                                    Close
                                </Button>
                            </DialogActions>
                    </Dialog>
                </td>
                <td>{item.DateOfRequest}</td>
                <td>{item.Status}</td>
            </tr>
        )

        return (
            <table className="requisitionTable">
                <tr className="tableHeader">
                    <th>Requisition ID</th>
                    <th>Requested Date</th>
                    <th>Status</th>
                </tr>
                {hisRecord}
            </table>
        )
    }
}

export default RequisitionHistoryTable;