import React, { Component } from 'react';
import './InventoryPopup.css';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Axios from 'axios';

class PlaceOrderPopup extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            data: this.props.data,
            item: []
        }
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.setState({ data: this.props.data })
        console.log('this is from pop up', this.state.data)
    }

    

    //handle changing field value in fields
    handleChange (event) {
        console.log('handleChange!')
        console.log('from handle change', this.state.data)
        
        const { name, value, id } = event.target

        console.log('name', name, 'value', value)

            this.setState({
                [name]: value
            })

        if (name == 'browser') {
          // const item = this.props.data.find(item => item.desc = value)
            this.setState(prevState => {
                const item = prevState.data.find(item => item.desc = value)
                return {item:item}
           })

        }

        if(name=='qty') {

            this.setState(prevState => {
                const reorder = [...prevState.data];
                reorder = {
                    ...reorder,
                    [name]:value
                }
                return { item: reorder }
            })
            

        }

        
    }
    
    
    //Event Handling for submitting form
    submitForm = () => {
        
    }



    render() {
        
        return(

            <div className="popup">
                <div className="poPopupInner">
                    <div onChange={this.props.handleSubmit}>
                        <h1>Add reorder item</h1>
                        <HighlightOffIcon onClick={this.props.closePopup} />
                        <div>
                            <table>
                                <tr>
                                    <td>
                                        <label>Item Code:</label>
                                    </td>
                                    <td>
                                        {this.state.item != null && this.state.item.id} 
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <label>Description:</label>
                                    </td>
                                    <td>

                                        <input
                                            list="browsers"
                                            name="browser"
                                            id="browser"
                                            onChange={this.handleChange}
                                            placeholder="Select an item" />
                                        <datalist id="browsers">
                                            {this.props.data.map(item =>
                                                <option name="item" id={item.id} value={item.desc}/>
                                            )}
                                        </datalist>

                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>Qty:</label>
                                    </td>
                                   
                                    <td>
                                        <input name="qty" type="number" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>Supplier:</label>
                                    </td>
                                    <td>
                                        {this.state.item.id != null &&
                                            < select onChange={this.handleChange} name="selectedSupplier">
                                            {this.state.item.supplierItems.map(sitem =>
                                                <option value={sitem}>{sitem.supplierName}</option>
                                                )}
                                            </select>
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>Price:</label>
                                    </td>
                                    <td>
                                        {this.state.item.selectedSupplier != null && this.item.selectedSupplier.price}
                                    </td>
                                </tr>
                                <tr><td><button name="addNewItem" value={this.state.item} >Add</button></td></tr>
                            </table>
                    </div>
                </div>
                </div>
            </div>
        
    )}

               
}

export default PlaceOrderPopup;