import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import queryString from "query-string";
import "bootstrap/dist/css/bootstrap.min.css"

import CreateUser from './components/create-user.component'
import Login from './components/login.component'
import Homecustomer from './components/homecustomer.component'
import Homevendor from './components/homevendor.component'
import Searchproduct from './components/searchproduct.component'
import Showproduct from './components/showproduct.component'
import Showmyproduct from './components/showmyproduct.component'
import Newproduct from './components/newproduct.component'
import Dispatched_ready from './components/dispatched_ready.component'
import Dispatched from './components/dispatched.component'
import UsersList from './components/users-list.component';
import Start from './components/start.component';
import Myorder from './components/myorder.component';


function App() {
  return (
   <Router>
      <Route path='/' exact component={Start}/>
      <Route path='/users' exact component={UsersList}/>
      <Route path='/create' exact component={CreateUser}/>
      <Route path='/homecustomer' exact component={Homecustomer}/>
      <Route path='/searchproduct' exact component={Searchproduct}/>
      <Route path='/showproduct' exact component={Showproduct}/>
      <Route path='/showmyproduct' exact component={Showmyproduct}/>
      <Route path='/newproduct' exact component={Newproduct}/>
      <Route path='/dispatched_ready' exact component={Dispatched_ready}/>
      <Route path='/dispatched' exact component={Dispatched}/>
      <Route path='/login' exact component={Login}/>
      <Route path='/myorder' exact component={Myorder}/>
      <Route path='/homevendor' exact component={Homevendor}/>
    </Router>
  );
}

export default App;
