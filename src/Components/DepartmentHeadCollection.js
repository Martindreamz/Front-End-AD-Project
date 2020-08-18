import React, { Component } from "react";

class DepartmentHeadCollection extends Component {
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
                <table style={{ textAlign: "center", verticalAlign: "baseline" }}>
                    <tr>
                        <td>
                            <table style={{ textAlign: "center" }}>
                                <tr><th> Next Delivery</th></tr>
                                <tr><td> { this.props.department.nextCollection}</td></tr>
                            </table>
                        </td>
                        <td>
                            <table style={{ textAlign: "center" }}>
                                <tr><th> Stationery Collection Point</th></tr>
                                <tr><td> { this.props.department.collectionPt}</td></tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>)
    }
}
export default DepartmentHeadCollection