// JavaScript source code

import React, { Component } from "react"
import PurchaseOrder from "../Components/PurchaseOrder"
import Header from '../Components/Headers/Header';
import "./general.css"
import Utils from "../Utils"
import axios from 'axios';
import Pdf from "react-to-pdf";


class PurchaseOrderSubmit extends Component {

    constructor() {
        super()
        this.state = {
            poId:[1,2],
            data: [],
            currentSupplier:"",
            currentPO: []
        }

    }

    componentDidMount() {
        var poId = Utils.getPoCreated()
        if (poId != null) {
            this.setState({ poId: poId })
        }
        console.log('poId', poId)
        const data = [];
        //get pos for each PO
        this.state.poId.forEach(id => {
            const subtotal=0
            const url = 'https://localhost:5001/api/Store/getPO/' + id
            axios.get(url).then(response => {
                const po = response.data;
                const Pod = [];
                this.setState({ pos: po });

               //console.log('response', response)
               // console.log('po', po)
               
                     //get supplier 
                const Supplierurl = 'https://localhost:5001/api/Store/getSupplier/' + po.supplierId
                    axios.get(Supplierurl).then(supplier => {
                        const sup = supplier.data
                        
                    
                    //get clerk details
                const Clerkurl = 'https://localhost:5001/api/Store/getEmployee/' + po.clerkId
                    axios.get(Clerkurl).then(clerk => {
                        const clerk1 = clerk.data
                        //console.log(clerk)

                        const Podurl = 'https://localhost:5001/api/Store/getPOD/' + id
                        axios.get(Podurl).then(pod => {
                            const pods = pod.data
                            //console.log('pod',pod)

                            //get stationeries for description and unit
                            pods.forEach(pod => {
                                const podurl = 'https://localhost:5001/api/Store/Stationeries/' + pod.stationeryId

                                axios.get(podurl).then(stationery => {
                                    const desc = stationery.data.desc
                                    const unit = stationery.data.unit


                                    //get supplier item (price)
                                    const supUrl = 'https://localhost:5001/api/Store/getSupplierItems/' + pod.stationeryId
                                    axios.get(supUrl).then(supItem => {

                                        const price = supItem.data.find(sitem => sitem.supplierId === sup.id).price
                                        //console.log('supItem', supItem)
                                        //create model for each row
                                        const FormattedPod = {
                                            id: pod.stationeryId,
                                            desc: desc,
                                            unit: unit,
                                            qty: pod.qty,
                                            price: price
                                        }
                                        Pod.push(FormattedPod)
                                        
                                        //console.log('formatted pod', FormattedPod )
                                    })
                                })
                            })

                            //if (Pod != null) {
                            //    subtotal = Pod.reduce(subtotal,(total, pod) => total + (pod.price * pod.qty))
                            //}

                    const record = {
                        poNum: po.id,
                        date: po.dateOfOrder,
                        clerk: clerk1,
                        supplier: sup,
                        pod: Pod,
                        subtotal: subtotal
                            }

                            data.push(record)
                            //sort by supplier priority
                            data.sort((a, b) => a.supplier.priority - b.supplier.priority)
                            console.log('data', data)

                            this.setState({
                                data: data,
                                currentSupplier: data[0].supplier,
                                currentPO: data[0],

                            })
                           // console.log('formatted record', record)
                            console.log('state data', this.state.data)
                            console.log('state currentPO', this.state.currentPO)

                    })
                
            });
                    });
                    });
            });
       

    }


    render() {
        //var sups = this.state.suppliers
        var tabs = this.state.data.map((item) =>
            <button key={item.poNum} name="currentSupplier" class="button" value={item.poNum}>{item.supplier.name}</button>
        )
        const ref = React.createRef();

        return (

            <div>
                <Header />
                <div className="tableBody">
                    <div className="btn-group">
                        {tabs}
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
                                currentSupplier={this.state.data} />
                        </div>
                        </div>
                        
                        }
                        <div style={{ width: 500, height: 500, background: 'blue' }} ref={ref} />
                    </div>
                   
                </div>
           
        )


    }

}

export default PurchaseOrderSubmit
