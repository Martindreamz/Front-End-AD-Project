import React, { Component } from "react";

class DepartmentHeadApproval extends Component {
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
                <table style={{ textAlign: "center" }}>
                    <tr><th> Pending Stationery Request</th><th colspan='2'> Action</th><th> Comments</th></tr>
                    <tr><td> Bianca Cao</td><td>Reject</td><td>Approve</td><textarea /></tr>
                    <tr><td> Daryl Kouk</td><td>Reject</td><td>Approve</td><textarea /></tr>
                    <tr><td> Jane Lee</td><td>Reject</td><td>Approve</td><textarea /></tr>
                    <tr><td> Jane Lee</td><td>Reject</td><td>Approve</td><textarea /></tr>
                    <tr><td> Jane Lee</td><td>Reject</td><td>Approve</td><textarea /></tr>
                </table>
            </div>)
    }
}
export default DepartmentHeadApproval