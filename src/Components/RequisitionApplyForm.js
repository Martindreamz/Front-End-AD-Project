import React, { useState, createRef, useEffect, Component } from 'react';
import Header from '../Components/Headers/Header';
import axios from 'axios';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import './InventoryTable.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class RequisitionApplyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requestData: [{
                id: "",
                category: "",
                description: "",
                quantity: "",
                unit: ""
            }
            ],
            message: '',
            currentFormObj: [],

            cat: '',
            openCat: false,

            showDescription: false,
            description: '',
            openDescription: false,

            showQtyUnit: false,

            add: false,

            showRow: false,
        };

        if (props.isEdit) {
            this.state.currentFormObj = props.editSupObj
        } else {
            this.state.currentFormObj = this.initialState;
        }
    }

    //Event Handling
    showCat = (event) => {
        const selected = event.target.value
        this.setState({
            cat: selected,
            showDescription: true
        });
    }

    closeCat = () => {
        this.setState({
            openCat: !this.state.openCat
        })
    }

    catOpen = () => {
        this.setState({
            openCat: !this.state.openCat
        })
    }

    showDesc = (event) => {
        const selected = event.target.value
        this.setState({
            description: selected,
            openDescription: !this.state.openDescription,
            showQtyUnit: true
        });
    }
    closeDesc = () => {
        this.setState({
            openDescription: !this.state.openDescription
        })
    }

    descOpen = () => {
        this.setState({
            openDescription: !this.state.openDescription
        })
    }

    save = () => {
        this.setState({

        })
        

        /*if (!this.props.isEdit) {
            fetch('https://localhost:5001/api/Store/saveSupplier', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(supplier)
            }).then(res => res.json()).then(tom => {
                this.setState({ message: 'New Supplier is Created Successfully' });
            });
        }
        else {
            axios.put('' + this.state.currentSupplierObj.id).then(result => {
                this.setState({ message: ' Supplier is Edited Successfully' });
            });
        }*/
    }

    render() {
        const ReqItem = this.state.requestData.map(item =>
            <div class="container .bg-light" >
                <div class="row">
                    <div class="col-md-12 mx-auto text-center">
                        <p class="display-4">Requisition Form</p>
                    </div>
                    <div class="col-md-12 mx-auto">
                        <form>
                            <div class="form-group row">
                                <div class="col-sm-6">
                                    <label for="supplierCode">Category</label>
                                    <Select
                                        labelId="demo-controlled-open-select-label"
                                        key={item.id}
                                        value={this.state.cat}
                                        open={this.state.openCat}
                                        onClose={this.closeCat}
                                        onOpen={this.catOpen}
                                        onChange={this.showCat}>
                                        {this.props.category.map((item, index) => <MenuItem value={index}>{item}</MenuItem>)}
                                    </Select>
                                </div>
                                <div class="col-sm-6">
                                    <label for="inputLastname">Description</label>
                                    {this.state.showDescription ?
                                        <Select
                                            labelId="demo-controlled-open-select-label"
                                            key={item.id}
                                            value={this.state.description}
                                            open={this.state.openDescription}
                                            onClose={this.closeDesc}
                                            onOpen={this.descOpen}
                                            onChange={this.showDesc}>
                                            {console.log(this.props.data[Number(this.state.cat)])}
                                            {this.props.data[Number(this.state.cat)].map(item => <MenuItem value={item}>{item.description}</MenuItem>)}
                                        </Select>
                                        : null
                                    }
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-6">
                                    <label for="name">Quantity</label>
                                    {this.state.showQtyUnit ?
                                        <td class="col-8">
                                            <input id={item.id} type="number" min="0" max="9999" />
                                        </td>
                                        :
                                        <td></td>
                                    }
                                </div>
                                <div class="col-sm-6">
                                    <label for="contactPerson">Unit</label>
                                    {this.state.showQtyUnit ?
                                        <td class="col-8">Each</td> : <td></td>}
                                </div>
                            </div>

                            <button type="button" id="supplier_post_submit"
                                class="btn btn-primary px-4 float-right mr-1"
                                onClick={this.save}> Submit </button>
                        </form>
                    </div>
                </div>
            </div>
        )

        return (
            <form>
                    {ReqItem}
            </form>
        )
    }
}

export default RequisitionApplyForm;
