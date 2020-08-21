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
            data: [],
            showPopup: false,
            popupData: {
                Id: "",
                category: "",
                desc: "",
                inventoryQty: 1
            },
            categoryData: []
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
                        category: item.category,
                        desc: item.desc,
                        inventoryQty: item.inventoryQty
                    }
                });
                console.log(items)
                //Generate category dropdown data
                const categoryName = [...new Set(items.map(item => item.category))]
                this.setState({ data: items, categoryData: categoryName });
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
                Id: "",
                category: "",
                desc: "",
                inventoryQty: 1
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
            popupData: this.state.data.find(item => item.Id == event.currentTarget.id),
            showPopup: !this.state.showPopup
        })
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
