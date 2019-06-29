import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import Merchnat from './component/view';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

var products = [{
  id: 1,
  name: "Product1",
  price: 120
}, {
  id: 2,
  name: "Product2",
  price: 80
},
{
  id: 2,
  name: "Product2",
  price: 80
},
{
  id: 2,
  name: "Product2",
  price: 80
},
{
  id: 2,
  name: "Product2",
  price: 80
},
{
  id: 2,
  name: "Product2",
  price: 80
},
{
  id: 2,
  name: "Product2",
  price: 80
},
{
  id: 2,
  name: "Product2",
  price: 80
},{
  id: 2,
  name: "Product2",
  price: 80
},{
  id: 2,
  name: "Product2",
  price: 80
},{
  id: 2,
  name: "Product2",
  price: 80
},{
  id: 2,
  name: "Product2",
  price: 80
},{
  id: 2,
  name: "Product2",
  price: 80
},

];

function Table() {
  return (
    <div className="App">
      <div className="container">
        {/* <Merchnat/> */}
        <BootstrapTable data={products} pagination  hover>
          <TableHeaderColumn isKey dataField='id' dataSort={ true } filter={ { type: 'NumberFilter' } }>Product ID</TableHeaderColumn>
          <TableHeaderColumn dataField='name' dataSort={ true } filter={ { type: 'TextFilter' } }>Merchnat Name</TableHeaderColumn>
          <TableHeaderColumn dataField='price' dataSort={ true }>Product Price</TableHeaderColumn>
        </BootstrapTable>,
      </div>
       
    </div>
  );
}

export default Table;
