import React, {Component} from 'react';

import './Header.css'

class Header extends Component {
    constructor() {
        super()
        this.state = {}
    }

    render () {
        return (
            <div>
                <header className="app-header">
                   <span id="logo">
                       Image Viewer
                   </span>
                </header>
            </div>
        )
    }
}

export default Header