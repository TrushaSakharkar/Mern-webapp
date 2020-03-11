import React, { Component } from 'react';
import axios from 'axios';

export default class Start extends Component {
  render() {
    return (
      <center>
      <div>
        <a href="/login">
          <button class="btn btn-success">
            Login
                  </button>
        </a>
        <a href="/create">
          <button class="btn btn-success">
            Register
                  </button>
        </a>
      </div>
      </center>
      )
  }
}