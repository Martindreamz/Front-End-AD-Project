import React, { Component } from 'react';
import './StockAdjustmentPopup.css';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

class SupervisorDetailPopup extends React.Component {
    constructor(props) {
        super(props)
        this.state={popupData:[]}
    }

    render() {
        const tableData = this.props.popupData.map(item =>
            <tr className="tableRow">
                <td>{item.stockAdustmentDetailId}</td>
                <td>{item.quantity}</td>
                <td>{item.amount}</td>
                <td>{item.reason}</td>
            </tr>
        )

        return (
            <div className="">
                <div className="container">
                    <div className="popupInner">
                        <HighlightOffIcon onClick={this.props.closePopup} />
                        <div className="col-sm-12">
                            <div className="col-sm-8">
                            <p>Voucher no:{this.props.voucherInfo.vocNo}</p>
                            <p>Date:{this.props.voucherInfo.date}</p>
                            </div>
                        </div>
                        <div  className="col-sm-12 text-center">
                            <p>Raised By</p>
                            <p>Name: {this.props.voucherInfo.empName}</p>
                        </div>
                        <div  className="col-sm-12 text-center">
                            <table className="table">
                                <tr className="tableRow">
                                    <th>Item Code</th>
                                    <th>Quantity Adjusted</th>
                                    <th>Amount</th>
                                    <th>Reason</th>
                                </tr>
                            {tableData}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SupervisorDetailPopup;