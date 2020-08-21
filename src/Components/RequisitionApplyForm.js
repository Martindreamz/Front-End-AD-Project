import React, { useState, createRef, useEffect, Component } from 'react';
import Header from '../Components/Headers/Header';
import axios from 'axios';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import './InventoryTable.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Label } from 'reactstrap';

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
            this.state.currentFormObj = this.requestData;
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
        
    }

    render() {
        const ReqItem = this.state.requestData.map(item =>
            <div class="container .bg-light" >
                <div class="row">
                    <div class="col-md-12 mx-auto text-center">
                        <p class="display-4">Requisition Form</p>
                    </div>
                    <div class="col-md-12">
                        <form>
                            <div class="form-group row">
                                <div class="col-sm-12">
                                    <label class="col-sm-6">Category</label>
                                    <Select
                                        class="col-sm-6"
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
                                <div class="col-sm-12">
                                    <label class="col-sm-6">Description</label>
                                    {this.state.showDescription ?
                                        <Select
                                            class="col-sm-6"
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
                                <div class="col-sm-12">
                                    <label class="col-sm-6">Quantity</label>
                                    {this.state.showQtyUnit ?
                                        <input id={item.id} type="number" min="0" max="9999" class="col-sm-6" />
                                        :
                                        null
                                    }
                                </div>
                                <div class="col-sm-12">
                                    <label class="col-sm-6">Unit</label>
                                    {this.state.showQtyUnit ?
                                        <Label class="col-sm-6">Each</Label> : null}
                                </div>
                            </div>

                            <div class="col-sm-12">
                            <button type="button" id="submit"
                                class="btn btn-primary px-4 float-right mr-1"
                                    onClick={this.save}> Submit </button>
                                </div>
                        </form>
                    </div>
                </div>
            </div>
        )

        return (
            <div>
                    {ReqItem}
            </div>
        )
    }
}

export default RequisitionApplyForm;
