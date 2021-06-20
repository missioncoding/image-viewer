import React, {Component} from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import {withStyles} from '@material-ui/core/styles';

import './Login.css';
import Header from '../../common/header/Header';

const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 240,
        maxWidth: 240
     }
});

class Login extends Component {
    constructor() {
        super()
        this.state = {}
    }

    render () {
        const {classes} = this.props;
        return (
        <div>
            <Header baseurl={this.props.baseurl}/>
            <div className="login-card">
                <Card>
                    <CardContent>
                        <FormControl className={classes.formControl}>
                        </FormControl>
                    </CardContent>
                </Card>
            </div>
        </div>
        )
    }
}

export default withStyles(styles)(Login);
