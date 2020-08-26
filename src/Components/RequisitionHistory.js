import React, { Component } from "react";
import axios from "axios";
import { Link } from "@material-ui/core";
import RequisitionHistoryDetails from "./RequisitionHistoryDetails";
import { NavLink } from "react-router-dom";

class RequisitionHistory extends Component {
    constructor() {
        super();
        this.state = {
            //test data
            data: [],
            identity: JSON.parse(sessionStorage.getItem("mySession"))
        };
    }


    //Run once before render - lifecycle
    componentDidMount() {
        //HTTP get request
        axios.get('https://localhost:5001/api/dept/requisition/' + JSON.parse(sessionStorage.getItem("mySession")).id).then((response) => {
            const items = response.data;
            this.setState({ data: items });
        });
    }

    render() {
        const historyItem = this.state.data.map((item) => (
            <tr className="tableRow">
                <td><Link onClick={() => this.props.historyDetails(item)}>{item.id}</Link></td>
                <td>{item.dateOfRequest}</td>
                <td>{item.status}</td>
            </tr>
        ));
        return (
            <table className="genericTable">
                <tr className="tableHeader">
                    <th>Requisition ID</th>
                    <th>Requested Date</th>
                    <th>Status</th>
                </tr>
                {historyItem}
            </table>
        );
    }
}

export default RequisitionHistory;
