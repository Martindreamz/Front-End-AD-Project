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
            data: [],
            category: [],
            desc: [],

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
        this.setState({ showDescription: true, cat: selected })
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

    //Run once before render - lifecycle
    async componentDidMount() {
        //HTTP get request
        axios.get('https://localhost:5001/api/dept/stationery')
            .then(response => {
                const items = response.data.map(item => {
                    return {
                        Id: item.id,
                        category: item.category,
                        desc: item.desc,
                        inventoryQty: item.inventoryQty,
                        unit: item.unit
                    }
                });
                // const categoryName = [...new Set(items.map(item => item.category))]
                //const descName = [...new Set(items.map(item => item.desc))]
                //this.setState({ data: items, category: categoryName, desc: descName });
                this.setState(prevState => {
                    const categoryName = [...new Set(items.map(item => item.category))]
                    var data1 = []
                    categoryName.forEach(name => {
                        const categoryData = items.map(item => {
                            if (name == item.category) {
                                return item
                            }
                            return null
                        }).filter(item => item != null)
                        data1.push(categoryData)
                    })
                    return {
                        data: items,
                        desc: data1,
                        category: categoryName
                    }
                });

            })
    }

    render() {
        return (
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
                                        id={this.state.data.id}
                                        value={this.state.cat}
                                        open={this.state.openCat}
                                        onClose={this.closeCat}
                                        onOpen={this.catOpen}
                                        onChange={this.showCat}>
                                        {this.state.category.map((item, index) => <MenuItem value={index}>{item}</MenuItem>)}
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
                                            id={this.state.data.id}
                                            value={this.state.description}
                                            open={this.state.openDescription}
                                            onClose={this.closeDesc}
                                            onOpen={this.descOpen}
                                            onChange={this.showDesc}>
                                            {this.state.desc[Number(this.state.cat)].map(item => <MenuItem value={item.desc}>{item.desc}</MenuItem>)}
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
                                        <input id="qty" value={this.state.data.inventoryQty} type="number" min="0" max="9999" className="form-control" />
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


    }
}

export default RequisitionApplyForm;
