import React, { Component } from 'react';
import './InventoryPopup.css';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

class InventoryPopup extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            data: props.data
        }
    }

    //handle changing field value in fields
    handleUpdatedData = (event) => {
        let nameChange = event.target.value;
        if (event.target.id === "itemName") {
            this.setState(prevState => {
                const data = prevState.data;
                return {
                    data: {
                        ...data,
                        name: nameChange
                    }
                }
            })
        }
    }

    render() {
        return (
            <div className="popup">
                <div className="popupInner">
                    <form className="form" onChange={this.handleUpdatedData}>
                        <h1>Inventory Record</h1>
                        <HighlightOffIcon onClick={this.props.closePopup} />
                        <div className="formSection">
                            <fieldset>
                                Item Code:
                                <input type="text" id="itemCode" value={this.state.data.id} />
                            </fieldset>
                            <fieldset>
                                Item Category:
                                <input type="text" id="itemName" value={this.state.data.category} />
                            </fieldset>
                        </div>
                        <fieldset>
                            Item Name:
                            <input type="text" id="itemName" value={this.state.data.name} />
                        </fieldset>
                        <fieldset>
                        Quantity:
                            <input type="number" min="1" max="99" id="qty" value={this.props.data.quantity} />
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