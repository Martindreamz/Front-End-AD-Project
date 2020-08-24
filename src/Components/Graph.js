import React, { Component } from "react";
import { domain } from '../Configurations/Config';
import axios from 'axios';
import { Line } from "react-chartjs-2";
import Numeral from "numeral";



class Graph extends React.Component {
    constructor(props) {
        super(props)
        
    }


    render() {
        //graph format
        const options = {
            legend: {
                display: false,
            },
            elements: {
                point: {
                    radius: 0,
                },
            },
            maintainAspectRatio: false,
            tooltips: {
                mode: "index",
                interect: false,
                callbacks: {
                    label: function (tooltipItem, data) {
                        return Numeral(tooltipItem.value).format("+0,0");
                    },
                },
            },
            scales: {
                xAxes: [
                    {
                        type: "time",
                        time: {
                            format: "MM/DD/YYYY",
                            tooltipFormat: "ll"
                        },
                    },
                ],
                yAxes: [
                    {
                        gridLines: {
                            display: true,
                        },
                        ticks: {
                            callback: function (value, index, values) {
                                return Numeral(value).format("0a");
                            },
                        },
                    },
                ],
            },
        }


        return (
            <div>
                <Line
                    data={{
                        datasets: [
                            {
                                backgroundColor: "rgba(204, 16, 52, 0.5)",
                                borderColor: "#CC1034",
                                data: this.props.data,
                            },
                        ],
                    }}
                    options={options}
                />
            </div>
        )
    }
}

export default Graph;