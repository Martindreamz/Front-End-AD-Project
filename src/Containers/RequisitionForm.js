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
        axios.get('api here')
            .then(response => {
                const items = response.reqData;
                this.setState({ reqData: items });
            })
    }

    render() {
        return (
            <div>
                <Header />
                <div className="requisitionFormBody">
                    <AddCircleIcon onClick={this.addInventoryAction} />
                    <RequisitionFormTable reqData={this.state.reqData}/>
                    <button className="checkInventoryButton" onClick={this.checkInventoryAction} >Check Inventory</button>
                </div>
            </div>
        )
    }
}

export default RequisitionForm;