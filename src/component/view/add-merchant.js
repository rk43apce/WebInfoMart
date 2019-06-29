import React, {Component} from 'react';
import { Row,Col, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

export default class AddMerchnat extends Component {

    constructor(props){
        super(props)        
    }

    addMerchnat=(e)=>{
        e.preventDefault()
        let {name, description } =  e.target
        let formData = {
            id:Date.now() / 1000 | 0,
            name: name.value,
            description: description.value,
            status: 'Inactive',
            addOn: new Date().toLocaleString(),
        }
        this.saveMerchant(formData)
    }

    saveMerchant=(merchant)=>{       
        let merchants = JSON.parse(localStorage.getItem("merchants") || "[]");
        merchants.push(merchant);      
        localStorage.setItem("merchants", JSON.stringify(merchants));
        this.props.getMerchant()
        this.toggle()
    }


    toggle=()=>{
        this.props.toggleModal()        
    }

    render(){

        let{isModal} = this.props        

        return(
            <div className="">
                <Modal isOpen={isModal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Add Merchant details</ModalHeader>
                    <form onSubmit={this.addMerchnat}>
                        <ModalBody>                            
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" name="name" className="form-control" placeholder="Enter marchant name..." required={true}/>
                            </div>
                            <div className="form-group">
                                <label>Description</label>                         
                                <textarea name="description" className="form-control" name="description" required={true} placeholder="Enter description here..."/>
                            </div>   
                        </ModalBody>
                        <ModalFooter>
                            <button type="submit" className="btn btn-primary">Submit</button>
                            <button type="button" onClick={this.toggle} className="btn btn-default">Cancel</button>
                        </ModalFooter>
                    </form>
                </Modal>       
            </div>            
        )
    }

}