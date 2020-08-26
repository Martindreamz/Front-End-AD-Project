import React, { Component } from "react"
import Header from '../Components/Headers/Header';
import PlaceOrderTable from "../Components/PlaceOrderTable"
import './RecievedGoods.css';
import './general.css';
import { domain } from '../Configurations/Config';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import PlaceOrderPopup from '../Components/PlaceOrderPopup';
import Utils from "../Utils";


class PlaceOrder extends Component {
    constructor() {
        super()
        this.state = {
            recommended:[],
            today: "",
            subTotal: 0,
            //get data
            stationeries: [],
            suppliers: [],
            //formatted data
            data: [],
            selected: {},
            selectAll: 0,
            purchaseOrders: [],
            isEditing: false,
            redirect: false,
            displayPopup: false,
            identity: JSON.parse(sessionStorage.getItem("mySession"))
        }
        this.handleChange = this.handleChange.bind(this);
        this.addItem = this.addItem.bind(this)
        this.setRedirect = this.setRedirect.bind(this);
        this.postPO = this.postPO.bind(this)
    }

    closePopup = () => {
        this.setState({
            displayPopup: false
        })
    }

    //Run once before render - lifecycle
    async componentDidMount() {
        var date = new Date().toLocaleString()

        //HTTP get all suppliers
        axios.get('https://localhost:5001/api/Store/Suppliers')
            .then(response => {
                const items = response.data;
                this.setState({ suppliers: items });
                console.log(response)
            })

        //HTTP get reorderItems
        await axios.get('https://localhost:5001/api/Store/getReorderItems')
            .then(response => {
                const supplieritems = response.data;
                this.setState({ stationeries: supplieritems });
                var reorder = []
                //var data = items
                supplieritems.forEach(item => {
                    const sitems = []
                    const url = 'https://localhost:5001/api/Store/getSupplierItems/' + item.id
                    axios.get(url)
                        .then(response => {
                            const items = response.data;

                            items.forEach(sItem => {
                                const newsitem = {
                                    supplierId: sItem.supplierId,
                                    //map in suppliername
                                    supplierName: this.state.suppliers.find(supplier => supplier.id == sItem.supplierId).name,
                                    priority: this.state.suppliers.find(supplier => supplier.id == sItem.supplierId).priority,
                                    price: sItem.price                       
                                };
                                sitems.push(newsitem)
                            })

                            const order = {
                                id: item.id,
                                desc: item.desc,
                                qty: item.reOrderQty,
                                unit: item.unit,
                                selectedSupplier: sitems[0],
                                //nest supplier items
                                supplierItems: sitems
                            };
                            reorder.push(order)
                        })
                })

                this.setState({
                    data: reorder,
                    recommended:reorder,
                    today: date,
                    //isEditing:true
                })

            })

    }

    updateSubtotal() {
        const dict = this.state.selected;
        console.log(this.state.selected)
        var newSubtotal = 0;
        for (var key in dict) {
            if (dict[key]) {
                var price = this.state.data.find(item => item.id == key).selectedSupplier.price
                var qty = this.state.data.find(item => item.id == key).qty

                if (price != null && qty != 0) {
                    newSubtotal += (price * qty)
                }
            }

        }

        this.setState({ subTotal: newSubtotal })

    }

    handleChange(event, index) {
        const { name, value } = event.target;
        console.log('name',name,'value',value)
        if (name == "selectedSupplier") {
            this.setState(prevState => {
                const reorder = [...prevState.data];

                //reorder array
                const newSupplierItems = []
                const selectedSupplier = reorder[index].supplierItems.find(s => s.supplierId == value)
                newSupplierItems.push(selectedSupplier)
                reorder[index].supplierItems.forEach(supplierItem => supplierItem.supplierId != value && newSupplierItems.push(supplierItem))

                //set state
                reorder[index] = {
                    ...reorder[index],
                    selectedSupplier: selectedSupplier,
                    supplierItems: newSupplierItems
                }
                return { data: reorder }
            })
        }

        

        

        if (name == "submit") {
            console.log('handle submit')
            console.log('from submit',this.state.selected)

            const dict = this.state.selected

            if (dict == null) alert('No reorder items selected')

            console.log('dict:', dict)
            var newSelectedItems = [];
            var purchaseOrders = []

            //get all selected objects
            Object.entries(dict).forEach(([key, value]) => {
                value &&
                    this.state.data.map(item => item.id == key && newSelectedItems.push(item))     
            });

            console.log('newSelectedItems:', newSelectedItems)

            //get all unique supplier ids
            var suppliers = new Set(newSelectedItems.map(item => item.selectedSupplier.supplierId))
            console.log('supplier', suppliers)


            //group all selectedItems by supplier Id and create PO
            suppliers.forEach(supplier => {
               
                var spodetails = []
                var poBySupplier = []

                //group all selectedItems by supplier Id
                newSelectedItems.map(item => item.selectedSupplier.supplierId == supplier && poBySupplier.push(item))

                //create PO details
                poBySupplier.forEach(item => {
                    const detail =
                    {
                     
                        stationeryId: item.id,
                        qty: item.qty
                    }
                    spodetails.push(detail)

                })


                //create PO
                var purchaseOrder = {
                    //clerkId: this.state.identity,
                    clerkId: 15,
                    SupplierId: supplier,
                    status: "ordered",
                    StockAdjustmentId: 1,
                    DetailList: spodetails
                }

                purchaseOrders.push(purchaseOrder)
                console.log('POs', purchaseOrder)
               

            })

            this.setState({
                purchaseOrders: purchaseOrders,
                redirect: true

            }, () => { this.postPO() }

            )
        }

        if (name == "qty") {
            this.setState(prevState => {
                const reorder = [...prevState.data];

                //set state
                reorder[index] = {
                    ...reorder[index],
                    [name]: parseInt(value)
                }
                return { data: reorder }
            })

        }

        if (name == "reset") {
            const Recdata = this.state.recommended
            this.setState({ data: Recdata, isEditing: false })
           
        }

        if (name == "save") {
            this.setState({ isEditing: false })
        }

        else {
            this.setState({
                [name]: value
            })
        }

        console.log([name], value)
    }

