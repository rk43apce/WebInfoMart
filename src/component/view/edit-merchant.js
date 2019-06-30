import React, {Component} from 'react';
import { Row,Col, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

export default class EditMerchnat extends Component {

    constructor(props){
        super(props)        
    }

    editMerchnat=(e)=>{
        e.preventDefault()
        let {merchants, editMerchantId} =  this.props
        let {name, description,status } =  e.target
        let formData = {
            id:editMerchantId,
            name: name.value,
            description: description.value,
            status: status.value,
        }     

        //find the index of object from array that you want to update
        let objIndex = merchants.findIndex(obj => obj.id === editMerchantId);

        let updatedMerchant = [
            ...merchants.slice(0, objIndex),
            formData,
            ...merchants.slice(objIndex + 1),
          ];

          localStorage.setItem("merchants", JSON.stringify(updatedMerchant)); 
          this.props.getMerchant()
          this.props.savelogHistory(editMerchantId, 'Update merchant information')
          this.props.getLogHistory(editMerchantId)
          this.props.toggleModal()   
    }

    toggle=()=>{
        this.props.toggleModal()        
    }

    render(){

        let{isModal, editMerchantId,merchants} = this.props      
        let editMerchantData = merchants.filter(merchant=> merchant.id == editMerchantId) 

        return(
            <div className="">
                <Modal isOpen={isModal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Edit Merchant details</ModalHeader>
                    <form onSubmit={this.editMerchnat}>
                        <ModalBody>                            
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" defaultValue={editMerchantData[0].name} name="name" className="form-control" placeholder="Enter marchant name..." required={true}/>
                            </div>
                            <div className="form-group">
                                <label>Description</label>                         
                                <textarea name="description" defaultValue={editMerchantData[0].description} className="form-control" name="description" placeholder="Enter description here..." required={true}/>
                            </div>  
                            <div className="form-group">
                            <input type="hidden" name="status" value={editMerchantData[0].status}/>
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