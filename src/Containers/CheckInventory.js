import React, { Component } from "react";
import Header from '../Components/Headers/Header';
import './RecievedGoods.css';
import InventoryTable from '../Components/InventoryTable';
import ErrorPopup from '../Components/ErrorPopup';
import axios from 'axios';
import { domain } from '../Configurations/Config';

class CheckInventory extends React.Component {
    constructor() {
        super()
        this.state = {
            //test data
            data: [],
            discrepancy: [],
            displayPopup: false
        }
    }


    //Run once before render - lifecycle
    componentDidMount() {
        //HTTP get request
        axios.get('https://localhost:5001/api/store/stationeries')
            .then(response => {
                const items = response.data.map(item => {
                    return {
                        Id: item.id,
                        desc: item.desc,
                        inventoryQty: item.inventoryQty
                    }
                });
                this.setState({ data: items });
                //Generate Discrepancy state base data
                this.setState(prevState => {
                    const generateDiscrepancy = prevState.data.map(item => {
                        return {
                            StationeryId: item.Id,
                            discpQty: null,
                            comment: ""
                        }
                    })
                    return {
                        discrepancy: generateDiscrepancy
                    }
                })
            })
    }

    //Save input qty to discrepancy state
    handleInput = (event) => {
        const targetData = this.state.data.find(item => item.Id == event.currentTarget.id)
        let id = event.currentTarget.id
        let qty = event.currentTarget.value - targetData.inventoryQty
        //Update discrepancy data
        this.setState(prevState => {
            const updatedDiscrepancy = prevState.discrepancy.map(item => {
                if (item.StationeryId == id) {
                    return {
                        ...item,
                        discpQty: qty
                    }
                }
                return item
            })
            console.log(updatedDiscrepancy)
            return {
                discrepancy: updatedDiscrepancy
            }
        })
    }

    submitForm = () => {
        console.log("post")
        let flag = false
        let hasDiscrepancy = false
        this.state.discrepancy.forEach(item => {
            if (item.discpQty == null) {
                flag = true
            }
            if (item.discpQty != 0) {
                hasDiscrepancy = true
            }
        })

        if (flag) {
            this.setState({
                displayPopup: true
            })
        }
        else {
            axios.post('https://localhost:5001/api/store/stkAd/' + JSON.parse(sessionStorage.getItem("mySession")).id, this.state.discrepancy)
                .then(response => {
                    if (hasDiscrepancy) {
                        window.location.href = domain + 'discrepancyList/' + response.data.id
                    }
                    else {
                        window.location.href = domain
                    }
                })
        }
    }
    closePopup = () => {
        this.setState({
            displayPopup: false
        })
    }

    render() {
        return (
            <div>
                <Header />
                {this.state.displayPopup ? <ErrorPopup message="Please fill in all the inventory quantity" closePopup={this.closePopup} /> : null}
                <div className="inventoryBody">
                    <InventoryTable type={true} data={this.state.data} handleQtyInput={this.handleInput} />
                    <button className="inventoryButton" onClick={this.submitForm} >Submit</button>
                </div>
            </div>
        )
    }
}

export default CheckInventory;