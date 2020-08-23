import React, { Component } from 'react';
import './ErrorPopup.css';
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
                        <p className="popupMessage">{this.props.message}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default ErrorPopup;