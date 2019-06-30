import React, {Component} from 'react';

export default class Pagination extends Component{

    constructor(props){
        super(props)
    }

    render(){

      console.log(this.props)

      let {merchantPerPage, totalmerchant} = this.props

        let pageNumbers = []
        
        for (let i = 1; i <= Math.ceil(totalmerchant / merchantPerPage); i++) {
            pageNumbers.push(i);
        }


        return(
            <nav>
            <ul className='pagination'>
              {pageNumbers.map(number => (
                <li key={number} className='page-item'>
                  <a  href='#' onClick={()=>this.props.setCurrentPage(number)}  className='page-link'>
                    {number}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )
    }

}

