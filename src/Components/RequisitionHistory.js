import React, { Component } from "react";
import axios from "axios";
import { Link } from "@material-ui/core";

class RequisitionHistory extends Component {
    constructor() {
        super();
        this.state = {
            //test data
            historyData: [
                {
                    ReqID: "DDS/111/10",
                    DateOfRequest: "04/08/2020",
                    Status: "Pending"
                },
                {
                    ReqID: "DDS/111/09",
                    DateOfRequest: "01/07/2020",
                    Status: "Approved"
                },
                {
                    ReqID: "DDS/111/08",
                    DateOfRequest: "01/06/2020",
                    Status: "Approved"
                },
                {
                    ReqID: "DDS/111/07",
                    DateOfRequest: "17/05/2020",
                    Status: "Approved"
                },
                {
                    ReqID: "DDS/111/99",
                    DateOfRequest: "14/05/2020",
                    Status: "Rejected"
                },
            ],
        };
        
    }

    changeView() {
        this.setState
    }
    //Run once before render - lifecycle
    componentDidMount() {
        //HTTP get request
        axios.get(/* api here */).then((response) => {
            const items = response.historyData;
            this.setState({ historyData: items });
        });
    }

    render() {
        const historyItem = this.state.historyData.map((item) => (
            <tr className="tableRow">
                <td><Link onClick="changeView">{item.ReqID}</Link></td>
                <td>{item.DateOfRequest}</td>
                <td>{item.Status}</td>
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
