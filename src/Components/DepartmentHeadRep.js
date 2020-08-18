import React, { Component } from "react";

class DepartmentHeadDelegate extends Component {
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
                <table style={{ textAlign: "center" }} >
                    <tr><th> Acting Department Head</th></tr>
                    <tr><td> { this.props.rep}</td></tr>
                </table></div>)
    }
}
export default DepartmentHeadDelegate