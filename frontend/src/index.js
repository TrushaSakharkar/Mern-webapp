// import React from "react";
// import ReactDOM from "react-dom";
// import "./index.css";
// import App from "./App";
// //import registerServiceWorker from "./registerServiceWorker";
// import { Route, Switch } from "react-router-dom";
// import { BrowserRouter } from "react-router-dom";
// ReactDOM.render(
//     <BrowserRouter>
//   <Switch>
//    <Route path="/" component={App} />
//   </Switch>
//  </BrowserRouter>,
//     document.getElementById("root")
// );
// registerServiceWorker();

/* GET Google Authentication API. */
// Router.get(
//     "/auth/google",
//     passport.authenticate("google", { scope: ["profile", "email"] })
// );
// Router.get(
//     "/auth/google/callback",
//     passport.authenticate("google", { failureRedirect: "/", session: false }),
//     function(req, res) {
//         var token = req.user.token;
//         res.redirect("http://localhost:3000?token=" + token);
//     }
// );

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();