import React, {Component} from 'react';
import Header from '../../common/header/Header';
import './Home.css';

class Home extends Component {

    constructor() {
        super()
    }

    render () {
        return (
            <div>
               <Header baseurl={this.props.baseurl}/>
            </div>
        )
    }
}

export default Home