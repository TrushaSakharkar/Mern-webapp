import React, {Component} from 'react';
import axios from 'axios';
import Homevendor from "./homevendor.component";


export default class Showproduct extends Component {
    
    constructor(props) {
        super(props);
        this.state = {products: []}
    }

    componentDidMount() {
        axios.get('http://localhost:4000/showproduct')
             .then(response => {
                 this.setState({products: response.data});
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
                            <th>Price</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.products.map((currentUserd, i) => {
                            return (
                                <tr>
                                    <td>{currentUserd.name}</td>
                                    <td>{currentUserd.price}</td>
                                    <td>{currentUserd.quantity}</td>
                                    
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