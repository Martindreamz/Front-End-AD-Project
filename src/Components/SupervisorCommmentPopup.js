import React, { Component } from 'react';
import './StockAdjustmentPopup.css';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

class SupervisorCommmentPopup extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
        <div className="detailContainer">
            <div className="commentSubmitContainer">
                        <HighlightOffIcon onClick={this.props.closePopup} />
                        <div className="col-sm-12 mb-1 text-center white-background-color">
                            <h4>Are you sure to reject?</h4>
                        </div>
                        <div className="row mt-1">
                            <div  className="col-sm-3 text-center white-background-color">
                                Enter Comment:
                            </div>
                            <div  className="col-sm-9 text-center white-background-color">
                                <textarea rows="3" cols="40" className="form-control" ref="comment" />
                            </div>
                        </div>
                        
                        <div  className="col-sm-12 text-center white-background-color">
                            <button class="btn btn-primary mt-1" onClick={()=>this.props.submitRejectComment(this.refs.comment.value)}> Submit</button>
                        </div>
            </div>
        </div>
        )
    }
}

export default SupervisorCommmentPopup;