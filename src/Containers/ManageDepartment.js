import React, { Component } from "react";
import Header from '../Components/Headers/Header';

class ManageDepartment extends Component {
    constructor() {
        super()
        /*this.state() = {
            staff: [],
            requisition: [],
            department: ""
        }*/
    }


    render() {
        return (
            <div>
                <Header />
                <h1 style={{ textAlign: "center" }} colspan='3' >LOGIC UNIVERSITY</h1>
                <h1 style={{ textAlign: "center" }} colspan='3' >DEPARTMENT INFORMATION</h1>

                <table cellSpacing="0" width='100%' align="center" >

                    <tr ><th style={{ textAlign: "center" }} width='30%' colspan="1">Your People</th>
                        <th style={{ textAlign: "center" }} width='40%' colspan="1">Your task</th>
                        <th style={{ textAlign: "center" }} width='30%' colspan="1">Logistics</th>
                    </tr>

                    <tr >
                        <td Align="center">
                            <table>
                                <tr  Align="center">
                                    <table style={{ textAlign: "center" }}>
                                        <tr><th> Acting Department Head</th></tr>
                                        <tr><td> Wutt Yee</td></tr>
                                    </table>
                                </tr>
                                <tr  Align="center">
                                    <table style={{ textAlign: "center" }}>
                                        <tr><th> Employees under your care</th></tr>
                                        <tr><td> Bianca Cao</td></tr>
                                        <tr><td> Daryl Kouk</td></tr>
                                        <tr><td> Jane Lee</td></tr>
                                        <tr><td> Martin Ng</td></tr>
                                        <tr><td> Theingi Aung Win</td></tr>
                                        <tr><td> Wayne Khine Myo</td></tr>
                                    </table>
                                </tr>
                                <tr  Align="center">
                                    <table style={{ textAlign: "center" }}>
                                        <tr><th> Current representative</th></tr>
                                        <tr><td> Wu Yirui</td></tr>
                                    </table>
                                </tr>
                            </table>
                        </td>
                        <td style={{ textAlign: "center", verticalAlign: "baseline" }}>
                            <table style={{ textAlign: "center" }}>
                                <tr><th> Pending Stationery Request</th><th colspan='2'> Action</th><th> Comments</th></tr>
                                <tr><td> Bianca Cao</td><td>Reject</td><td>Approve</td><textarea /></tr>
                                <tr><td> Daryl Kouk</td><td>Reject</td><td>Approve</td><textarea /></tr>
                                <tr><td> Jane Lee</td><td>Reject</td><td>Approve</td><textarea /></tr>
                                <tr><td> Jane Lee</td><td>Reject</td><td>Approve</td><textarea /></tr>
                                <tr><td> Jane Lee</td><td>Reject</td><td>Approve</td><textarea /></tr>
                            </table>
                        </td>
                        <td style={{ textAlign: "center", verticalAlign: "baseline" }}>
                            <table style={{ textAlign: "center", verticalAlign: "baseline" }}>
                                <tr>
                                    <td>
                                        <table style={{ textAlign: "center" }}>
                                            <tr><th> Next Delivery</th></tr>
                                            <tr><td> 08/08/2020</td></tr>
                                        </table>
                                    </td>
                                    <td>
                                        <table style={{ textAlign: "center" }}>
                                            <tr><th> Stationery Collection Point</th></tr>
                                            <tr><td> University Hospital</td></tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
        )
    }
}

export default ManageDepartment