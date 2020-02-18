import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"


import Login from './login.component'
import Newproduct from './newproduct.component'
import Dispatched_ready from './dispatched_ready.component'
import Showproduct from './showproduct.component'
import Showmyproduct from './showmyproduct.component'

export default class Homevendor extends Component {

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }


  onClick(e) {
    e.preventDefault();
   
       window.location='/';
  }

  render(){
      return(
        <Router>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">vendor</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
            <Link to='/showproduct' className="nav-link">show products</Link>
            </li>
            <li class="nav-item">
              <Link to='/newproduct' className="nav-link">new products</Link>

            </li>
            <li class="nav-item">
              <Link to='/showmyproduct' className="nav-link">show my products</Link>
            </li>
            <li class="nav-item">
              <Link to='/dispatched_ready' className="nav-link">Dispatched products</Link>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Dropdown
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Something else here</a>
              </div>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
          </form>
          {/* <Link to='/' className="nav-link"> */}
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.onClick}>
                 Log Out
                </button>
                {/* </Link> */}

        </div>
      </nav>
      <Route path='/newproduct' component={Newproduct}/>
      <Route path='/showproduct' component={Showproduct}/>
      <Route path='/dispatched_ready' component={Dispatched_ready}/>
      <Route path='/showmyproduct' component={Showmyproduct}/>
      </Router>
    )
    }
}