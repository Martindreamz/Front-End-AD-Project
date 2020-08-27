import React, { Component } from "react";
import Header from '../Components/Headers/Header';
import './RecievedGoods.css';
import DiscrepancyTable from '../Components/DiscrepancyTable';
import axios from 'axios';
import { domain } from '../Configurations/Config';
import ErrorPopup from '../Components/ErrorPopup';


class DiscrepancyList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            id: String(this.props.match.params.id),
            displayPopup: false
        }
    }


    //Run once before render - lifecycle
    componentDidMount() {
        //HTTP get request
        Promise.all([
            axios.get("https://localhost:5001/api/store/stkAd/get/" + this.state.id),
            axios.get("https://localhost:5001/api/store/stationeries")
        ]).then(([stkadj, items]) => {
            const result = stkadj.data.map(item => {
                return {
                    id: item.id,
                    stationeryId: item.stationeryId,
                    desc: items.data.find(record => record.id == item.stationeryId).desc,
                    discpQty: item.discpQty,
                    comment: item.comment
                }
            });
            this.setState({ data: result });
        })
    }

    //Save input qty to state
    handleInput = (event) => {
        const id = event.currentTarget.id
        const reason = event.currentTarget.value
        this.setState(prevState => {
            const newData = prevState.data.map(item => {
                if (item.stationeryId == id) {
                    return {
                        ...item,
                        comment: reason
                    }
                }
                return item
            })
            return {
                data: newData
            }
        })
    }

    //Event handling to send post request to backend
    submitAction = async () => {
        //actions here
        await axios.put('https://localhost:5001/api/store/stkAd/put', this.state.data)
            .then(response => {
                window.location.href = domain
            }).catch(response => {
                window.location.href = domain
            })
    }
    closePopup = () => {
        this.setState({
            displayPopup: false
        })
    }

    render() {
        return (
            <div>
                <Header />
                {this.state.displayPopup ? <ErrorPopup message="Please fill in all the reasons" closePopup={this.closePopup} /> : null}
                <div className="inventoryBody">
                    <DiscrepancyTable data={this.state.data} handleReasonsInput={this.handleInput} />
                    <button className="inventoryButton" onClick={this.submitAction} >Submit</button>
                </div>
            </div>
        )
    }
}

export default DiscrepancyList;