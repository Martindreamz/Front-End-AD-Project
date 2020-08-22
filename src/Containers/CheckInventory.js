import React, { Component } from "react";
import Header from '../Components/Headers/Header';
import './RecievedGoods.css';
import InventoryTable from '../Components/InventoryTable';
import ErrorPopup from '../Components/ErrorPopup';
import axios from 'axios';

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
                            Id: item.Id,
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
        let id = event.target.id
        let qty = event.target.value - targetData.inventoryQty
        //Update discrepancy data
        this.setState(prevState => {
            const updatedDiscrepancy = prevState.discrepancy.map(item => {
                if (item.Id == id) {
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
        this.state.discrepancy.forEach(item => {
            if (item.discpQty == null || item.discpQty == "") {
                flag = true
            }
        })

        if (flag) {
            this.setState({
                displayPopup: true
            })
        }
        else {
            axios.post('https://localhost:5001/api/store/stkAd/1', this.state.discrepancy)
        }

        /*fetch('https://localhost:5001/api/store/stkAd/1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.discrepancy)
        }).then(res => res.json()).then(tom => {
            console.log(tom)
        });*/
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