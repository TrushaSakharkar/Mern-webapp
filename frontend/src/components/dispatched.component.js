import React, {Component} from 'react';
import axios from 'axios';
import Homevendor from "./homevendor.component";

export default class Dispatched extends Component {
    
    constructor(props) {
        super(props);
        this.state = {products: [],
                       customers:[]
                     }
       this.getRating = this.getRating.bind(this);

    }
    
    
    getRating(e) {
        if (this.state.products.length) {
           // console.log(this.state.products);
            return( this.state.products.find(vendor => vendor.product === e));
           // console.log(vendor.length)
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/dispatched')
             .then(response => {
                 this.setState({products: response.data});
                 console.log(response.data);
             })
             .catch(function(error) {
                 console.log(error);
             })
        axios.get('http://localhost:4000/customers')
             .then(response => {
                 this.setState({customers: response.data});
                 console.log(response.data);
             })
             .catch(function(error) {
                 console.log(error);
             })
    }
    render() {
        return (
            <div>
                <Homevendor />

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Product name</th>
                            <th>Customer</th>
                            <th>Rating</th>
                            <th>Review</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.customers.map((currentUserd, i)=>{
                            for (let index = 0; index <  this.state.products.length; index++) {
                                const element =  this.state.products[index];
                                if ( this.state.products[index].name===currentUserd.product) {
                                    break;
                                }                                
                            }
                                    return (
                                <tr>
                                    <td>{currentUserd.product}</td>
                                    <td>{currentUserd.username}</td>
                                    <td>{currentUserd.rating}</td>
                                    <td>{currentUserd.review}</td>
                                  
                                </tr>
                                    )
                      
                                
                            
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}