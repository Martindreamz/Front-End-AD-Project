import React, { Component } from "react";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import "./InventoryTable.css";

class DepartmentHeadApproval extends Component {
  constructor() {
    super();
    
  }

    render() {

        return (
            <div>
                <table classname="componentTable">
                    <tr className="tableHeader"><th> Pending Stationery Request</th><th colspan='2'> Action</th><th> Comments</th></tr>
                    {this.props.requisition.map(x => {
                        return (
                            <tr classname="tableRow"><Accordion>
                                <AccordionSummary>
                                    <td> {x.EmployeeId}</td><td><button className="redButton">Reject</button></td><td><button className="greenButton">Approve</button></td><textarea />
                                </AccordionSummary>
                                <AccordionDetails>
                                    Testing details</AccordionDetails>
                            </Accordion>
                            </tr>
                        )
                    })}

                </table>
            </div>)
    }
}
export default DepartmentHeadApproval;
