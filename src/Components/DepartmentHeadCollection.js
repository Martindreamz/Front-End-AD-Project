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
            </div>)
    }
}
export default DepartmentHeadCollection