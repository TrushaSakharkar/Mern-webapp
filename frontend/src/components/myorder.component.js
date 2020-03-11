import React, {Component} from 'react';
import axios from 'axios';
import Homecustomer from "./homecustomer.component";


export default class Myorder extends Component {
    
    constructor(props) {
        super(props);
        this.state = {products: [],
                      review:0,
                      edit:0,
                      productreview:'',
                      productrating:0
                    }
        console.log("myorder");
        this.onCancel = this.onCancel.bind(this)
        this.onReview = this.onReview.bind(this)
        this.onEdit = this.onEdit.bind(this)
        this.onProductreview = this.onProductreview.bind(this)
        this.onChangeReview = this.onChangeReview.bind(this)
        this.onChangeProductrating = this.onChangeProductrating.bind(this)
        this.onChangeProductreview = this.onChangeProductreview.bind(this)
        this.onChangeEdit = this.onChangeEdit.bind(this)
    console.log("bscvsjbxcbs");


    }
    onChangeEdit(event) {
        this.setState({ edit: event.target.value });
        console.log({ edit:event.target.value});

    }
    onChangeProductrating(event) {
        this.setState({ productrating: event.target.value });
        console.log({ productrating:event.target.value});

    }
    onChangeProductreview(event) {
        this.setState({ productreview: event.target.value });
        console.log({ productreview:event.target.value});

    }
    onProductreview(e){
        const editn={
            id:e,
            productreview:this.state.productreview,
            productrating:this.state.productrating
        }
        console.log(editn)
        axios.post('http://localhost:4000/productreview', editn)
        .then(function(res){
            console.log(res.data)
          
        })
    }
    onEdit(e){
            const editn={
                id:e,
                edit:this.state.edit
            }
            console.log(editn)
            axios.post('http://localhost:4000/edit', editn)
            .then(function(res){
                console.log(res.data)
                if(res.data=='no')
                {
                    alert('Cannot edit');
                }
            })
    }
    onChangeReview(event) {
        this.setState({ review: event.target.value });
        console.log({ review:event.target.value});

    }
    onReview(e,f){

        const newUser = {
            vendor:e,
            review:this.state.review
        };
        console.log(newUser);

        axios.post('http://localhost:4000/review', newUser)
        .then(function(res){
            console.log(res.data)
        })

    }
    onCancel(e,f) {

        const newUser = {
            vendor:e,
            product:f
        };
        console.log(newUser);

        axios.post('http://localhost:4000/status', newUser)
        .then(function(res){
            console.log(res)  
            if(res.data=='cancel') 
            {
                alert("Canceled");
            } 
            else if(res.data=='dispatch') 
            {
                alert("Dispatched");
            } 
            else if(res.data=='palce') 
            {
                alert("Placed");
            } 
            else  
            {
                //console.log(res.data);
                alert("Waiting for "+res.data+" more orders");
            } 
        }).catch(function(err){
            console.log(err);
        });   
    }

   

    componentDidMount() {
        axios.get('http://localhost:4000/myorder')
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
                <Homecustomer />

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Vendor</th>
                            <th>Product name</th>
                            <th>Quantity</th>
                            <th>Status</th>
                            <th>Edit</th>
                            <th>Vendor Review</th>
                            <th>Product Review</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.products.map((currentUserd, i) => {
                            
                               
                                    return (
                                <tr>
                                    <td>{currentUserd.vendor}</td>
                                    <td>{currentUserd.product}</td>
                                    <td>{currentUserd.quantity}</td>
                                    <td>
                                        <button class="btn btn-outline-success my-2 my-sm-0" onClick={e => this.onCancel(currentUserd.vendor,currentUserd.product)}>
                                            Status
                                        </button>
                                    </td>
                                    <td>
                                        <input type="number" 
                                        id="edit" 
                                        name="edit" 
                                        placeholder="edit" 
                                        class="input-xs"
                                        onChange={this.onChangeEdit}
                                        />
                                        <button class="btn btn-outline-success my-2 my-sm-0" onClick={e => this.onEdit(currentUserd._id)}>
                                            Edit
                                        </button>
                                    </td>
                                    <td>
                                        <input type="number" 
                                        id="rating" 
                                        name="rating" 
                                        placeholder="rating" 
                                        class="input-xs"
                                        onChange={this.onChangeReview}
                                        />
                                    <button class="btn btn-outline-success my-2 my-sm-0" onClick={e => this.onReview(currentUserd.vendor,currentUserd.product)}>
                                            Rating /5
                                        </button>
                                        </td>
                                    <td>
                                    <input type="texth" 
                                        id="Product review" 
                                        name="Product review" 
                                        placeholder="Product review" 
                                        class="input-xs"
                                        onChange={this.onChangeProductreview}
                                        />
                                    <input type="number" 
                                        id="Product Rating" 
                                        name="Product Rating" 
                                        placeholder="Product Rating" 
                                        class="input-xs"
                                        onChange={this.onChangeProductrating}
                                        />
                                    <button class="btn btn-outline-success my-2 my-sm-0" onClick={e => this.onProductreview(currentUserd._id)}>
                                            Rating /5
                                        </button>
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