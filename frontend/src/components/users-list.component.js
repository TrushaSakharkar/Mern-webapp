import React, {Component} from 'react';
import axios from 'axios';

export default class UsersList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {users: []}
    }

    componentDidMount() {
        axios.get('http://localhost:4000/')
             .then(response => {
                 this.setState({users: response.data});
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
                            <th>Username</th>
                            <th>Vendor</th>
                            <th>Password</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.users.map((currentUserd, i) => {
                            return (
                                <tr>
                                    <td>{currentUserd.username}</td>
                                    <td>{currentUserd.vendor}</td>
                                    <td>{currentUserd.password}</td>
                                    
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