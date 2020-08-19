import React, { useState,createRef,useEffect,Component } from 'react';
import Header from '../Components/Headers/Header';
//import 'bootstrap/dist/css/bootstrap.min.css';

class SupplierForm extends React.Component {
   constructor(props) {
        super(props);
        this.state = {
            message: '',
            currentSupplierObj: [],
        };

        this.initialState = { 
          id : '', 
          supplierCode: '',  
          name: '',  
          contactPerson: '',  
          gstRegisNo: '',  
          fax: '',  
          address: '',  
          priority: '',
          email: '',  
          phoneNum: '', 
        }  
      
        if (props.isEdit) {  
          this.state.currentSupplierObj = props.editSupObj  
        } else {  
          this.state.currentSupplierObj = this.initialState; 
        } 
    }

    reset = () =>{
      this.setState({message:''});
    }

    add = () =>{
      let supplier = {
        supplierCode: this.refs.supplierCodeRef.value,
        name: this.refs.nameRef.value,
        contactPerson :this.refs.contactPersonRef.value,
        gstRegisNo :this.refs.gstRegisNoRef.value,
        fax: this.refs.faxRef.value,
        address :this.refs.addressRef.value,
        priority: this.refs.priorityRef.value,
        email : this.refs.emailRef.value,
        phoneNum : this.refs.phoneNumRef.value,
      }

      fetch('https://localhost:5001/api/Store/saveSupplier', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(supplier)
      }).then(res => res.json()).then(tom => {
          this.setState({message:'New Supplier is Created Successfully'});
      });
    }

    render(){
      return (
        <div class="container .bg-light" >
          <div class="row">
              <div class="col-md-12 mx-auto text-center">
                  <p class="display-4">Supplier Detail Form</p>
                  {this.state.message== ''? null: 
                    <div class="alert alert-primary" role="alert">
                      {this.state.message}
                    </div>
                  }
              </div>
              <div class="col-md-12 mx-auto">
                  <form>
                      <div class="form-group row">
                          <div class="col-sm-6">
                              <label for="supplierCode">Supplier Code</label>
                              <input type="text"
                                         id="supplierCode"
                                         required="required"
                                         ref="supplierCodeRef"
                                         value={this.state.currentSupplierObj.supplierCode}  
                                         className="form-control"/>
                          </div>
                          <div class="col-sm-6">
                              <label for="inputLastname">GST Registeration No</label>
                              <input type="text"
                                         id="gstRegisNo"
                                         ref="gstRegisNoRef"
                                         value={this.state.currentSupplierObj.gstRegisNo} 
                                         className="form-control"/>
                          </div>
                      </div>
                      <div class="form-group row">
                          <div class="col-sm-6">
                              <label for="name">Name</label>
                              <input type="text"
                                         id="name"
                                         required="required"
                                         ref="nameRef"
                                         value={this.state.currentSupplierObj.name} 
                                         className="form-control"/>
                          </div>
                          <div class="col-sm-6">
                              <label for="contactPerson">Contact Person</label>
                              <input type="text"
                                         id="contactPerson"
                                         required="required"
                                         ref="contactPersonRef"
                                         value={this.state.currentSupplierObj.contactPerson} 
                                         className="form-control"/>
                          </div>
                      </div>
                     
                      <div class="form-group row">
                          <div class="col-sm-6">
                              <label for="phoneNum">Phone No</label>
                              <input type="text"
                                         id="phoneNum"
                                         required="required"
                                         ref="phoneNumRef"
                                         value={this.state.currentSupplierObj.phoneNum} 
                                         className="form-control"/>
                          </div>
                          <div class="col-sm-3">
                              <label for="fax">Fax</label>
                              <input type="text"
                                         id="fax"
                                         required="required"
                                         ref="faxRef"
                                         value={this.state.currentSupplierObj.fax} 
                                         className="form-control"/>
                          </div>
                          <div class="col-sm-3">
                              <label for="email">email</label>
                              <input type="text"
                                   id="email"
                                   required="required"
                                   ref="emailRef"
                                   value={this.state.currentSupplierObj.email} 
                                   className="form-control"/>
                          </div>
                      </div>
              
              <div class="form-group row">
                          <div class="col-sm-6">
                              <label for="priority">Priority</label>
                              <select id="priority"
                                         required="required"
                                         className="form-control" ref="priorityRef">

                                         <option value="1st" selected={this.state.currentSupplierObj.priority=='1st'?"selected":''}>
                                         First 
                                         </option>
                                         <option value="2nd" selected={this.state.currentSupplierObj.priority=='2nd'?"selected":''}>
                                         Second 
                                         </option>
                                         <option value="3rd" selected={this.state.currentSupplierObj.priority=='3rd'?"selected":''}>
                                         Third 
                                         </option>

                                  </select>
                          </div>

                          <div class="col-sm-6">
                              <label for="address">Address</label>
                              <textarea 
                                         id="address"
                                         required="required"
                                         ref="addressRef"
                                         value={this.state.currentSupplierObj.address} 
                                         className="form-control"
                                         rows="3" cols="40"/>
                          </div>
                      </div>

              <input type="reset" class="btn btn-danger px-4 float-right ml-1" onClick={this.reset} value = "Reset"/>
              <button type="button" id="supplier_post_submit"
                     class="btn btn-primary px-4 float-right mr-1"
                     onClick={this.add}> Save </button>
                  </form>
              </div>
          </div>
      </div>
      );
    }
}

export default SupplierForm;
