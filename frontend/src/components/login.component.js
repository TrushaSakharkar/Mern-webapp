import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios';

import CreateUser from './create-user.component'
import HomePage from './homecustomer.component'


export default class Login extends Component {
      constructor(props) {
        super(props);

        this.state = {
            username: '',
            password:''
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeUsername(event) {
        this.setState({ username: event.target.value });
    }
    onChangePassword(event) {
        this.setState({ password: event.target.value });
        console.log({ password:event.target.value});
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            username: this.state.username,
            vendor: this.state.vendor,
            password: this.state.password
        }

        axios.post('http://localhost:4000/search', newUser)
            .then(function(res){
               if(res.data=='1')
               {
              window.location='/create';
               }
               else if(res.data=='4'){
               window.location='/homecustomer';
                localStorage.setIte
                ("gotname",newUser.username);
                console.log("register",localStorage.getItem("gotname"));
            }
            else if(res.data=='3'){
                window.location='/homevendor';
                localStorage.setItem("gotname",newUser.username);
                console.log("register",localStorage.getItem("gotname"));
            }
              
            });

        this.setState({
            username: '',
            password: ''
        });
    }
        render(){
            return(
                <Router>
                <div>
                    <form class="form-horizontal" action='' method="POST" onSubmit={this.onSubmit}>
                      <fieldset>
                        <div id="legend">
                          <legend class="">LOG IN</legend>
                        </div>
                        <div class="control-group">
                          <label class="control-label"  for="username">Username</label>
                          <div class="controls">
                            <input type="text" 
                                   id="username"
                                   name="username" 
                                   placeholder="" 
                                   class="input-xlarge"
                                   value={this.state.username}
                                   onChange={this.onChangeUsername}
                                   />
                            <p class="help-block">Username can contain any letters or numbers, without spaces</p>
                          </div>
                        </div>
                        <div class="control-group">
                          <label class="control-label" for="password">Password</label>
                          <div class="controls">
                            <input type="password" 
                                   id="password"
                                   name="password" 
                                   placeholder="" 
                                   class="input-xlarge"
                                   value={this.state.password}
                                   onChange={this.onChangePassword}
                                   />
                            <p class="help-block">Password should be at least 4 characters</p>
                          </div>
                        </div>
                        <div class="control-group">
                          <div class="controls">
                            <button class="btn btn-success">Submit</button>
                          </div>
                        </div>
                        {/* <p>If new user Register here.</p>
                        <Link to="/create">
                            <button class="btn btn-success">
                                        Register
                             </button>
                       </Link> */}
                      </fieldset>
                    </form>
                  </div>
                  <Route path='/create' component={CreateUser}/>
                  <Route path='/home' component={HomePage}/>
              </Router>
            )
        }
    }