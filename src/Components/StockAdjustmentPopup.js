import React, { Component } from 'react';
import './InventoryPopup.css';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

class InventoryPopup extends React.Component {
    constructor(props) {
        super(props)

    }

   
    render() {
        const tableData = this.props.popupData.map(item => 
            <tr>
                <td>item.id</td>
                <td>item.quantity</td>
                <td>item.amount</td>
                <td>item.reason</td>
            </tr>
        )
        return (
            <div className="popup">
                <div className="popupInner">
                    <HighlightOffIcon onClick={this.props.closePopup} />
                    <table>
                        <tr>
                            <th>Item Code</th>
                            <th>Quantity Adjusted</th>
                            <th>Amount</th>
                            <th>Reason</th>
                        </tr>
                        {tableData}
                    </table>
                </div>
            </div>
        )
    }
}

export default InventoryPopup;