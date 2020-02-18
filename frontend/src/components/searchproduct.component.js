import React, {Component} from 'react';
import axios from 'axios';

export default class Searchproduct extends Component {
    
    constructor(props) {
        super(props);
        this.state = {products: [],
                    value:0
        }

       this.onClick = this.onClick.bind(this);
       this.onChangevalue = this.onChangevalue.bind(this);

        console.log("naba")


    }
    onChangevalue(event) {
        this.setState({ value: event.target.value });
        console.log({ value:event.target.value});
    }

    onClick(e) {
        e.preventDefault();
        console.log("buy");

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
    }
    
  



    render() {
        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Vendor</th>
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
                        this.state.products.map((currentUserd, i)=>{
                            
                              
                                    return (
                                <tr>
                                    <td>{currentUserd.username}</td>
                                    <td>{currentUserd.price}</td>
                                    <td>{currentUserd.quantity}</td>
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
                                        <button class="btn btn-outline-success my-2 my-sm-0" onClick={e => this.onCancel(currentUserd._id)}>Buy</button>
                                    </td>
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