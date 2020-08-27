import React, { Component } from "react";
import Header from '../Components/Headers/Header';
import { domain } from '../Configurations/Config';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import RequisitionApplyForm from '../Components/RequisitionApplyForm';
import RequisitionHistoryDetails from "../Components/RequisitionHistoryDetails";
import RequisitionHistoryDetailsView from "./RequisitionHistoryDetailsView";

class RequisitionForm extends React.Component {
    constructor() {
        super()
        this.state = {
            //identity: JSON.parse(sessionStorage.getItem("mySession")),
            reqData: [],

            dropdownData: [],
            category: [],
            //data: [],
            editSupObj: [], isEdit: false,
            showRequestForm: false,
            showReqList: false
        }
        this.goHistory = this.goHistory.bind(this)
    }

    addRequisition(previousState) {
        this.setState(
            {
                isEdit: false,
                showRequestForm: !previousState,
            }
        )
        this.componentDidMount();
    }

    editRequestForm(requisition) {
        this.setState({
            editSupObj: requisition,
            isEdit: true,
            showRequestForm: true,
        });
    }

    goHistory(previousState) {
        this.setState({
            showReqList: previousState,
            //showForm: false
        });
    }

    
    //Run once before render - lifecycle
    async componentDidMount() {
        //HTTP get request
        axios.get('api here')
            .then(response => {
                const items = response.reqData;
                this.setState({ reqData: items });
            })

        await this.setState(prevState => {
            //get distinct category name
            const categoryName = [...new Set(prevState.reqData.map(item => item.category))]

            var data = []
            categoryName.forEach(name => {
                const itemName = name
                //get array of object with category == name
                const categoryData = prevState.reqData.map(item => {
                    if (name == item.category) {
                        return item
                    }
                    return null
                }).filter(item => item != null)
                data.push(categoryData)
            })
            console.log(data)
            return {
                dropdownData: data,
                category: categoryName
            }

        })
    }

    render() {
        return (
            <div>
                <Header />

                {this.state.showReqList ?
                    <RequisitionHistoryDetailsView goHistory={this.goHistory} />
                    :
                    <div className="row" >
                        <RequisitionApplyForm editSupObj={this.state.editSupObj} isEdit={this.state.isEdit} data={this.state.dropdownData} category={this.state.category} goHistory={this.goHistory} />
                    </div>
                }

            </div>

        )
    }
}

export default RequisitionForm;