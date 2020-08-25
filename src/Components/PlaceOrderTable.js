import React, { Component, createRef } from "react";
import "./InventoryTable.css";


class PlaceOrderTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: {},
            selectAll: 2,
            data: this.props.data
        };

    }


    componentDidMount() {
        this.setState({ data: this.props.data })
        
    }


    render() {
        var CurrencyFormat = require("react-currency-format");
        const orderItem = this.props.data != null &&
            this.props.data.map((item, index) => (
            
            <tr className="tableRow" key={item.id}>
                <td>
                    <input
                        name="select"
                        type="checkbox"
                        checked={this.props.selected[item.id] === true}
                        value={item.id}
                        onChange={event => this.props.addItem(event)}
                    />
                </td>
                <td>{item.id}</td>
                <td>{item.desc}</td>
                <td> {this.props.onEdit ?

                    <input type="number"
                        id="qty"
                        placeholder={item.qty}
                        name="qty"
                        onChange={event => this.props.handleChange(event, index)}
                    />
                    :
                     item.qty }
                    
                </td>
                <td>
                    <CurrencyFormat
                        value={item.selectedSupplier === null ? 0 : item.selectedSupplier.price}
                        decimalScale={2}
                        fixedDecimalScale={true}
                        displayType={"text"}
                        prefix={"$"}
                    />
                    /
                    {item.unit}
                </td>
                <td>
                    <CurrencyFormat
                        value={item.selectedSupplier === null ? 0 : item.selectedSupplier.price * item.qty}
                        decimalScale={2}
                        thousandSeparator={true} 
                        fixedDecimalScale={true}
                        displayType={"text"}
                        prefix={"$"}
                    />
                </td>
                <td>
                    

                    {this.props.onEdit? item.supplierItems === null ?
                        <p>No suppliers carrying item</p> :
                        <select
                            id={item.id}
                            name="selectedSupplier"
                            value={item.selectedSupplier}
                            onChange={event => this.props.handleChange(event,index)}>

                            {item.supplierItems.map(supplier => (
                                <option
                                    key={supplier.supplierId}
                                    value={supplier.supplierId}>
                                    {supplier.supplierName}
                                </option>
                            ))}
                        </select>
                        :
                        item.selectedSupplier.supplierName
                        }
                </td>
            </tr>
        ));

        return (
            this.props.data!=null&&
            <table className="placeOrderTable">
                <tr className="tableHeader">
                        <th >
                            <input
                                name="selectAll"
                                type="checkbox"
                                checked={this.props.all}
                                onChange={event => this.props.addItem(event)}
                            />
                        </th>
                        <th>Item Code</th>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Amount</th>
                        <th>Supplier</th>
                    </tr>
                <tbody className="tbody">{orderItem}</tbody>
            </table>
        );
    }
}

export default PlaceOrderTable;
