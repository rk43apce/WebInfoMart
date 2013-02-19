import React, {Component} from 'react';
import { Row,Col, Collapse, Button } from 'reactstrap';
import AddMerchnat from './add-merchant';
import EditMerchnat from './edit-merchant';
import Pagination from './pagination';

export default class Merchnat extends Component {

    constructor(props){
        super(props)

    }

    state={
        isModal: false,
        merchants:[],
        isEdit: false,
        editMerchantId:false,
        actionType:null,
        isHistoryOpen: false,
        logHistory:[],
        search:'',
        currentPage: 1,
        msg:''
        
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

    updateStatus= (merchantId, currentStatus )=>{

        let isConfirme = window.confirm('Are you sure?')

        if(!isConfirme){
            return 
        }

        let status = ''
        if(currentStatus === 'Inactive'){
            status = 'Active'
        }else{
            status = 'Inactive'
        }
        let {merchants} =  this.state
        const objIndex = merchants.findIndex(obj => obj.id == merchantId);
        const updatedObj = { ...merchants[objIndex], status: status};
        const updatedMerchant = [
            ...merchants.slice(0, objIndex),
            updatedObj,
            ...merchants.slice(objIndex + 1),
        ];
        localStorage.setItem("merchants", JSON.stringify(updatedMerchant)); 

        this.savelogHistory(merchantId, 'Status Updated')
        this.getLogHistory(merchantId)

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

    toggleHistory=(merchantId)=>{
        let {isHistoryOpen} = this.state
        if(isHistoryOpen === merchantId){
            merchantId= false;
        }
        this.setState({isHistoryOpen:merchantId})

        this.getLogHistory(merchantId)
    }

    savelogHistory=(merchantId, msg)=>{
        let logAt = new Date().toLocaleString();  
        let logHistory = JSON.parse(localStorage.getItem('logHistory') || "[]");
        let logHistoryInfo = {
            merchantId : merchantId,
            msg : msg,
            logAt : logAt,
        }
        logHistory.push(logHistoryInfo);     
        localStorage.setItem("logHistory", JSON.stringify(logHistory));
    }

    getLogHistory=(merchantId)=>{
        let logHistory = JSON.parse(localStorage.getItem("logHistory") || "[]");
        let history = logHistory.filter(history=> history.merchantId == merchantId) 
        this.setState({logHistory:history})
    }

    toggleModal=(value)=>{   
        let {isModal} = this.state
        this.setState({isModal: !isModal, actionType:value})
    }

    onSearch=(e)=>{
        
        let searchTag = e.target.value
        this.setState({search:searchTag})
    }

    setCurrentPage=(pageNumber)=>{
        this.setState({currentPage:pageNumber})
    }

    render(){

        let {isModal, merchants, editMerchantId, actionType, isHistoryOpen, logHistory, search, currentPage} =  this.state

        const merchantPerPage = 10
        const indexOfLastMerchant = currentPage * merchantPerPage;       
        const indexOfFirstMerchant = indexOfLastMerchant - merchantPerPage;   

        let filterMerchants = merchants.filter(merchant=>{           
            return(

                merchant.id.toString().toLowerCase().search(search.toLowerCase()) !=-1 ||
                merchant.name.toString().toLowerCase().search(search.toLowerCase()) !=-1 ||
                merchant.description.toString().toLowerCase().search(search.toLowerCase()) !=-1 ||
                merchant.status.toString().toLowerCase().search(search.toLowerCase()) !=-1
            )
        })

        const currentMerchants = filterMerchants.slice(indexOfFirstMerchant, indexOfLastMerchant);

        return(
            <div className="container mt-5">
                <div className="card shodow p-3">
                    <Row>
                        <Col xs={6}>
                            <div className="panel-heading pb-3">
                                <h4>Merchant Management System</h4>  
                            </div>
                        </Col>
                   
                    </Row>
                    
                    <div className="panel-body">    
                        <ul className="list-group"> 
                        <li className="list-group-item ">
                            <Row>
                            <Col xs={6} className="">
                            <div className="text-left">
                         
                                <Button onClick={()=>this.toggleModal('addMerchant')} color="primary" size="sm"><i className="fa fa-plus" aria-hidden="true"></i> Add Merchant</Button>                           
                            </div> 
                                </Col>
                                <Col xs={6} className="search-panel">  
                                    <input type="text" className="form-control" name="search" placeholder="Search here... " autoFocus onChange={this.onSearch} />
                                    <span className="search">
                                        <i className="fa fa-search"></i>
                                    </span>
                                </Col>   
                            </Row>        
                        </li>                      
                        <li className="list-group-item bg-light ">
                            <Row>
                                
                                
                                <Col xs={9}>
                                    <Row>
                                
                                        <Col xs={3}> Merchant ID </Col>
                                        <Col xs={3}> Merchant Name  </Col>
                                        <Col xs={3}> Description </Col>
                                        <Col xs={2}> Status </Col>
                                    </Row>
                                </Col>   
                                <Col xs={3}>
                                    <Row>
                                    <Col xs={12}> Actions </Col>  
                                    </Row>
                                </Col>                         
                            </Row>        
                        </li>
                        
                        {

                            currentMerchants?

                            currentMerchants.map((merchant,i)=>{
                                return(
                                    <li className="list-group-item" key={merchant.id} >
                                        
                                    <Row>
                                        <Col xs={9}>
                                            <Row  className="m-row" >
                                            
                                                <Col xs={3}> 
                                                <button type="button" className="btn btn-link btn-sm pl-0">
                                                <i 
                                                className={`fa fa-${merchant.id == isHistoryOpen?
                                                "minus"
                                                :
                                                "plus"
                                                }-circle 

                                                text-${merchant.id == isHistoryOpen?
                                                    "danger"
                                                    :
                                                    "success"
                                                    }`

                                                } 

                                                onClick={()=>this.toggleHistory(merchant.id)}>
                                                </i>  
                                                </button>
                                                {merchant.id }
                                                
                                                </Col>
                                                <Col xs={3}> {merchant.name }</Col>
                                                <Col xs={3}> {merchant.description }</Col>
                                                <Col xs={2}> {merchant.status }</Col> 
                                            </Row>                                        
                                        </Col>     
                                        <Col xs={3}>
                                            <Row>
                                                <Col xs={12}>    
                                                    <ul className="nav action">   
                                                        <li className="nav-item ">
                                                            <a className="nav-link" href="#" onClick={()=>this.editMerchant(merchant.id)} ><i className="fa fa-edit"></i></a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link" href="#"
                                                                onClick={()=>this.removeMerchant(merchant.id)}
                                                            ><i className="fa fa-trash" aria-hidden="true"></i></a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link" href="#"
                                                                onClick={()=>this.updateStatus(merchant.id, merchant.status)}
                                                            >                   
                                                            {
                                                            merchant.status === 'Active'?
                                                                'Deactivate'
                                                                :
                                                                'Activate'
                                                            }
                                                            </a>
                                                        </li>             
                                                    </ul>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row> 

                                    <Collapse isOpen={merchant.id == isHistoryOpen}>
                                        <Row className="mt-2 border-top" >
                                            <Col xs={12}>
                                                <div className="history p-3">
                                                <h5>Intraction Histroy</h5>
                                                    <ul className=" timeline">
                                                        {
                                                            logHistory.map((history,i)=>{
                                                         
                                                                return(
                                                                <li key={i}>
                                                                   Admin    
                                                                    <span className="float-right">
                                                                       {
                                                                           history.logAt
                                                                       }
                                                                    </span>
                                                                    <p>
                                                                    {
                                                                           history.msg
                                                                       }
                                                                    </p>
                                                                </li>
                                                                )
                                                            })
                                                        }   
                                                    </ul> 
                                                </div>
                                            </Col>                                        
                                        </Row>   
                                    </Collapse> 

                                    </li>
                                )
                                })
                            :

                            ""      
                        }  

                        <li className="list-group-item ">                
                            <Pagination
                                merchantPerPage={merchantPerPage}
                                totalmerchant={merchants.length} 
                                setCurrentPage={this.setCurrentPage} 
                            />
                            
                        </li>    
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
                        savelogHistory={this.savelogHistory}
                        getLogHistory={this.getLogHistory}
                        />
                        :
                        null   
                    }                
                            
                </div>                
            </div>            
        )
    }

}