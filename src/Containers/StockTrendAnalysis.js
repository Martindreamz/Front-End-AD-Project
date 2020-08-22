import React, { Component } from 'react';
import Header from '../Components/Headers/Header';
import Graph from '../Components/Graph';
import axios from 'axios';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import "./StockTrendAnalysis.css";

class StockTrendAnalysis extends React.Component {
    constructor() {
        super()

        this.state = {
            data: [
                {
                    category: "pen",
                    departmentName: "store",
                    dateOfAuthorizing: new Date('08/15/2020'),
                    reqQty: 3
                },
                {
                    category: "pencil",
                    departmentName: "store",
                    dateOfAuthorizing: new Date('08/15/2020'),
                    reqQty: 7
                },
                {
                    category: "pencil",
                    departmentName: "store",
                    dateOfAuthorizing: new Date('08/16/2020'),
                    reqQty: 10
                },
                {
                    category: "pencil",
                    departmentName: "hr",
                    dateOfAuthorizing: new Date('08/16/2020'),
                    reqQty: 5
                }
            ],
            chartData: [],
            categoryData: [],
            departmentData: [],

            //state for category dropdown
            selectedCategory: null,
            openCat: false,
            //state for department dropdown
            selectedDepartment: null,
            openDept: false,
            //state for graph dropdown
            selectedGraph: "Requisition",
            openGraph: false
        }
    }

    //Run once before render - lifecycle
    componentDidMount() {
        //HTTP get request
        axios.get(/*api here*/)
            .then(response => {
                this.setState({ data: response })
            })
        this.setState(
            {
                chartData: this.buildChartData(this.state.data),
                categoryData: [...new Set(this.state.data.map(item => item.category))],
                departmentData: [...new Set(this.state.data.map(item => item.departmentName))]
            }
        )
    }

    //Format graph data function
    buildChartData = (data, category = null, department = null) => {
        let processData = [];

        if (category != null && department == null) {
            data = data.filter(item => item.category === category)
        }
        else if (category == null && department != null) {
            data = data.filter(item => item.departmentName === department)
        }
        else if (category != null && department != null) {
            data = data.filter(item => item.category === category).filter(item => item.departmentName === department)
        }

        data.forEach((key, value) => {
            if (processData.filter(i =>
                i.x.getTime() === key.dateOfAuthorizing.getTime()
            ).length > 0
                ? true
                : false) {
                let temp = processData.map(item => {
                    if (item.x.getTime() === key.dateOfAuthorizing.getTime()) {
                        console.log(key.reqQty)
                        return {
                            ...item,
                            y: item.y + key.reqQty
                        }
                    }
                    return item
                })
                processData = temp
            }
            else {
                processData.push(
                    {
                        x: key.dateOfAuthorizing,
                        y: key.reqQty
                    }
                )
            }
        })
        console.log(processData)
        return processData;
    }

    //event handling for category dropdown
    showCat = (event) => {
        let selected = event.target.value
        if (selected === "all") {
            selected = null
        }
        this.setState(
            {
                chartData: this.buildChartData(this.state.data, selected, this.state.selectedDepartment),
                selectedCategory: selected
            }
        );
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
    //event handling for department dropdown
    showDept = (event) => {
        let selected = event.target.value
        if (selected === "all") {
            selected = null
        }
        this.setState(
            {
                chartData: this.buildChartData(this.state.data, this.state.selectedCategory, selected),
                selectedDepartment: selected
            }
        );
    }
    closeDept = () => {
        this.setState({
            openDept: !this.state.openDept
        })
    }

    deptOpen = () => {
        this.setState({
            openDept: !this.state.openDept
        })
    }
    //event handling for graph dropdown
    showGraph = (event) => {
        let selected = event.target.value
        if (selected === "Requisition") {
            this.componentDidMount()
            this.setState({ selectedGraph: selected })
        }
        else {
            axios.get(/*reorder api here*/)
                .then(response => {
                    const items = response.data.map(item => {
                        return {
                            category: item.category,
                            departmentName: item.departmentName,
                            dateOfAuthorizing: item.date,
                            reqQty: item.qty
                        }
                    });
                    this.setState({ data: items })
                })
            this.setState(
                {
                    chartData: this.buildChartData(this.state.data),
                    categoryData: [...new Set(this.state.data.map(item => item.category))],
                    departmentData: [...new Set(this.state.data.map(item => item.departmentName))],
                    selectedGraph: selected
                }
            )
        }
    }
    closeGraph = () => {
        this.setState({
            openGraph: !this.state.openGraph
        })
    }

    graphOpen = () => {
        this.setState({
            openGraph: !this.state.openGraph
        })
    }

    render() {
        return (
            <div>
                <Header />
                <div className="StockTrendBody">
                    <div className="dropDownMenu">
                        Graph:
                        <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            value={this.state.selectedGraph}
                            open={this.state.openGraph}
                            onClose={this.closeGraph}
                            onOpen={this.graphOpen}
                            onChange={this.showGraph}>
                            <MenuItem value="Requisition">Requisition</MenuItem>
                            <MenuItem value="Reorder">Reorder</MenuItem>
                        </Select>
                        Category:
                        <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            value={this.state.selectedCategory}
                            open={this.state.openCat}
                            onClose={this.closeCat}
                            onOpen={this.catOpen}
                            onChange={this.showCat}>
                            <MenuItem value="all">select all</MenuItem>
                            {this.state.categoryData.map(item => <MenuItem value={item}>{item}</MenuItem>)}
                        </Select>
                        Department:
                        <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            value={this.state.selectedDepartment}
                            open={this.state.openDept}
                            onClose={this.closeDept}
                            onOpen={this.deptOpen}
                            onChange={this.showDept}>
                            <MenuItem value="all">select all</MenuItem>
                            {this.state.departmentData.map(item => <MenuItem value={item}>{item}</MenuItem>)}
                        </Select>
                    </div>
                    <div className="graphSection">
                        <Graph data={this.state.chartData} />
                    </div>
                </div>
            </div>
        )
    }
}

export default StockTrendAnalysis;