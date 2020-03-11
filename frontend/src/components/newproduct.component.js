import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios';



import Homevendor from './homevendor.component'

export default class Newproduct extends Component {
    constructor(props) {
        super(props);

        this.state = {
           username: '',
            name:'',
            price:'',
            quantity:'',
            curr_quantity:0

        }
        console.log("hdbcadcdb");

    //   this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangename = this.onChangename.bind(this);
        this.onChangeprice = this.onChangeprice.bind(this);
        this.onChangequantity = this.onChangequantity.bind(this);
     //   this.onChangecurr_quantity = this.onChangecurr_quantity.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

   

    // onChangeUsername(event) {
    //     this.setState({ username: event.target.value });
    // }
    onChangename(event) {
        this.setState({ name: event.target.value });
        console.log({ name:event.target.value});
    }
    onChangeprice(event) {
        this.setState({ price: event.target.value });
    }
    onChangequantity(event) {
        this.setState({ quantity: event.target.value });
    }
   
    onSubmit(e) {
        e.preventDefault();

       

        axios.get('http://localhost:4000/getusername')
        .then(function(res){
         localStorage.setItem("gotname" ,res.data);
        });           
        
        const newUser = {
            username: localStorage.getItem("gotname"),
             name: this.state.name,
             price: this.state.price,
             quantity: this.state.quantity,
             curr_quantity: this.state.curr_quantity
         }

        axios.post('http://localhost:4000/addproduct', newUser)
             .then(function(res){
                 // console.log(res)
                  window.location='/homevendor';
                });

        this.setState({
           username: '',
            name: '',
            price: '',
            quantity: '',
            curr_quantity: 0
        });
    
    }

    render() {
        return (
            
            <div>
            <Homevendor />
                <form class="form-horizontal" action='' method="POST" onSubmit={this.onSubmit}>
                    <fieldset>
                    <div id="legend">
                        <legend class="">Add Product</legend>
                    </div>
                    {/* <div class="control-group">
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
                    </div> */}
                    <div class="control-group">
                        <label class="control-label"  for="name">Product Name: </label>
                        <div class="controls">
                        <input type="text" 
                               id="name" 
                               name="name" 
                               placeholder="" 
                               class="input-xlarge"
                               value={this.state.name}
                               onChange={this.onChangename}
                               />
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label"  for="price">Enter price: </label>
                        <div class="controls">
                        <input type="text" 
                               id="price" 
                               name="price" 
                               placeholder="" 
                               class="input-xlarge"
                               value={this.state.price}
                               onChange={this.onChangeprice}
                               />
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label"  for="price">Enter quantity: </label>
                        <div class="controls">
                        <input type="text" 
                               id="quantity" 
                               name="quantity" 
                               placeholder="" 
                               class="input-xlarge"
                               value={this.state.quantity}
                               onChange={this.onChangequantity}
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