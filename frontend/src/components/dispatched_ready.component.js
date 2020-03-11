import React, {Component} from 'react';
import axios from 'axios';
import Homevendor from "./homevendor.component";


export default class Dispatched_ready extends Component {
    
    constructor(props) {
        super(props);
        this.state = {products: []}

       

        this.onClick = this.onClick.bind(this);

    }

    componentDidMount() {
        axios.get('http://localhost:4000/dispatched_ready')
             .then(response => {
                 this.setState({products: response.data});
                 console.log(response.data);
             })
             .catch(function(error) {
                 console.log(error);
             })
    }
    onClick(e) {

        const newproduct={
            id: e
        }
        axios.post('http://localhost:4000/dispatchbutton', newproduct)
        .then(function(res){
            console.log(res)
             //window.location='/homevendor';
           });
           this.setState({
               id: ''
           });

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
                            <th>Dispatch</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.products.map((currentUserd, i)=>{
                            
                              
                                if(currentUserd.curr_quantity==0 && currentUserd.cancel===false && currentUserd.dispatched===false)
                                {
                                    return (
                                <tr>
                                    <td>{currentUserd.name}</td>
                                    <td>{currentUserd.price}</td>
                                    {/* <td>{""+currentUserd.dispatched}</td> */}
                                    {/* <td>{currentUserd.quantity}</td>
                                    <td>{currentUserd.curr_quantity}</td> */}
                                    <td>
                                        <button class="btn btn-outline-success my-2 my-sm-0" onClick={e => this.onClick(currentUserd._id)}>Dispatch</button>
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