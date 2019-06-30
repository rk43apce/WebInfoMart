import React, {Component} from 'react';
import { Row,Col, Collapse } from 'reactstrap';
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
        currentPage: 1
        
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
        const indexOfLastPost = currentPage * merchantPerPage;       
        const indexOfFirstPost = indexOfLastPost - merchantPerPage;   

        let filterMerchants = merchants.filter(merchant=>{           
            return(

                merchant.status.toLowerCase().search(search.toLowerCase()) !=-1 ||
                merchant.name.toLowerCase().search(search.toLowerCase()) !=-1 || 
                merchant.description.toLowerCase().search(search.toLowerCase()) !=-1 
            )
        })

        const currentMerchants = filterMerchants.slice(indexOfFirstPost, indexOfLastPost);

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
                        <li className="list-group-item ">
                            <Row>
                            <Col xs={6} className="">
                                   
                                </Col>
                                <Col xs={6} className="">
                                    <input type="text" className="form-control" name="search" placeholder="Search here... " autoFocus onChange={this.onSearch} />
                                </Col>   
                            </Row>        
                        </li>                      
                        <li className="list-group-item bg-light ">
                            <Row>
                                
                                
                                <Col xs={8}>
                                    <Row>
                                        <Col xs={2}> S.No </Col>
                                        <Col xs={4}> Merchant Name  </Col>
                                        <Col xs={4}> Description </Col>
                                        <Col xs={2}> Status </Col>
                                    </Row>
                                </Col>   
                                <Col xs={4}>
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
                                        <Col xs={8}>
                                            <Row  className="m-row" onClick={()=>this.toggleHistory(merchant.id)}>
                                                <Col xs={2}> {i+1 }</Col>
                                                <Col xs={4}> {merchant.name }</Col>
                                                <Col xs={4}> {merchant.description }</Col>
                                                <Col xs={2}> {merchant.status }</Col> 
                                            </Row>                                        
                                        </Col>     
                                        <Col xs={4}>
                                            <Row>
                                                <Col xs={12}>    
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
                                        </Col>
                                    </Row> 

                                    <Collapse isOpen={merchant.id == isHistoryOpen}>
                                        <Row className="mt-2 border-top" >
                                            <Col xs={12}>
                                                <div className="history p-3">
                                                <h4>Intraction Histroy</h4>
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