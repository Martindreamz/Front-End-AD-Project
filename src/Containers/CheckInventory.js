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
            data: [
                {
                    id: 1,
                    name: "pen",
                    quantity: 10
                },
                {
                    id: 2,
                    name: "pencil",
                    quantity: 5
                },
                {
                    id: 3,
                    name: "pencil",
                    quantity: 15
                },
                {
                    id: 4,
                    name: "pencil",
                    quantity: 5
                }
            ],
            discrepancy: []
        }
    }


    //Run once before render - lifecycle
    componentDidMount() {
        //HTTP get request
        axios.get(/* api here */)
            .then(response => {
                const items = response.data;
                this.setState({ data: items });
            })
        //Generate Discrepancy state base data
        this.setState(prevState => {
            const generateDiscrepancy = prevState.data.map(item => {
                return {
                    ...item,
                    quantity: null,
                    reason: ""
                }
            })
            console.log(generateDiscrepancy)
            return {
                discrepancy: generateDiscrepancy
            }
        })
    }

    //Save input qty to discrepancy state
    handleInput = (event) => {
        const targetData = this.state.data.find(item => item.id == event.currentTarget.id)
        let id = event.target.id
        let qty = event.target.value - targetData.quantity
        //Update discrepancy data
        this.setState(prevState => {
            const updatedDiscrepancy = prevState.discrepancy.map(item => {
                if (item.id == id) {
                    return {
                        ...item,
                        quantity: qty
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