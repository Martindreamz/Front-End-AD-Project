import React, { Component } from "react";
import Header from '../Components/Headers/Header';
import DepartmentHeadDelegate from '../Components/DepartmentHeadDelegate'
import DepartmentHeadCollection from '../Components/DepartmentHeadCollection'
import DepartmentHeadEmployee from '../Components/DepartmentHeadEmployee'
import DepartmentHeadRep from '../Components/DepartmentHeadRep'
import DepartmentHeadApproval from '../Components/DepartmentHeadApproval'

class ManageDepartment extends Component {
    constructor() {
        super()
        this.state = {
            staff: [
                { name: "Bianca Cao " },
                { name: "Daryl Kouk" },
                { name: "Jane Lee" },
                { name: "Martin Ng" },
                { name: "Theingi Aung Win" },               
                { name: "Wayne Khine Myo" }
            ],
            requisition: [
                {
                    Id: 1,
                    dateOfRequest:"08 / 08 / 2020",
                    dateOfAuthorizing:"08 / 08 / 2020",
                    status:"pending",
                    comment:"",
                    EmployeeId:"Bianca Cao",
                    AuthorizerId:"",
                },
                {
                    Id: 2,
                    dateOfRequest:"08 / 08 / 2020",
                    dateOfAuthorizing:"08 / 08 / 2020",
                    status:"pending",
                    comment:"",
                    EmployeeId:"Daryl Kouk",
                    AuthorizerId:"",
                },
                {
                    Id: 3,
                    dateOfRequest:"08 / 08 / 2020",
                    dateOfAuthorizing:"08 / 08 / 2020",
                    status:"pending",
                    comment:"",
                    EmployeeId:"Jane Lee",
                    AuthorizerId:"",
                },
                {
                    Id: 4,
                    dateOfRequest:"08 / 08 / 2020",
                    dateOfAuthorizing:"08 / 08 / 2020",
                    status:"pending",
                    comment:"",
                    EmployeeId:"Jane Lee",
                    AuthorizerId:"",
                },
                {
                    Id: 5,
                    dateOfRequest:"08 / 08 / 2020",
                    dateOfAuthorizing:"08 / 08 / 2020",
                    status:"pending",
                    comment:"",
                    EmployeeId:"Jane Lee",
                    AuthorizerId:"",
                }
            ],
            department: {
                name: "hello",
                rep: "Martin",
                delegate: "Bianca",
                nextCollection: "08/08/2020",
                collectionPt: "University Hospital"
            }
        }
    }


    render() {
        return (
            <div>
                <Header />
                <h1 style={{ textAlign: "center" }} >LOGIC UNIVERSITY</h1>
                <h1 style={{ textAlign: "center" }} >DEPARTMENT INFORMATION</h1>

                <table cellSpacing="0" width='100%' align="center" >

                    <tr ><th style={{ textAlign: "center" }} width='30%' colspan="1">Your People</th>
                        <th style={{ textAlign: "center" }} width='40%' colspan="1">Your task</th>
                        <th style={{ textAlign: "center" }} width='30%' colspan="1">Logistics</th>
                    </tr>

                    <tr >
                        <td Align="center">
                            <table>
                                <tr Align="center">
                                    <DepartmentHeadDelegate delegate={this.state.department.delegate} />
                                </tr>
                                <tr Align="center">
                                    <div style={{ overflowY:"auto" }}>
                                        <DepartmentHeadEmployee staff={this.state.staff} />
                                    </div>
                                </tr>
                                <tr Align="center">
                                    <DepartmentHeadRep rep={this.state.department.rep} />
                                </tr>
                            </table>
                        </td>
                        <td style={{ textAlign: "center", verticalAlign: "baseline" }}>
                            <DepartmentHeadApproval requisition={this.state.requisition} />
                        </td>
                        <td style={{ textAlign: "center", verticalAlign: "baseline" }}>
                            <DepartmentHeadCollection department={this.state.department} />
                        </td>
                    </tr>
                </table>
            </div>
        )
    }
}

export default ManageDepartment