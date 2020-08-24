import React, { useState, createRef, useEffect, Component } from 'react';
import axios from 'axios';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import '../Components/InventoryTable.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Label } from 'reactstrap';
import Header from '../Components/Headers/Header';

class RequisitionApplyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            newData: [],
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

            isAdd: false
        };
        /*this.initialState = {
            id: '',
            category: '',
            desc: '',
            reqQty: ,
            unit: '',
        } */
        this.showCat = this.showCat.bind(this);
        this.closeCat = this.closeCat.bind(this);
        this.catOpen = this.catOpen.bind(this);
        this.showDesc = this.showDesc.bind(this);
        this.closeDesc = this.closeDesc.bind(this);
        this.descOpen = this.descOpen.bind(this);

        if (props.isEdit) {
            this.state.currentFormObj = props.editSupObj
        } else {
            this.state.currentFormObj = this.initialState;
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

    changeView() {
        this.setState({
            showReqList: true,
            showForm: false
        });
    }


    save = () => {
        let requestForm = {
            category: this.state.cat,
            desc: this.state.description,
            reqQty: this.refs.qtyRef.value,
            unit: "Each"
        }
        console.log(requestForm)
        this.setState({
            newData: [
                ...this.state.newData,
                {
                    category: this.state.cat,
                    desc: this.state.description,
                    reqQty: this.refs.qtyRef.value,
                    unit: "Each"
                }
            ]
        });
        this.setState({
            isAdd: true,
        })

    }

    saveRequisition = () => {
        console.log(this.state.newData)

        //if (!this.props.isEdit) {
        fetch('https://localhost:5001/api/Dept/ApplyRequisition', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.newData)

        }).then(res => res.json())
            .then(requestForm => {
                this.setState({ message: 'New requested item is successfully applied.' });
            });
        //}



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
                        {this.state.message == '' ? null :
                            <div class="alert alert-primary" role="alert">
                                {this.state.message}
                            </div>
                        }
                    </div>

                    <div class="col-md-12 mx-auto" className="reqForm">
                        <form>
                            <div class="form-group row">
                                <div class="col-sm-6" className="colReqForm">
                                    <label>Category</label>
                                </div>
                                <div class="col-sm-6">
                                    <Select
                                        ref="catRef"
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
                                            ref="descRef"
                                            className="form-control"
                                            id={this.state.data.id}
                                            value={this.state.data.id}
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
                                        <input id="qty" value={this.state.data.inventoryQty} ref="qtyRef" type="number" min="0" max="9999" className="form-control" />
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
                                        <Label><p ref="unitRef">Each</p></Label> : null}
                                </div>
                            </div>

                            <div class="col-sm-12">

                                <div class="col-sm-6">
                                    <button type="button" id="submit"
                                        class="btn btn-primary" className="submitReqForm"
                                        onClick={this.save} > Add Item </button>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
                <div class="row"></div>
                <div class="row">
                    <div class="col-sm-12">
                        <table class="requisitionTable">

                            <tr className="tableHeader">
                                <th>Category</th>
                                <th>Description</th>
                                <th>Requested Quantity</th>
                                <th>Unit</th>
                            </tr>
                            {this.state.newData.map(i => {
                                return (
                                    <tr className="tableRow">
                                        <td>{i.category}</td>
                                        <td>{i.desc}</td>
                                        <td>{i.reqQty}</td>
                                        <td>{i.unit}</td>
                                    </tr>
                                )
                            })}
                            {(this.state.newData && this.state.newData.length) ?
                                <div class="col-sm-12">
                                    <div class="col-sm-6">
                                        <button className="btn btn-primary" className="submitReqForm" onClick={() => this.changeView(this.state.showReqList)}>
                                            BACK
                                </button>
                                    </div>

                                    <div class="col-sm-6">
                                        <button type="button" id="submit"
                                            class="btn btn-primary" className="submitReqForm"
                                            onClick={this.saveRequisition} > Submit Requisition </button>
                                    </div>
                                </div>
                                : null
                            }

                        </table>
                    </div>
                </div>

            </div>
        )


    }
}

export default RequisitionApplyForm;
