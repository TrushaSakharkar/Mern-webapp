import React, {Component} from 'react';
import axios from 'axios';

export default class Showmyproduct extends Component {
    
    constructor(props) {
        super(props);
        this.state = {products: []}

        this.onCancel = this.onCancel.bind(this);


    }

    onCancel(e) {

        console.log("hjdsvbfhewbfvcewhjbsf");
    }

    componentDidMount() {
        axios.get('http://localhost:4000/showmyproduct')
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
                            <th>Product name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Curr Quantity</th>
                            {/* <form name="f1" action="#" >
                <input id="edit1" type="submit" name="edit" value="Edit"></input>
                </form> */}
                            <th>cancel</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.products.map((currentUserd, i) => {
                            
                              
                                if(currentUserd.curr_quantity!='0')
                                {
                                    return (
                                <tr>
                                    <td>{currentUserd.name}</td>
                                    <td>{currentUserd.price}</td>
                                    <td>{currentUserd.quantity}</td>
                                    <td>{currentUserd.curr_quantity}</td>
                                    <td>
                                        <button class="btn btn-outline-success my-2 my-sm-0" onClick={e => this.onCancel(currentUserd._id)}>
                                            Cancel
                                        </button>
                                    </td>
                                </tr>
                                    )
                                    }
                                
                            
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}