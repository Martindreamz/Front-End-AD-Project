import React, { Component } from "react";

class DepartmentHeadEmployee extends Component {
    constructor() {
        super()
        /*this.state() = {
            staff: [],
            requisition: [],
            department: ""
        }*/
    }
  /*    <tr><th> Employees under your care</th></tr>
    <tr><td> Bianca Cao</td></tr>
    <tr><td> Daryl Kouk</td></tr>
    <tr><td> Jane Lee</td></tr>
    <tr><td> Martin Ng</td></tr>
    <tr><td> Theingi Aung Win</td></tr>
    <tr><td> Wayne Khine Myo</td></tr>*/
    render() {

        return (
            <div style={{ overflowY: "scroll", height:"100px"}}>
                <table style={{ textAlign: "center" }} >
                    <tr><th> Employees under your care</th></tr>

                    {this.props.staff.map(x => {
                        return (<tr><td> { x.name}</td></tr>
                        )
                    })}
                   
                    
                </table>
            </div>)
    }
}
export default DepartmentHeadEmployee