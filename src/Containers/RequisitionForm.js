import React, { Component } from "react";
import Header from '../Components/Headers/Header';
import RequisitionFormTable from '../Components/RequisitionFormTable';
import './RecievedGoods.css';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { domain } from '../Configurations/Config';
import axios from 'axios';
import InventoryPopup from "../Components/InventoryPopup";

// const styles = {
//     addButton: 
// }

class RequisitionForm extends React.Component {
    constructor() {
        super()
        this.state = {
            //test data
            reqData: [
                {
                    id: 1,
                    category: "Clip",
                    description: "Clips Double 2",
                    quantity: 10,
                    unit: "Dozen"
                },
                {
                    id: 2,
                    category: "Pen",
                    description: "Pen Ballpoint Black",
                    quantity: 1,
                    unit: "Box"
                },
                {
                    id: 3,
                    category: "Scrissors",
                    description: "Scissors",
                    quantity: 3,
                    unit: "Each"
                },
                {
                    id: 4,
                    category: "Eraser",
                    description: "Eraser (soft)",
                    quantity: 20,
                    unit: "Each"
                },
                {
                    id: 5,
                    category: "Eraser",
                    description: "Eraser (soft)",
                    quantity: 20,
                    unit: "Each"
                }
            ],

            dropdownData: [],
            category: [],

            showPopup: false,
            popupData: {
                id: "",
                name: "",
                quantity: 1
            }
        }
    }

    //Run once before render - lifecycle
    async componentDidMount() {
        //HTTP get request
        axios.get('api here')
            .then(response => {
                const items = response.reqData;
                this.setState({ reqData: items });
            })

        await this.setState(prevState => {
            //get distinct category name
            const categoryName = [...new Set(prevState.reqData.map(item => item.category))]
            console.log(categoryName)

            var data = []
            categoryName.forEach(name => {
                const itemName = name
                //get array of object with category == name
                const categoryData = prevState.reqData.map(item => {
                    if (name == item.category) {
                        return item
                    }
                    return null
                }).filter(item => item != null)
                data.push({
                    itemName: categoryData
                })
            })
            console.log(data)

            return {
                dropdownData: data,
                category: categoryName 
            }
        })
        console.log(this.state.reqData)
        console.log(this.state.category)
    }



    render() {
        return (
            <div>
                <Header />
                <div className="requisitionFormBody">
                    <AddCircleIcon onClick={this.addInventoryAction} />
                    <RequisitionFormTable data={this.state.dropdownData} category={this.state.category} />
                    <button className="checkInventoryButton" onClick={this.checkInventoryAction} >Check Inventory</button>
                </div>
            </div>
        )
    }
}

export default RequisitionForm;