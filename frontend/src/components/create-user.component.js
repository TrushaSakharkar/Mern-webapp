import React, {Component} from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password:'',
            vendor:''
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeVendor = this.onChangeVendor.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangeUsername(event) {
        this.setState({ username: event.target.value });
    }
    onChangePassword(event) {
        this.setState({ password: event.target.value });
        console.log({ password:event.target.value});
    }
    onChangeVendor(event) {
        this.setState({ vendor: event.target.value });
    }
   
    onSubmit(e) {
        e.preventDefault();

        
        const newUser = {
            username: this.state.username,
            vendor: this.state.vendor,
            password: this.state.password
        }

        axios.post('http://localhost:4000/add', newUser)
        .then(function(res){
            console.log(res)
                  if(res.data=='1')
                  {
                  window.location='/';
                  }
                  else if(res.data=='2')
                {
                  window.location='/login';

                }
                else if(res.data=='4'){
                    //window.location='/homecustomer';
                    localStorage.setItem("gotname",newUser.username);
                    console.log("register",localStorage.getItem("gotname"));

                }
                else if(res.data=='3'){
                   // window.location='/homevendor';
                    localStorage.setItem("gotname",newUser.username);
                    console.log("register",localStorage.getItem("gotname"));

                }

                });
        console.log("hsbcka");

        this.setState({
            username: '',
            password: '',
            vendor: ''
        });

    }

    render() {
        return (
            <div>
                <form class="form-horizontal" action='' method="POST" onSubmit={this.onSubmit}>
                    <fieldset>
                    <div id="legend">
                        <legend class="">Register</legend>
                    </div>
                    <div class="control-group">
                        <label class="control-label"  for="username">Username: </label>
                        <div class="controls">
                        <input type="text" 
                               id="username" 
                               name="username" 
                               placeholder="" 
                               class="input-xlarge"
                               value={this.state.username}
                               onChange={this.onChangeUsername}
                               />
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label"  for="password">Password: </label>
                        <div class="controls">
                        <input type="text" 
                               id="password" 
                               name="password" 
                               placeholder="" 
                               class="input-xlarge"
                               value={this.state.password}
                               onChange={this.onChangePassword}
                               />
                        </div>
                    </div>
                    <div class="from-group">
                        <label class="control-label"  for="vendor">Enter 'Vendor' / 'Customer': </label>
                        <div class="controls">
                        <input type="dropdown" 
                               id="vendor" 
                               name="vendor" 
                               placeholder="" 
                               class="input-xlarge"
                               value={this.state.vendor}
                               onChange={this.onChangeVendor}
                               />
                        </div>
                    </div>
                    <div class="control-group">
                    <div class="controls">
                        <button class="btn btn-success">Submit</button>
                    </div>
                    </div>
                    </fieldset>
                </form>
            </div>
        )
    }
}