    async postPO() {
        console.log("state POs:", this.state.purchaseOrders)
        axios.post('https://localhost:5001/api/Store/generatePO', this.state.purchaseOrders).then(response => {
            console.log(response)
        }, () => this.setRedirect()
  )
           
    }

    setRedirect() {
        console.log('set redirect')
        this.setState({
            redirect:true
        })

    }

    renderRedirect = () => {
        console.log('render redirect')
        if (this.state.redirect) {
            return <Redirect to='/PurchaseOrderSubmit' />
        }
    }

    addItem(event) {
        const { name, value } = event.target;
        if (name == "selectAll") {
            let newSelected = {};
            if (this.state.selectAll === 0) {
                this.state.data.map((item) => {
                    newSelected[item.id] = true;
                });
            }

            this.setState({
                selected: newSelected,
                selectAll: this.state.selectAll === 0 ? 1 : 0,
            }, () => { this.updateSubtotal() });
       
        }

        if (name == "select") {
            //console.log('select')
            const newSelected = Object.assign({}, this.state.selected);
            newSelected[value] = !this.state.selected[value];

            this.setState({
                selected: newSelected,
                selectAll: 0,
            }, () => { this.updateSubtotal() });

            console.log(this.state.selected)
        }

        if (name == "addNewItem") {
            this.setState(prevState => {
                const CurrData = prevState.data
                CurrData.push(value)
                return { data: CurrData }
            })
        }

    }

    addNewItem = (item) => {
        console.log('parent get data',item)
    this.setState(prevState => {
        const CurrData = prevState.data
        CurrData.push(item)
        return { data: CurrData }
    })
}

    render() {
        var CurrencyFormat = require('react-currency-format')
        return (
            <div>
                <Header />
                {this.state.redirect == true &&
                    <Redirect to='/placeOrderSubmit' />
                }
                <h1>{this.state.redirect}</h1>
                {this.state.displayPopup ?
                    <PlaceOrderPopup
                        data={this.state.data}
                        closePopup={this.closePopup}
                        newItem={this.addNewItem}
                    /> : null}
                {this.state.data != null &&
                    <div className="tableBody">
                        <PlaceOrderTable
                            data={this.state.data}
                            onEdit={this.state.isEditing}
                            handleChange={this.handleChange}
                            addItem={this.addItem}
                            all={this.state.selectAll}
                            selected={this.state.selected}
                            iconButton={this.handleIconButton}
                        />
                        <br />
                        <div className="tablebottom">
                            <h3>Sub total:
                        <CurrencyFormat
                                    value={this.state.subTotal}
                                    decimalScale={2}
                                    thousandSeparator={true}
                                    fixedDecimalScale={true}
                                    displayType={'text'}
                                    prefix={'$'} />
                            </h3>
                            <br />
                            {this.state.isEditing ?
                                <div>
                                    <button name="displayPopup" value={true} onClick={this.handleChange} className="button">Add Items</button>
                                    <button name="reset" className="button" onClick={this.handleChange}>Cancel</button>
                                    < button name="save" value={false} className="button" onClick={this.handleChange}>Save</button>
                                </div>
                                :
                                <div>
                                    < button name="isEditing" value={true} className="button" onClick={this.handleChange}>Edit</button>

                                    <button name="submit" className="button" name="submit" onClick={this.handleChange}>Submit</button>

                                </div>}
                        </div>
                    </div>}
            </div>
        )
    }

}

export default PlaceOrder
