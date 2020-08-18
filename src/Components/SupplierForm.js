import React, { useState,createRef,useEffect,Component } from 'react';
import Header from '../Components/Headers/Header';

class SupplierForm extends React.Component {
   constructor(props) {
        super(props);
        this.state = {
            message: ''
        };
    }

    reset = () =>{
      this.setState({message:' '});
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

      fetch('https://localhost:5001/api/Supplier', {
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
        <div>
        <Header />
        <div id="supplier-post">
              <form>
                    <div className="form-group">
                        <label className="col-sm-2 control-label required" htmlFor="supplierCode">Supplier Code</label>
                        <div className="col-sm-10">
                            <input type="text"
                                   id="supplierCode"
                                   required="required"
                                   ref="supplierCodeRef"
                                   className="form-control"/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-2 control-label required" htmlFor="name">Name</label>
                        <div className="col-sm-10">
                            <input type="text"
                                   id="name"
                                   required="required"
                                   ref="nameRef"
                                   className="form-control"/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-2 control-label required" htmlFor="contactPerson">Contact Person</label>
                        <div className="col-sm-10">
                            <input type="text"
                                   id="contactPerson"
                                   required="required"
                                   ref="contactPersonRef"
                                   className="form-control"/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-2 control-label required" htmlFor="email">Email</label>
                        <div className="col-sm-10">
                            <input type="text"
                                   id="email"
                                   required="required"
                                   ref="emailRef"
                                   className="form-control"/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-2 control-label required" htmlFor="phoneNum">Phone</label>
                        <div className="col-sm-10">
                            <input type="text"
                                   id="phoneNum"
                                   required="required"
                                   ref="phoneNumRef"
                                   className="form-control"/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-2 control-label required" htmlFor="gstRegisNo">GST Registeration No</label>
                        <div className="col-sm-10">
                            <input type="text"
                                   id="gstRegisNo"
                                   ref="gstRegisNoRef"
                                   className="form-control"/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-2 control-label required" htmlFor="phone">Fax</label>
                        <div className="col-sm-10">
                            <input type="text"
                                   id="fax"
                                   required="required"
                                   ref="faxRef"
                                   className="form-control"/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-2 control-label required" htmlFor="address">Address</label>
                        <div className="col-sm-10">
                            <textarea 
                                   id="address"
                                   required="required"
                                   ref="addressRef"
                                   className="form-control"
                                   rows="3" cols="40"/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-2 control-label required" htmlFor="supplierCode">Priority</label>
                        <div className="col-sm-10">
                            <select id="priority"
                                   required="required"
                                   className="form-control" ref="priorityRef">

                                   <option value="1st">
                                   First 
                                   </option>
                                   <option value="2nd">
                                   Second 
                                   </option>
                                   <option value="3rd">
                                   Third 
                                   </option>

                            </select>
                        </div>
                    </div>

                   
                    
                    <div className="form-group">
                        <div className="col-sm-2"></div>
                        <div className="col-sm-10">
                            <button type="button"
                                    id="supplier_post_submit"
                                    className="btn-default btn"
                                    onClick={this.add}>
                                Submit
                            </button>
                            <div className="col-sm-2"></div>
                            <input type="reset" className="btn-default btn"
                                    onClick={this.reset} value = "Reset"/>
                        </div>
                    </div>
            </form>
                    <p>{this.state.message}</p>
                </div>
        </div>
      );
    }
}


export default SupplierForm;
