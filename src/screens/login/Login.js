import React, {Component} from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import './Login.css';
import Header from '../../common/header/Header';

const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 380,
        maxWidth: 380
     },
});

class Login extends Component {
    constructor() {
        super()
        this.state = {
            username : "",
            password : "",
            usernameRequired : "dispNone",
            passwordRequired : "dispNone",
            invalidLogin : "dispNone"
        }
    }

    inputUserNameChangeHandler = (e) => {
        this.setState({username: e.target.value})
    }
    
    inputPasswordChangeHandler = (e) => {
        this.setState({password: e.target.value})
    }

    loginClickHandler = () => {
        let testUser = "scott"
        let testPassword = "tiger"
        let accessToken = "IGQVJValpYdl9JaFJjQXpZAbmJlOEk2dlo3bkhBWDg3U1ZASMldkamlaV0ZAJMDRCMnlkTzZAxT0pmWDF0NUFXRUEwbnJiMkVQcXpVc3UxVDhpX0VJN2lQNjFWek1Wdnd0Qnd2WHI2RzY2RUZALQXlnSFI4UEY3VW9nLVZAFNlhz"
        this.setState({invalidLogin:"dispNone"})
        this.state.username === "" ? this.setState({usernameRequired: "dispBlock"}) : 
                                     this.setState({usernameRequired: "dispNone"});
        this.state.password === "" ? this.setState({passwordRequired: "dispBlock"}) : 
                                     this.setState({passwordRequired: "dispNone"});
        
        if (this.state.username === "" || this.state.password === "" ) {
            return;
        }

        if (this.state.username === testUser && this.state.password === testPassword) {
            window.sessionStorage.setItem("access-token",accessToken)
            this.props.history.push({
                pathname: '/home',
                homepage: this.state
            })
        } else {
            this.setState({invalidLogin:"dispBlock"})
        }
    }

    render () {
        const {classes} = this.props;
        return (
        <div>
            <Header baseurl={this.props.baseurl}/>
            <div className="card-container">
                <Card className="login-card">
                    <CardContent>
                        <Typography variant="h6">
                            LOGIN
                        </Typography>
                     <br />
                    <FormControl required className={classes.formControl}>
                        <InputLabel htmlFor="username">UserName</InputLabel>
                        <Input id="username" type="text" username={this.state.username} onChange={this.inputUserNameChangeHandler}/>
                        <FormHelperText className={this.state.usernameRequired}>
                            <span className="red">required</span>
                        </FormHelperText>
                    </FormControl><br /><br />
                    <FormControl required className={classes.formControl}>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input id="password" type="password" password={this.state.password} onChange={this.inputPasswordChangeHandler}/>
                        <FormHelperText className={this.state.passwordRequired}>
                            <span className="red">required</span>
                        </FormHelperText>
                    </FormControl><br />
                    <FormHelperText className={this.state.invalidLogin}>
                            <span className="red">Incorrect username and/or password</span>
                    </FormHelperText><br />
                    <Button variant="contained" color="primary" onClick={this.loginClickHandler}>Login</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
        )
    }
}

export default withStyles(styles)(Login);
