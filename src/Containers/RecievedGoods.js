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
            data1: [
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
                id: "",
                name: "",
                quantity: 1
            }
        }
    }

    //Run once before render - lifecycle
    componentDidMount() {
        //HTTP get request
        axios.get('https://localhost:5001/api/invt')
            .then(response => {
                const items = response.data1;
                this.setState({ data1: items });
            })
    }

    checkInventoryAction = () => {
        //redirect to check inventory url
        window.location.href = domain
    }
    togglePopupAction = async () => {
        //show popup
        await this.setState({
            popupData: {
                id: "",
                name: "",
                quantity: 1
            }, 
            showPopup: !this.state.showPopup
        })
    }

    //Create/Edit button event handling
    addInventoryAction = () => {
        this.setState({
            showPopup: true
        })
    }
    editInventoryAction = async (event) => {
        await this.setState({
            popupData: this.state.data1.find(item => item.id == event.currentTarget.id),
            showPopup: !this.state.showPopup
        })
    }

    render() {
        return (
            <div>
                <Header />
<<<<<<< HEAD
                {this.state.showPopup ? <InventoryPopup closePopup={this.togglePopupAction} data1={this.state.popupData} /> : null}
                <div className="recievedGoodsBody">
                    <AddCircleIcon onClick={this.addInventoryAction} />
                    <InventoryTable data1={this.state.data1} editData={this.editInventoryAction} />
                    <button className="checkInventoryButton" onClick={this.checkInventoryAction} >Check Inventory</button>
=======
                {this.state.showPopup ? <InventoryPopup closePopup={this.togglePopupAction} data={this.state.popupData} /> : null}
                <div className="inventoryBody">
                    <AddCircleIcon onClick={this.addInventoryAction} />
                    <InventoryTable type={false} data={this.state.data} editData={this.editInventoryAction} />
                    <button className="inventoryButton" onClick={this.checkInventoryAction} >Check Inventory</button>
>>>>>>> 05c88c8930db63cc31958269dab8690cd6546002
                </div>
            </div>
        )
    }
}

export default RecievedGoods;