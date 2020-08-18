import React, { Component } from "react";
import './InventoryTable.css';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


const styles = {
    button: {
        display: 'block',
        //marginTop: theme.spacing(2),
    },
    formControl: {
        //margin: theme.spacing(1),
        minWidth: 120,
    }
}

class RequisitionFormTable extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            requestData: [{
                id: "",
                category: "",
                description: "",
                quantity: "",
                unit: ""
            }],


            cat: '',
            openCat: false,

            showDescription: false,
            description: '',
            openDescription: false,

            //test
            data: [
                {
                    Clips: [
                        {
                            id: 1,
                            category: "Clip",
                            description: "Clips Double 2",
                            quantity: 10,
                            unit: "Dozen"
                        },
                        {
                            id: 2,
                            category: "Clip",
                            description: "Clips Double 1",
                            quantity: 10,
                            unit: "Dozen"
                        }
                    ],
                    Pen: [
                        {
                            id: 3,
                            category: "Pen",
                            description: "Pen Ballpoint Black",
                            quantity: 1,
                            unit: "Box"
                        },
                        {
                            id: 4,
                            category: "Pen",
                            description: "Pen Ballpoint",
                            quantity: 1,
                            unit: "Box"
                        }
                    ],
                }
            ]
        }
    }
    //Event Handling
    showCat = (event) => {
        const selected = event.target.value
        this.setState({
            cat: selected,
            showDescription: true
        });
    }

    closeCat = () => {
        this.setState({
            openCat: !this.state.openCat
        })
    }

    catOpen = () => {
        this.setState({
            openCat: !this.state.openCat
        })
    }



    showDesc = (event) => {
        const selected = event.target.value
        this.setState({
            description: selected,
            openDescription: !this.state.openDescription
        });
    }
    closeDesc = () => {
        this.setState({
            openDescription: !this.state.openDescription
        })
    }

    descOpen = () => {
        this.setState({
            openDescription: !this.state.openDescription
        })
    }

    render() {
        //mapping data 
        const ReqItem = this.state.requestData.map(item =>
            <tr className="tableRow">
                <td>
                    <InputLabel id="demo-controlled-open-select-label">Category</InputLabel>
                    <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        value={this.state.cat}
                        open={this.state.openCat}
                        onClose={this.closeCat}
                        onOpen={this.catOpen}
                        onChange={this.showCat}>
                        {this.props.category.map((item,index) => <MenuItem value={index}>{item}</MenuItem>)}
                    </Select>

                </td>
                <td>
                    {this.state.showDescription ? 
                        <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            value={this.state.description}
                            open={this.state.openDescription}
                            onClose={this.closeDesc}
                            onOpen={this.descOpen}
                            onChange={this.showDesc}>
                            {console.log(this.props.data[Number(this.state.cat)])}
                        </Select>
                        : null
                    }
                </td>
                <td>{item.quantity}</td>
                <td>{item.unit}</td>
            </tr>

        )

        return (
            <table className="requisitionTable">
                <tr className="tableHeader">
                    <th>Category</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Unit</th>
                </tr>
                {ReqItem}
            </table>
        )
    }
}

export default RequisitionFormTable;