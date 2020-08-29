import React, { Component } from "react";
import Header from '../Components/Headers/Header';
import './RecievedGoods.css';
import InventoryTable from '../Components/InventoryTable';
import axios from 'axios';
import { domain, api } from '../Configurations/Config';

class ReceivedGoods extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            //test data
            data: [],
            discrepancy: [],
            id: String(this.props.match.params.id)
        }
    }


    //Run once before render - lifecycle
    componentDidMount() {
        //HTTP get request
        Promise.all([
            axios.get(api + "api/store/getPOD/" + this.state.id),
            axios.get(api + "api/store/stationeries")
        ]).then(([pod, items]) => {
            const result = pod.data.map(item => {
                return {
                    Id: item.stationeryId,
                    desc: items.data.find(record => record.id == item.stationeryId).desc,
                    inventoryQty: item.qty
                }
            });
            this.setState({ data: result });
            this.setState(prevState => {
                const generateDiscrepancy = prevState.data.map(item => {
                    return {
                        StationeryId: item.Id,
                        discpQty: 0,
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
        let id = event.currentTarget.id
        let qty = event.currentTarget.value
        //Update discrepancy data
        this.setState(prevState => {
            const updatedDiscrepancy = prevState.discrepancy.map(item => {
                if (item.StationeryId == id) {
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

    submitForm = () => {
        Promise.all([
            axios.post(api + 'api/store/receivedGoods/' + JSON.parse(sessionStorage.getItem("mySession")).id, this.state.discrepancy),
            axios.post(api + 'api/Store/PORecieved/' + this.state.id)
        ]).then(([res1, res2]) => {
            window.location.href = domain + 'placeOrderSubmit'
        })
    }

    render() {
        return (
            <div>
                <Header />
                <div className="inventoryBody">
                    <InventoryTable type={true} data={this.state.data} handleQtyInput={this.handleInput} isReceivedGoods={true} />
                    <button className="inventoryButton" onClick={this.submitForm} >Submit</button>
                </div>
            </div>
        )
    }
}

export default ReceivedGoods;