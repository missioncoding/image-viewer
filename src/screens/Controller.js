import React, { Component } from 'react';
import Home from '../screens/home/Home';
import Login from '../screens/login/Login';
import Profile from '../screens/profile/Profile';

import { BrowserRouter as Router, Route } from 'react-router-dom';

class Controller extends Component {

    constructor() {
        super();
    }
    render() {
        return (
            <Router>
                <div className="main-controller">
                    <Route exact path='/' render={({ history }, props) => <Login {...props} history={history} />} />
                    <Route exact path='/home' render={({ history }, props) => <Home {...props} history={history} />} />
                    <Route exact path='/profile' render={({ history }, props) => <Profile {...props} history={history} />} />
                </div>
            </Router>
        )
    }
}

export default Controller;