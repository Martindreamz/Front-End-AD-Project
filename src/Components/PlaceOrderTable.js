import React, { Component, createRef } from "react";
import "./InventoryTable.css";
import CurrencyFormat from "react-currency-format";
import { AddCircle, RemoveCircle } from "@material-ui/icons";

class PlaceOrderTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: {},
            selectAll: 2,
            onEdit: this.props.onEdit
        };
        this.handleChange = this.handleChange.bind(this);
        this.selectAll = this.selectAll.bind(this);
    }

    handleChange(event) {
        const { name, value, type, checked } = event.target;

        if ([name] === "suppliers") {
            //reorder supplier list

        }

        if ([name] === "chkbox") {
            const newSelected = Object.assign({}, this.state.selected);
            newSelected[value] = !this.state.selected[value];

            this.setState({
                selected: newSelected,
                selectAll: 0,
            });
            //send data to parent
            this.props.onSelect(newSelected);
        }

        //type === "checkbox" ? this.setState({ [name]: checked }) : this.setState({ [name]: value })
    }



    componentDidMount() {
        this.setState({ selected: {}})

    }

    selectAll() {
        let newSelected = {};
        if (this.state.selectAll === 0) {
            this.props.data.map((item) => {
                newSelected[item.id] = true;
            });
        }

        this.setState({
            selected: newSelected,
            selectAll: this.state.selectAll === 0 ? 1 : 0,
        });
        //send data to parent
        this.props.onSelect(newSelected);
    }

    render() {
        var CurrencyFormat = require("react-currency-format");
        const orderItem = this.props.data.map((item) => (

            <tr className="tableRow" key={item.id}>
                <td>
                    <input
                        name="chkbox"
                        type="checkbox"
                        checked={this.state.selected[item.id] === true}
                        value={item.id}
                        onChange={this.handleChange}
                    />
                </td>
                <td>{item.stationery.id}</td>
                <td>{item.stationery.desc}</td>
                <td> {this.props.onEdit ?<AddCircle/>:null}
                    {item.stationery.reOrderQty}
                    {this.props.onEdit ? <RemoveCircle /> : null}
                </td>
                <td>
                    <CurrencyFormat
                        value={item.suppliers==null?0:item.suppliers[0].supplierItems.map(x => x.id === item.stationery.id ? x.price : null) * 1}
                        decimalScale={2}
                        fixedDecimalScale={true}
                        displayType={"text"}
                        prefix={"$"}
                    />
                    /
                    {item.suppliers == null ?0:item.suppliers[0].supplierItems.map(x => x.id === item.stationery.id ? x.unit : null)}
                </td>
                <td>
                    <CurrencyFormat
                        value={item.suppliers === null ?0:item.suppliers[0].supplierItems.map(x => x.id === item.stationery.id ? x.price : null) * item.stationery.reOrderQty}
                        decimalScale={2}
                        fixedDecimalScale={true}
                        displayType={"text"}
                        prefix={"$"}
                    />
                </td>
                <td>
                    {this.props.onEdit ?
                        <select name="suppliers" value={item.suppliers[0]} onChange={this.handleChange}>
                            {item.suppliers.map(supplier => (
                                <option value={supplier}>{supplier.name}</option>
                                ))}
                        </select>
                        : 
                    item.suppliers === null ? "" : item.suppliers[0].name}
                </td>
            </tr>
        ));

        return (
            <table className="inventoryTable">
                <thead className="tableHeader">
                    <tr>
                    <th>
                        <input
                            name="chkboxAll"
                            type="checkbox"
                            checked={this.state.selectAll === 1}
                            onChange={this.selectAll}
                        />
                    </th>
                    <th>Item Code</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Amount</th>
                        <th>Supplier</th>
                        </tr>
                </thead>
                <tbody>{orderItem}</tbody>
            </table>
        );
    }
}

export default PlaceOrderTable;
