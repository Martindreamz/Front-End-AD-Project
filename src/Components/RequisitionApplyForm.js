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
                    <div class="col-md-12 mx-auto" className="reqForm">
                        <form>
                            <div class="form-group row">
                                <div class="col-sm-6" className="colReqForm">
                                    <label>Category</label>
                                </div>
                                <div class="col-sm-6">
                                    <Select
                                        className="form-control"
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
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-6" className="colReqForm">
                                        <label>Description</label>
                                    </div>
                                    <div class="col-sm-6">
                                    {this.state.showDescription ?
                                        <Select
                                            className="form-control"
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
                                <div class="col-sm-6" className="colReqForm">
                                        <label>Quantity</label>
                                    </div>
                                    <div class="col-sm-6">
                                    {this.state.showQtyUnit ?
                                            <input id={item.id} type="number" min="0" max="9999" className="form-control" />
                                        :
                                        null
                                        }
                                    </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-6" className="colReqForm">  
                                        <label>Unit</label>
                                    </div>
                                    <div class="col-sm-6">  
                                    {this.state.showQtyUnit ?
                                            <Label>Each</Label> : null}
                                    </div>
                            </div>

                            <div class="col-sm-12">
                                <div class="col-sm-6"></div>
                                <div class="col-sm-6">  
                                <button type="button" id="submit"
                                    class="btn btn-primary" className="submitReqForm"
                                    onClick={this.save}> Submit </button>
                                </div>
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
