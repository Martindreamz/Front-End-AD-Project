import React, { Component } from "react";
import Header from '../Components/Headers/Header';
import './RecievedGoods.css';
import DiscrepancyTable from '../Components/DiscrepancyTable';
import axios from 'axios';

class DiscrepancyList extends React.Component {
    constructor() {
        super()
        this.state = {
            //test data
            data: [
                {
                    id: 1,
                    name: "pen",
                    quantity: 10,
                    cost: 2.00
                },
                {
                    id: 2,
                    name: "pencil",
                    quantity: 5,
                    cost: 3.00
                },
                {
                    id: 3,
                    name: "pencil",
                    quantity: 15,
                    cost: 4.00
                },
                {
                    id: 4,
                    name: "pencil",
                    quantity: 5,
                    cost: 5.00
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

    //Event handling to send post request to backend
    submitAction = () => {
        //actions here
    }

    render() {
        return (
            <div>
                <Header />
                <div className="inventoryBody">
                    <DiscrepancyTable data={this.state.data} handleReasonsInput={this.handleInput} />
                    <button className="inventoryButton" onClick={this.submitAction} >Submit</button>
                </div>
            </div>
        )
    }
}

export default DiscrepancyList;