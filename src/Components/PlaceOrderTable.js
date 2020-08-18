import React, { Component } from "react"
import './InventoryTable.css';
//import CurrencyFormat from 'react-currency-format';


class PlaceOrderTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: {},
            selectAll: 2,
            items: this.props.data
          
        }
        this.handleChange = this.handleChange.bind(this)
        this.selectAll = this.selectAll.bind(this)
    }

    handleChange(event) {
        const { name, value, type, checked } = event.target
        //type === "checkbox" ? this.setState({ [name]: checked }) : this.setState({ [name]: value })

        const newSelected = Object.assign({}, this.state.selected);
        newSelected[value] = !this.state.selected[value];
        this.setState({
            selected: newSelected,
            selectAll:2
        })
    }

    selectAll() {
        let newSelected = {};
        if (this.state.selectAll === 0) {
            this.state.items.map(x => {
                newSelected[x.itemCode] = true;
            })
        }

        this.setState({
            selected: newSelected,
            selectAll: this.state.selectAll===0?1:0
        })


    }

    render() {
        var CurrencyFormat = require('react-currency-format')
        const orderItem = this.props.data.map(item =>
            <tr className="tableRow" >
                <td><input
                    name="chkbox"
                    type="checkbox"
                    checked={this.state.selected[item.itemCode]===true}
                    value={item.itemCode}
                    onChange={this.handleChange}
                    /></td>
                <td>{item.itemCode}</td>
                <td>{item.desc}</td>
                <td>{item.reOrderQty}</td>
                <td><CurrencyFormat value={item.price} decimalScale={2} fixedDecimalScale={true} displayType={'text'} prefix={'$'} /> /{item.unit}</td>
                <td><CurrencyFormat value={item.price * item.reOrderQty} decimalScale={2} fixedDecimalScale={true} displayType={'text'} prefix={'$'} /></td>
                <td>{item.supplier}</td>
            </tr>

        )




        return (

            <table className="inventoryTable">
                <thead className="tableHeader">
                    <th><input
                        name="chkboxAll"
                        type="checkbox"
                        checked={this.state.selectAll===1}
                        onChange={this.selectAll}
                    /></th>
                    <th>Item Code</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Amount</th>
                    <th>Supplier</th>
                </thead>
                <tbody>
                    {orderItem}
                    </tbody>
                </table>


        )


    }
}

export default PlaceOrderTable