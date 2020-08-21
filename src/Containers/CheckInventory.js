import React, { Component } from "react";
import Header from '../Components/Headers/Header';
import './RecievedGoods.css';
import InventoryTable from '../Components/InventoryTable';
import axios from 'axios';

class CheckInventory extends React.Component {
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

    render() {
        return (
            <div>
                <Header />
                <div className="inventoryBody">
                    <InventoryTable type={true} data={this.state.data} handleQtyInput={this.handleInput} />
                    <button className="inventoryButton" >Submit</button>
                </div>
            </div>
        )
    }
}

export default CheckInventory;