import React from 'react';
import './StockAdjustmentPopup.css';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Moment from 'moment';

class StockAdjustmentPopup extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const tableData = this.props.voucherData.map(item =>
            <tr className="tableRow">
                <td>{item.stockAdustmentDetailId}</td>
                <td>{item.quantity}</td>
                <td>{(item.amount).toFixed(2)}</td>
                <td>{item.reason}</td>
            </tr>
        )

        return (
            <div className="detailContainer">
                <div className="detailInnerContainer">
                        <HighlightOffIcon onClick={this.props.closePopup} />
                        <div className="col-sm-12">
                            <div className="col-sm-8">
                            <p>Voucher no:{this.props.voucherInfo.vocNo}</p>
                            <p>Date:{Moment(this.props.voucherInfo.date).format('DD-MM-YYYY')}</p>
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
                            <tbody className="popupTable">  
                                {tableData}
                            </tbody>
                            </table>
                        </div>
                </div>
            </div>
        )
    }
}

export default StockAdjustmentPopup;