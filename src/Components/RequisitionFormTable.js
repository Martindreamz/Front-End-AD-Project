import React, { Component } from "react";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { domain } from '../Configurations/Config';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


class RequisitionFormTableNew extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            //requestData: [],
            data: [],
            initial: true, editSupObj: []
        }

    }

    //Run once before render - lifecycle
    async componentDidMount() {
        //HTTP get request
        axios.get('api here')
            .then(response => {
                const items = response.data;
                this.setState({ data: items });
            })
    }

    render() {
        const reqItem = this.state.data.map(item =>
            <tr className="tableRow" key={item.id}>
                <td>{item.category}</td>
                <td>{item.desc}</td>
                <td>{item.reqQty}</td>
                <td>{item.unit}</td>
                <td>
                    <div className="tableIcons">
                        <EditIcon id={item.id} onClick={() => this.props.editRequestForm(item)} />

                    </div>
                </td>
            </tr>
        )

        return (
            <table className="requisitionTable">
                <tr className="tableHeader">
                    <th>Category</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Unit</th>
                    <th></th>
                </tr>
                {reqItem}
            </table>
        )
    }
}

export default RequisitionFormTableNew;