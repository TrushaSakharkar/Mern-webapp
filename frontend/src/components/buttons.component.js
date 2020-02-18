import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import CreateUser from './create-user.component'
import Login from './login.component'

export default class Homevendor extends Component {

    render(){
        return(
          <Router>
             <Link to="/login">
                <button class="btn btn-success">
                 login
                </button>
              </Link>
      <Link to="/create">
                <button class="btn btn-success">
                 Register
                </button>
              </Link>
              <Route path='/login' component={Login}/>
      <Route path='/create' component={CreateUser}/>

          </Router>
        )}
}