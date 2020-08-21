import React, { Component } from "react";
import Header from '../Components/Headers/Header';
import { domain } from '../Configurations/Config';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import RequisitionApplyForm from '../Components/RequisitionApplyForm';
import RequisitionFormTable from '../Components/RequisitionFormTable';
import AddCircleIcon from '@material-ui/icons/AddCircle';

class RequisitionForm extends React.Component {
    constructor() {
        super()
        this.state = {
            reqData: [
                {
                    id: 1,
                    category: "Clip",
                    description: "Clips Double 2",
                    quantity: 10,
                    unit: "Dozen"
                },
                {
                    id: 2,
                    category: "Pen",
                    description: "Pen Ballpoint Black",
                    quantity: 1,
                    unit: "Box"
                },
                {
                    id: 3,
                    category: "Scrissors",
                    description: "Scissors",
                    quantity: 3,
                    unit: "Each"
                },
                {
                    id: 4,
                    category: "Eraser",
                    description: "Eraser (soft)",
                    quantity: 20,
                    unit: "Each"
                },
                {
                    id: 5,
                    category: "Eraser",
                    description: "Eraser (soft)",
                    quantity: 20,
                    unit: "Dozen"
                }
            ],

            dropdownData: [
                {
                    clips: [
                        {

                        }
                    ]
                }
            ],
            category: [],
            //data: [],
            editSupObj: [], isEdit: false,
            showRequestForm: false,
        }
        this.addRequisition = this.addRequisition.bind(this)
        this.editRequestForm = this.editRequestForm.bind(this)
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
                <div className="requisitionFormBody">
                    {!this.state.showRequestForm ?
                        <div>
                            <AddCircleIcon onClick={() => this.addRequisition(this.state.showRequestForm)} /> {"Add Item Here"}</div>
                        : null}
                </div>
                <div className="row" >
                    {!this.state.showRequestForm ?
                        <div className="col-sm-12  ">
                            <RequisitionFormTable reqData={this.state.reqData} editRequestForm={this.editRequestForm} />
                        </div>
                        : null
                    }
                    {this.state.showRequestForm || this.state.isEdit ?
                        <RequisitionApplyForm editSupObj={this.state.editSupObj} isEdit={this.state.isEdit} data={this.state.dropdownData} category={this.state.category} />
                        : null
                    }
                </div>
            </div>

        )
    }
}

export default RequisitionForm;