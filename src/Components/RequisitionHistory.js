import React, { Component } from "react";
import axios from "axios";
import { Link } from "@material-ui/core"
import '../Components/InventoryTable.css';
import Moment from 'moment';
import { domain, api } from '../Configurations/Config';


class RequisitionHistory extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
        };
    }

    //Run once before render - lifecycle
    componentDidMount() {
        //HTTP get request
        axios.get(api + 'api/dept/requisition/' + JSON.parse(sessionStorage.getItem("mySession")).id).then((response) => {
            const items = response.data;
            this.setState({ data: items });
        });
    }

    render() {
        const historyItem = this.state.data.map((item) => (
            <tr className="tableRow">
                <td><Link onClick={() => this.props.historyDetails(item)} className="mouserPointer">{item.id}</Link></td>
                <td>{Moment(item.dateOfRequest).format('DD-MM-YYYY')}</td>
                <td>{item.status}</td>
                <td>{item.comment}</td>
            </tr>
        ));
        return (
            <div>
                <h6>Click the ID to view the details</h6>
                <table className="genericTable">
                    <tr className="tableHeader">
                        <th>Requisition ID</th>
                        <th>Requested Date</th>
                        <th>Status</th>
                        <th>Comment</th>
                    </tr>
                    {historyItem}
                </table>
            </div>
        );
    }
}

export default RequisitionHistory;
