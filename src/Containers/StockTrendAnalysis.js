import React, { Component } from 'react';
import Header from '../Components/Headers/Header';
import Graph from '../Components/Graph';
import BarChart from '../Components/BarChart';
import DataTable from '../Components/DataTable';
import TabPanel, { a11yProps } from '../Components/TabPanel';
import axios from 'axios';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import "./StockTrendAnalysis.css";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class StockTrendAnalysis extends React.Component {
    constructor() {
        super()

        this.state = {
            value: 'one',
            data: [],
            chartData: [],
            barData: [],
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
    componentDidMount(url = 'https://localhost:5001/api/report/reqByDay') {
        //HTTP get request
        axios.get(url)
            .then(response => {
                console.log(response.data)
                const items = response.data.map(item => {
                    return {
                        category: item.category,
                        departmentName: item.departmentName,
                        dateOfAuthorizing: item.dateOfAuthorizing.split(' ')[0],
                        reqQty: item.reqQty
                    }
                })
                this.setState({ data: items })
                this.setState(
                    {
                        chartData: this.buildChartData(this.state.data),
                        categoryData: [...new Set(this.state.data.map(item => item.category))],
                        departmentData: [...new Set(this.state.data.map(item => item.departmentName))]
                    }
                )
            })
        
    }

    //Format line graph data function
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
                i.x === key.dateOfAuthorizing
            ).length > 0
                ? true
                : false) {
                let temp = processData.map(item => {
                    if (item.x === key.dateOfAuthorizing) {
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
        this.setState({ selectedGraph: selected })
        if (selected === "Requisition") {
            this.componentDidMount()
            this.setState({ value: "one" })
        }
        else {
            this.setState({ selectedCategory: null, selectedDepartment: null, value: "one" })
            this.componentDidMount('https://localhost:5001/api/report/reorderbyday')
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

    handleChange = (event, newValue) => {
        if (newValue == "one" && this.state.selectedGraph == "Requisition") {
            this.setState({ selectedCategory: null, selectedDepartment: null})
            this.componentDidMount('https://localhost:5001/api/report/reqByDay')
        }
        else if (newValue == "two" && this.state.selectedGraph == "Requisition" || newValue == "three" && this.state.selectedGraph == "Requisition") {
            this.setState({ selectedCategory: null, selectedDepartment: null })
            this.componentDidMount('https://localhost:5001/api/report/reqByMonth')
        }
        else if (newValue == "one" && this.state.selectedGraph == "Reorder") {
            this.setState({ selectedCategory: null, selectedDepartment: null })
            this.componentDidMount('https://localhost:5001/api/report/reorderbyday')
        }
        else {
            this.setState({ selectedCategory: null, selectedDepartment: null })
            this.componentDidMount('https://localhost:5001/api/report/reorder')
        }
        console.log(newValue)
        this.setState({ value: newValue })
    };

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
                        <AppBar position="static">
                            <Tabs value={this.state.value} onChange={this.handleChange} aria-label="wrapped label tabs example">
                                <Tab
                                    value="one"
                                    label="Line Graph"
                                    {...a11yProps('one')}
                                />
                                <Tab value="two" label="Bar Chart" {...a11yProps('two')} />
                                <Tab value="three" label="Data Table" {...a11yProps('three')} />
                            </Tabs>
                        </AppBar>
                        <TabPanel value={this.state.value} index="one">
                            <Graph data={this.state.chartData} />
                        </TabPanel>
                        <TabPanel value={this.state.value} index="two">
                            <BarChart data={this.state.chartData} />
                         </TabPanel>
                        <TabPanel value={this.state.value} index="three">
                            <DataTable data={this.state.chartData} />
                        </TabPanel>
                    </div>
                </div>
            </div>
        )
    }
}

export default StockTrendAnalysis;