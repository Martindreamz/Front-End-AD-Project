import React, { Component } from "react";
import "./InventoryTable.css";

class DepartmentHeadEmployee extends Component {
  constructor() {
    super();
    /*this.state() = {
            staff: [],
            requisition: [],
            department: ""
        }*/
    }

    render() {

        return (
            <div style={{ overflowY: "scroll", height:"100px"}}>
                <table className="componentTable">
                    <tr className="tableHeader"><th> Employees under your care</th></tr>

                    {this.props.staff.map(x => {
                        return (<tr className="tableRow"><td> { x.name}</td></tr>
                        )
                    })}
                   
                    
                </table>
            </div>)
    }
}
export default DepartmentHeadEmployee;
