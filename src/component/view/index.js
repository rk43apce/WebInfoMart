import React, {Component} from 'react';
import { Row,Col } from 'reactstrap';
import AddMerchnat from './add-merchant';
import EditMerchnat from './edit-merchant';

export default class Merchnat extends Component {

    constructor(props){
        super(props)

    }

    state={
        isModal: false,
        merchants:[],
        isEdit: false,
        editMerchantId:false,
        actionType:null
        
    }

    componentDidMount(){
        this.getMerchant()
    }

    getMerchant=()=>{
        let merchants = JSON.parse(localStorage.getItem("merchants") || "[]");
        this.setState({merchants})
    }

    editMerchant=(merchantId)=>{
        let {isModal} =  this.state
        this.setState(
            {
                isModal: !isModal,
                editMerchantId:merchantId,
                actionType:'editModal'                
            }
        )
    }


    updateStatus=(merchantId, currentStatus )=>{

        let status = ''

        if(currentStatus === 'Inactive'){
            status = 'Active'
        }else{
            status = 'Inactive'
        }

        let {merchants} =  this.state
        //find the index of object from array that you want to update
        const objIndex = merchants.findIndex(obj => obj.id == merchantId);

        // make new object of updated object.   
        const updatedObj = { ...merchants[objIndex], status: status};

        // make final new array of objects by combining updated object.
        const updatedMerchant = [
            ...merchants.slice(0, objIndex),
            updatedObj,
            ...merchants.slice(objIndex + 1),
        ];

        localStorage.setItem("merchants", JSON.stringify(updatedMerchant)); 
        this.getMerchant()

    }


    removeMerchant=(removeMerchantId)=>{
        let { merchants} =  this.state
        let objIndex = merchants.findIndex(obj => obj.id === removeMerchantId);

        let isConfirme =  window.confirm("Are you sure?");

        if(isConfirme){
            merchants.splice(objIndex, 1);
        }

        localStorage.setItem("merchants", JSON.stringify(merchants));
        this.getMerchant()
    }

    toggleModal=(value)=>{   
        let {isModal} = this.state
        this.setState({isModal: !isModal, actionType:value})
    }

    render(){

        let {isModal, merchants, editMerchantId, actionType} =  this.state
   
        return(
            <div className="container mt-5">
                <div className="card shodow p-3">
                    <Row>
                        <Col xs={6}>
                            <div className="panel-heading pb-3">Merchant Management System</div>
                        </Col>
                        <Col xs={6}>
                            <div className="text-right">
                                <button className="btn btn-default" 
                                onClick={()=>this.toggleModal('addMerchant')}>
                                    +Add Merchant 
                                </button>                               
                            </div>                            
                        </Col>
                    </Row>
                    
                    <div className="panel-body">    
                        <ul className="list-group">
                        <li className="list-group-item bg-light ">
                            <Row>
                                <Col xs={2}>
                                    #ID
                                </Col>
                                <Col xs={2}>
                                    Merchant Name 
                                </Col>
                                <Col xs={2}>
                                    Description
                                </Col>                            
                                <Col xs={2}>
                                    Status
                                </Col>
                            
                                <Col xs={4}>
                                    Actions
                                </Col>
                            </Row>        
                        </li>
                            {

                                merchants?

                                merchants.map(merchant=>{
                                    return(
                                     <li className="list-group-item" key={merchant.id}>
                                         
                                       <Row>
                                       <Col xs={2}>
                                             {
                                                 merchant.id
                                             }
                                         </Col>
                                         <Col xs={2}>
                                             {
                                                 merchant.name
                                             }
                                         </Col>
                                         <Col xs={2}>
                                             {
                                                 merchant.description
                                             }
                                         </Col>
                                        
                                         <Col xs={2}>       
                                             {
                                                 merchant.status
                                             }
                                         </Col>
                                        
                                         <Col xs={4}>
                                             <ul className="nav">   
                                                 <li className="nav-item">
                                                     <a className="nav-link" href="#" onClick={()=>this.editMerchant(merchant.id)} >Edit</a>
                                                 </li>
                                                 <li className="nav-item">
                                                     <a className="nav-link" href="#"
                                                         onClick={()=>this.removeMerchant(merchant.id)}
                                                     >Delete</a>
                                                 </li>
                                                 <li className="nav-item">
                                                    <a className="nav-link" href="#"
                                                         onClick={()=>this.updateStatus(merchant.id, merchant.status)}
                                                     >
                                                         
                                                        {
                                                            merchant.status === 'Active'?
                                                            'Inactive'
                                                            :
                                                            'Active'
                                                        }

                                                    </a>
                                                 </li>             
                                             </ul>
                                         </Col>
                                       </Row>        
                                     </li>
                                    )
                                 })
                                :

                                ""
                                
                            


                            }      
                        </ul>
                    </div>               
                    {   
                        actionType === 'addMerchant'?
                        <AddMerchnat isModal={isModal} toggleModal={this.toggleModal} getMerchant={this.getMerchant}/>    
                        :
                        null   
                    }   

                     {   
                        actionType === 'editModal'?
                        <EditMerchnat isModal={isModal} toggleModal={this.toggleModal} editMerchantId={editMerchantId} merchants={merchants} 

                        getMerchant={this.getMerchant}

                        />
                        :
                        null   
                    }                
                            
                </div>                
            </div>            
        )
    }

}