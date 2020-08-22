import React, { Component } from 'react';
import './StockAdjustmentPopup.css';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

class ErrorPopup extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <div className="popup">
                <div className="container">
                    <div className="popupInner">
                        <HighlightOffIcon onClick={this.props.closePopup} />
                        <p>{this.props.message}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default ErrorPopup;