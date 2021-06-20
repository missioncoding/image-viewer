import React, {Component} from 'react';
import Home from '../screens/home/Home';
import Login from '../screens/login/Login';

import {BrowserRouter as Router,Route} from 'react-router-dom';

class Controller extends Component {

    constructor() {
        super();
        this.baseurl="http://localhost:8080/";
    }
    render() {
        return (
            <Router>
                <div className="main-controller">
                    <Route exact path='/' render={(props) => <Login {...props} baseurl = {this.baseurl}/>} />
                </div>
            </Router>
        )
    }
}

export default Controller;