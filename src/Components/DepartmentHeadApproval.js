import React, { Component } from "react";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
                    {this.props.requisition.map(x => {
                        return (
                            <tr><Accordion>
                                <AccordionSummary>
                                    <td> {x.EmployeeId}</td><td><button>Reject</button></td><td><button>Approve</button></td><textarea />
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
export default DepartmentHeadApproval