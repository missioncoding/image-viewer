import React, { Component } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { fade, withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

import './Header.css'

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    barcolor: {
        background : '#263238'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        marginRight: '20px',
        borderRadius: 'theme.shape.borderRadius',
        backgroundColor: '#c0c0c0',
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: '300px',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
});




class Header extends Component {
    constructor() {
        super()
        this.state = {}
    }



    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static" className={classes.barcolor}>
                    <Toolbar>
                        <Typography className={classes.title} variant="h6" noWrap>
                            Image Viewer
                        </Typography>
                        {this.props.showSearchBox === "true" ?
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                onChange={(e)=>{this.props.searchHandler(e.target.value)}} 
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>: ""}
                        {this.props.showProfileIcon === "true" ?
                        <div>
                        <Avatar className={classes.orange}>N</Avatar>
                        </div>: ""}
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default withStyles(styles)(Header);