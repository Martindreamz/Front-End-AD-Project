import React, { useState, createRef, useEffect, Component } from 'react';
import axios from 'axios';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import '../Components/InventoryTable.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from '@material-ui/core';
import { domain, api } from '../Configurations/Config';
import DeleteIcon from '@material-ui/icons/Delete';


class RequisitionApplyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            newData: [],
            category: [],
            desc: [],
            itemByDesc: '',
            message: '',
            cat: '',
            unit: '',
            description: '',
            openCat: false,
            openUnit: false,
            showDescription: false,
            openDescription: false,
            showQtyUnit: false,
            showReqList: false,
            isAdd: true,
        };
        this.showCat = this.showCat.bind(this);
        this.closeCat = this.closeCat.bind(this);
        this.catOpen = this.catOpen.bind(this);
        this.showDesc = this.showDesc.bind(this);
        this.closeDesc = this.closeDesc.bind(this);
        this.descOpen = this.descOpen.bind(this);
    }

    //Event Handling
    showCat = (event) => {
        const selected = event.target.value
        this.setState({
            showDescription: true,
            cat: selected,
        })
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
        fetch(api + 'api/Dept/getItemByDesc', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(selected)

        }).then(res => res.json())
            .then(requestForm => {
                this.setState({ itemByDesc: requestForm });
            });
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

    showUnit = (event) => {
        const selected = event.target.value
        this.setState({
            unit: selected,
        })
    }

    unitOpen = () => {
        this.setState({
            openUnit: !this.state.openUnit
        })
    }

    closeUnit = () => {
        this.setState({
            openUnit: !this.state.openUnit
        })
    }

    onDeleteClick(item) {
        this.setState({
            newData: this.state.newData.filter(s => s.desc !== item.desc)
        });
    }

    save = () => {
        this.setState({
            isAdd: true
        })

        let requestForm = {
            category: this.state.category[this.state.cat],
            desc: this.state.description,
            reqQty: this.refs.qtyRef.value,
            unit: this.state.itemByDesc.unit,
        }

        this.state.newData.map(item => item.desc === requestForm.desc? 
            requestForm.reqQty=parseInt(requestForm.reqQty)+parseInt(item.reqQty): requestForm.reqQty=parseInt(requestForm.reqQty));
        
        this.state.newData = this.state.newData.filter((item) => item.desc !== requestForm.desc);

        this.setState({
            newData: [
                ...this.state.newData,
                {
                    category: requestForm.category,
                    desc: requestForm.desc,
                    reqQty: requestForm.reqQty,
                    unit: requestForm.unit
                }
            ]
        });

    }

    saveRequisition = () => {
        console.log(this.state.newData)
        axios.post(api + 'api/Dept/ApplyRequisition/' + JSON.parse(sessionStorage.getItem("mySession")).id, this.state.newData)
            .then(response => {
                this.setState({ message: 'New requested items are successfully applied.' });
            })

        this.setState({
            isAdd: false
        })
    }

    //Run once before render - lifecycle
    async componentDidMount() {
        //HTTP get request
        axios.get(api + 'api/dept/stationery')
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
                        category: categoryName,
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
                                        className="form-control"
                                        id={this.state.data.id}
                                        value={this.state.cat}
                                        open={this.state.openCat}
                                        onClose={this.closeCat}
                                        onOpen={this.catOpen}
                                        onChange={this.showCat}>
                                        {this.state.category.map((item, index) => <MenuItem value={index} > {item}</MenuItem>)}
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
                                    <input type="text" value={this.state.itemByDesc.unit} className="form-control" disabled />
                                </div>
                            </div>

                            <div class="col-sm-12 mb-1">
                                <div class="col-sm-6 mb-1">
                                    <button type="button" id="submit"
                                        class="btn btn-primary" className="submitReqForm"
                                        onClick={this.save} > Add Item </button>
                                </div>

                            </div>
                        </form>
                    </div>

                </div>
                <div class="row"></div>
                <div>
                    <Button variant="contained" onClick={(state) => this.props.goHistory(true)} >
                        Go to History
                    </Button>
                </div>
                {this.state.isAdd ?
                    <div class="row">
                        <div class="col-sm-12">
                            <div className="tblReq">
                                <table className="requisitionTable text-center">
                                    {(this.state.newData && this.state.newData.length) ?
                                        <tr className="tableHeader text-center">
                                            <th>Category</th>
                                            <th>Description</th>
                                            <th>Requested Quantity</th>
                                            <th>Unit</th>
                                            <th>Action</th>
                                        </tr>
                                        : null
                                    }
                                    {this.state.newData.map(i => {
                                        return (
                                            <tr className="tableRow text-center">
                                                <td>{i.category}</td>
                                                <td>{i.desc}</td>
                                                <td>{i.reqQty}</td>
                                                <td>{i.unit}</td>
                                                <td>
                                                    <DeleteIcon onClick={() => this.onDeleteClick(i)}/>
                                                </td>
                                            </tr>
                                        )
                                    })}

                                </table>

                            </div>
                            {(this.state.newData && this.state.newData.length) ?
                                <div class="row float-right">
                                    <div className="submitRButton">
                                        <Button type="button" id="submit"
                                            variant="contained"
                                            onClick={this.saveRequisition} > Submit </Button>
                                    </div>
                                </div>
                                : null
                            }
                        </div>
                    </div>
                    : null
                }
            </div>
        )


    }
}

export default RequisitionApplyForm;
