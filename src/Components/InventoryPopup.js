import React, { Component } from 'react';
import './InventoryPopup.css';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

class InventoryPopup extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="popup">
                <div className="popupInner">
                    <form className="form">
                        <h1>Inventory Record</h1>
                        <HighlightOffIcon onClick={this.props.closePopup} />
                        <div className="formSection">
                            <fieldset>
                                Item Code:
                                <input type="text" value={this.props.data.id} />
                            </fieldset>
                            <fieldset>
                                Item Name:
                                <input type="text" value={this.props.data.name} />
                            </fieldset>
                        </div>
                        <fieldset>
                            Quantity:
                            <input type="number" min="1" max="99" value={this.props.data.quantity} />
                        </fieldset>
                        <div className="formButtons">
                            <button>Delete</button>
                            <button>Save</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default InventoryPopup;