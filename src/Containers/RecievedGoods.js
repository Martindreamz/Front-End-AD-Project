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
                    category: "pen",
                    name: "pen",
                    quantity: 10
                },
                {
                    id: 2,
                    category: "pen",
                    name: "pencil",
                    quantity: 5
                },
                {
                    id: 3,
                    category: "pencil",
                    name: "pencil",
                    quantity: 15
                },
                {
                    id: 4,
                    category: "pens",
                    name: "pencil",
                    quantity: 5
                }
            ],
            showPopup: false,
            popupData: {
                id: "",
                category: "",
                name: "",
                quantity: 1
            },
            categoryData: []
        }
    }

    //Run once before render - lifecycle
    componentDidMount() {
        //HTTP get request
        axios.get('https://localhost:5001/api/invt')
            .then(response => {
                const items = response.data;
                this.setState({ data: items });
            })
        //Generate category data for dropdown
        const categoryName = [...new Set(this.state.data.map(item => item.category))]
        this.setState({
            categoryData: categoryName
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
                category: "",
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
            popupData: this.state.data.find(item => item.id == event.currentTarget.id),
            showPopup: !this.state.showPopup
        })
    }

    //Event handling for dropdown
    showCat = (event) => {
        const selected = event.target.value
        this.setState(prevState => {
            const popUpData = prevState.popupData
            return {
                ...popUpData,
                category: selected
            }
        });
    }

    render() {
        return (
            <div>
                <Header />
                {this.state.showPopup ? <InventoryPopup closePopup={this.togglePopupAction} data={this.state.popupData} categoryData={this.state.categoryData} showCat={this.showCat} /> : null}
                <div className="recievedGoodsBody">
                    <AddCircleIcon onClick={this.addInventoryAction} />
                    <InventoryTable data={this.state.data} editData={this.editInventoryAction} />
                    <button className="checkInventoryButton" onClick={this.checkInventoryAction} >Check Inventory</button>
                </div>
            </div>
        )
    }
}

export default RecievedGoods;
