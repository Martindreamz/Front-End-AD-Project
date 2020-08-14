import React, { Component } from "react";
import Header from '../Components/Headers/Header';
import InventoryTable from '../Components/InventoryTable';
import './RecievedGoods.css';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { domain } from '../Configurations/Config';
import axios from 'axios';
import InventoryPopup from "../Components/InventoryPopup";

class RecievedGoods extends React.Component {
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
            showPopup: false,
            popupData: {
                id: 1,
                name: "test",
                quantity: 15
            }
        }
    }

    //Run once before render - lifecycle
    componentDidMount() {
        //HTTP get request
        axios.get(/* api url here */)
            .then(response => {
                const items = response.data;
                this.setState({ data: items });
            })
    }

    checkInventoryAction = () => {
        //redirect to check inventory url
        window.location.href = domain
    }
    togglePopupAction = () => {
        //show popup
        this.setState({
            popupData: {
                id: null,
                name: null,
                quantity: 1
            }, 
            showPopup: !this.state.showPopup
        })
    }
    addInventoryAction = () => {
        this.setState({
            showPopup: true
        })
    }

    render() {
        return (
            <div>
                <Header />
                {this.state.showPopup ? <InventoryPopup closePopup={this.togglePopupAction} data={this.state.popupData} /> : null}
                <div className="recievedGoodsBody">
                    <AddCircleIcon onClick={this.addInventoryAction} />
                    <InventoryTable data={this.state.data} />
                    <button className="checkInventoryButton" onClick={this.checkInventoryAction} > Check Inventory</button>
                </div>
            </div>
        )
    }
}

export default RecievedGoods;