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
                                <tr  Align="center">
                                  <DepartmentHeadDelegate/>
                                </tr>
                                <tr  Align="center">
                                   
                                </tr>
                                <tr  Align="center">
                                    <DepartmentHeadEmployee/>
                                </tr>
                            </table>
                        </td>
                        <td style={{ textAlign: "center", verticalAlign: "baseline" }}>
                            <DepartmentHeadApproval/>
                        </td>
                        <td style={{ textAlign: "center", verticalAlign: "baseline" }}>
                            <DepartmentHeadCollection/>
                        </td>
                    </tr>
                </table>
            </div>
        )
    }
}

export default ManageDepartment