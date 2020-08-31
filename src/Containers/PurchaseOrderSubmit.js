// JavaScript source code

import React, { Component } from "react"
import PurchaseOrder from "../Components/PurchaseOrder"
import PurchaseOrderTable from "../Components/PurchaseOrderTable"
import Header from '../Components/Headers/Header';
import "./general.css"
import axios from 'axios';
import Pdf from "react-to-pdf";
import { domain, api } from '../Configurations/Config';



class PurchaseOrderSubmit extends Component {

    constructor() {
        super()
        this.state = {
            data: [],
            Allpos:[],
            currentPO: null,
            Suppliers: null,
            uSuppliers: null
        }
        this.handleChange = this.handleChange.bind(this)
        this.setUniqueSuppliers = this.setUniqueSuppliers.bind(this)

    }

    componentDidMount() {
      
        const data = [];
        const Suppliers = [];
       

        axios.get(api + 'api/Store/getAllPOs').then(response => {
            //console.log('get all POs', response.data);
            const AllPo = response.data;


            AllPo.forEach(po => {
                const Pod = [];
                //var subTotal = 0;

                //get supplier 
                const Supplierurl = api + 'api/Store/getSupplier/' + po.supplierId
                axios.get(Supplierurl).then(supplier => {
                    const sup = supplier.data


                    Suppliers.push(sup)

                    //get clerk details
                    const Clerkurl = api + 'api/Store/getEmployee/' + po.clerkId
                    axios.get(Clerkurl).then(clerk => {
                        const clerk1 = clerk.data

                        const Podurl = api + 'api/Store/getPOD/' + po.id
                        axios.get(Podurl).then(pod => {
                            const pods = pod.data

                            //get stationeries for description and unit
                            pods.forEach(pod => {
                                const podurl = api + 'api/Store/Stationeries/' + pod.stationeryId

                                axios.get(podurl).then(stationery => {
                                    const desc = stationery.data.desc
                                    const unit = stationery.data.unit

                                    const supUrl = api + 'api/Store/getSupplierItems/' + pod.stationeryId
                                    axios.get(supUrl).then(supItem => {

                                        const price = supItem.data.find(sitem => sitem.supplierId === sup.id).price
                                      
                                        const FormattedPod = {
                                            id: pod.stationeryId,
                                            desc: desc,
                                            unit: unit,
                                            qty: pod.qty,
                                            price: price
                                        }
                                        Pod.push(FormattedPod)

                                    })
                                })
                            })
                    

                            const record = {
                                poNum: po.id,
                                date: po.dateOfOrder,
                                clerk: clerk1,
                                Sname: sup.name,
                                supplierId: sup.id,
                                supplier: sup,
                                status: po.status,
                                StockAdjustmentId: po.StockAdjustmentId,
                                pod: Pod,
                                subtotal: po.subTotal
                            }

                            data.push(record)

                            //sort by supplier priority
                            data.sort((a, b) => b.poNum - a.poNum)

                        })

            
                        this.setState({
                            
                                Allpos: data,
                            suppliers: Suppliers,
                                data:data

                            }, () => this.setUniqueSuppliers())

                  
                        })

                    });
                });
            })
    }

    setUniqueSuppliers() {
        const sSet = new Set(this.state.suppliers.map(s => s.id))
        const usups = []
        sSet.forEach(id => {
            const usup = this.state.suppliers.find(supplier => supplier.id == id)
            usups.push(usup)
        })

        const sorted_list = usups.sort((a, b) => b.priority- a.priority)
        this.setState({ uSuppliers: sorted_list })
        console.log('AllPOs', this.state.Allpos)

    }

   
    handleChange(event,index) {
        const { name, value } = event.target;
        console.log('name', name, 'value', value, 'index', index)

        if (name == 'data') {
            const newData = value == 'all' ? this.state.Allpos :
                this.state.Allpos.filter(po => po.supplierId == value)

            console.log('new data', newData)
            this.setState({
                data: newData,
                currentPO:null
            })
        }

        if (name == 'view') {
            this.setState(prevState => {
                const targetData = prevState.data[index];
                return { currentPO: targetData }
            })

        }

        if (name == "delivered") {
            this.setState(prevState => {
                const reorder = [...prevState.data];
                

                const id = reorder[index].poNum
                console.log('id', id)
                window.location.href = domain + 'receivedGoods/' + id
                return { data: reorder }
            })
        }
    }

    render() {

        var tabs = this.state.uSuppliers!=null && this.state.uSuppliers.map((item) => 
            <button
                key={item.id}
                name="data"
                class="button"
                value={item.id}
                onClick={this.handleChange}
            >
                {item.name}
            </button>
        )
        const ref = React.createRef();

        return (

            <div>
                <Header />
                <div className="tableBody">
                    <div className="btn-group">
                        <button name="data" class="button" value='all' onClick={this.handleChange}>All</button>
                        {this.state.suppliers!=null && tabs}
                    </div>
                    {this.state.currentPO != null &&
                        <div>
                        <Pdf targetRef={ref} filename="PurchaseOrder.pdf">    
                            {({ toPdf }) => (
                                <button class="button" onClick={toPdf}>Export</button>
                            )}
                        </Pdf>
                        <div ref={ref}>
                            <PurchaseOrder
                                data={this.state.currentPO}
                                />
                        </div>
                    </div>
                    }
                    {this.state.currentPO == null && this.state.data.length!=0 &&
                            < PurchaseOrderTable
                            data={ this.state.data }
                            handleChange={ this.handleChange }
                        />}
                    </div>
                   
                </div>
           
        )


    }

}

export default PurchaseOrderSubmit
