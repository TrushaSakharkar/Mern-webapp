import React, {Component} from 'react';
import axios from 'axios';
import Homecustomer from "./homecustomer.component";


export default class Searchproduct extends Component {
    
    constructor(props) {
        super(props);
        this.state = {products: [],
                    vendors:[],
                    value:0
        }

       this.onBuy = this.onBuy.bind(this);
       this.onChangevalue = this.onChangevalue.bind(this);
       this.sortvalues = this.sortvalues.bind(this);
       this.getRating = this.getRating.bind(this);
    }
    onChangevalue(event) {
        this.setState({ value: event.target.value });
        console.log({ value:event.target.value});
    }
    getRating(e) {
        if (this.state.vendors.length) {
            console.log(this.state.vendors);
            return this.state.vendors.find(vendor => vendor.username === e).rating;
        }
    }
    sortvalues(products) {
        var sortable = [];
        for (var product in products) {
            sortable.push(products[product]);
        }

        if (localStorage.getItem("sort") == "Price") {
            return (sortable.sort((a, b) => a.price < b.price ? -1 : (a.price > b.price ? 1 : 0)));
        }
        if (localStorage.getItem("sort") == "Quantity") {
            return (sortable.sort((a, b) => a.curr_quantity - b.curr_quantity));
        }
       
        return products;
    }
    onBuy(e) {
        console.log("buy",e);

        const newUser = {
            id:e,
            value:this.state.value
        };
        axios.post('http://localhost:4000/addtocustomer', newUser)
        .then(function(res){
            console.log(res)    
        }).catch(function(err){
            console.log(err);
        });   


    }

    componentDidMount() {
        axios.get('http://localhost:4000/searchproduct2')
             .then(response => {
                 this.setState({products: response.data});
                 console.log(response.data);
             })
             .catch(function(error) {
                 console.log(error);
             })
        axios.get('http://localhost:4000/')
             .then(response => {
                 this.setState({vendors: response.data});
                 console.log(response.data);
             })
             .catch(function(error) {
                 console.log(error);
             })
    }
    
  



    render() {
        return (
            <div>
                <Homecustomer />

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Vendor</th>
                            <th>Rating</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            {/* <form name="f1" action="#" >
                <input id="edit1" type="submit" name="edit" value="Edit"></input>
                </form> */}
                            <th>Buy</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.sortvalues(this.state.products).map((currentUserd, i)=>{
                            
                            if(currentUserd.dispatched===false && currentUserd.cancel===false)
                            {
                                    return (
                                <tr>
                                    <td>{currentUserd.username}</td>
                                    <td>{this.getRating(currentUserd.username)}</td>
                                    <td>{currentUserd.price}</td>
                                    <td>{currentUserd.curr_quantity}</td>
                                    <td>
                                        <input type="number" 
                                        id="quantity" 
                                        name="quantity" 
                                        placeholder="quantity" 
                                        class="input-xs"
                                        onChange={this.onChangevalue}
                                        />
                                    </td>
                                    <td>
                                        <button class="btn btn-outline-success my-2 my-sm-0" onClick={e => this.onBuy(currentUserd._id)}>Buy</button>
                                    </td>
                                </tr>
                                    )
                                      
                                    // }  
                                    }
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}