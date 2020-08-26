import React, { Component } from "react";
import Header from '../Components/Headers/Header';
import './RecievedGoods.css';
import InventoryTable from '../Components/InventoryTable';
import axios from 'axios';
import { domain } from '../Configurations/Config';

class ReceivedGoods extends React.Component {
    constructor() {
        super()
        this.state = {
            //test data
            data: [],
            discrepancy: []
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
                            discpQty: 0,
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
        let id = event.currentTarget.id
        let qty = event.currentTarget.value
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
        axios.post('https://localhost:5001/api/store/receivedGoods/' + JSON.parse(sessionStorage.getItem("mySession")).id, this.state.discrepancy)
            .then(response => {
                {
                    window.location.href = domain
                }
            })
    }

    render() {
        return (
            <div>
                <Header />
                <div className="inventoryBody">
                    <InventoryTable type={true} data={this.state.data} handleQtyInput={this.handleInput} isReceivedGoods={true} />
                    <button className="inventoryButton" onClick={this.submitForm} >Submit</button>
                </div>
            </div>
        )
    }
}

export default ReceivedGoods;