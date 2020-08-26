import React, { Component } from 'react';
import './StockAdjustmentPopup.css';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';


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

    
    handleChange (event) {
        
        const { name, value, id } = event.target
            this.setState({
                [name]: value
            })

        if (name == 'browser') {
            this.setState(prevState => {
                const item = prevState.data.find(item => item.desc == value)
                console.log('selected item', item)
                if (item != null) {
                    return { item: item }
                   
                }
           })

        }

        if (name == 'qty') {
            console.log('updating qty')
            this.setState(prevState => {
                const reorder = prevState.item;
                reorder.qty = value
                
                return { item: reorder }
            })
            

        }

        if (name == 'selectedSupplier') {
            this.setState(prevState => {
                const item = prevState.item
                if (item != null) {
                    console.log('not null')
                    item.selectedSupplier=value
                    return { item: item }
                }
            })

        }
    }



    render() {

        return(

            <div className="detailContainer">
                <div className="detailInnerContainer">
                    <HighlightOffIcon onClick={this.props.closePopup} />
                    <div className="col-sm-12 text-center">
                        
                        <h1>Add reorder item</h1>
                        
                        <div>
                            <table className="table">
                                <tbody className="popupTable"> 
                                <tr className="tableRow">
                                    <td>
                                        <label>Item Code:</label>
                                    </td>
                                    <td>
                                        {this.state.item != null && this.state.item.id} 
                                    </td>
                                </tr >

                                <tr className="tableRow">
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
                                <tr className="tableRow">
                                    <td>
                                        <label>Qty:</label>
                                    </td>
                                   
                                    <td>
                                        <input name="qty" type="number" onChange={this.handleChange} />
                                    </td>
                                </tr>
                                <tr className="tableRow">
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
                                <tr className="tableRow">
                                    <td>
                                        <label>Price:</label>
                                    </td>
                                    
                                        <td>
                                    $ {this.state.item.selectedSupplier != null && this.state.item.selectedSupplier.price}
                                    </td>
                                </tr>
                                <tr><td><button name="addNewItem" value={this.state.item} onClick={() => this.props.newItem(this.state.item)} >Add</button></td></tr>
                            </tbody>
                                    </table>
                    </div>
                </div>
                </div>
            </div>
        
    )}

               
}

export default PlaceOrderPopup;