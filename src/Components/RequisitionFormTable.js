import React, { Component } from "react";
import './InventoryTable.css';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


const styles = {
    button: {
        display: 'block',
        //marginTop: theme.spacing(2),
    },
    formControl: {
        //margin: theme.spacing(1),
        minWidth: 120,
    }
}

class RequisitionFormTable extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        cat: null,
        openCat: false
    }

    showCat = (event) => {
        this.setState({
            cat: event.target.value,
            //openCat: true
        });
    }

    closeCat = () => {
        this.setState({
            openCat: false
        })
    }

    catOpen = () => {
        this.setState({
            openCat: true
        })
    }

    render() {
        //mapping data 
        const ReqItem = this.props.reqData.map(item =>
            <tr className="tableRow">
                <td>
                    <InputLabel id="demo-controlled-open-select-label">Category</InputLabel>
                    <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        value={this.state.cat}
                        open={this.state.catOpen}
                        onClose={this.closeCat}
                        onChange={this.state.showCat}>
                        <MenuItem>{item.category}</MenuItem>
                    </Select>
                </td>
                <td>{item.description}</td>
                <td>{item.quantity}</td>
                <td>{item.unit}</td>
            </tr>
        )

        return (
            <table className="requisitionTable">
                <tr className="tableHeader">
                    <th>Category</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Unit</th>
                </tr>
                {ReqItem}
            </table>
        )
    }
}

export default RequisitionFormTable;