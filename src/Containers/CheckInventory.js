import React, { Component } from "react";
import Header from '../Components/Headers/Header';
import './RecievedGoods.css';
import InventoryTable from '../Components/InventoryTable';
import axios from 'axios';

class CheckInventory extends React.Component {
    constructor(props) {
        super(props)
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
            ]
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
    }

    //Save input qty to state
    handleInput = (event) => {
        console.log(event.currentTarget.id)
    }

    render() {
        return (
            <div>
                <Header />
                <div className="inventoryBody">
                    <InventoryTable type={true} data={this.state.data} handleQtyInput={this.handleInput} />
                    <button className="inventoryButton" onClick={this.checkInventoryAction} >Submit</button>
                </div>
            </div>
        )
    }
}

export default CheckInventory;