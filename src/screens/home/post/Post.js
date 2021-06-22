import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import {withStyles} from '@material-ui/core/styles';

import './Post.css'


class Post extends Component {
    constructor() {
        super()
    }

    render() {
        const { classes, detail, description } = this.props

    let timestamp = new Date(detail.timestamp);
    let year = timestamp.getFullYear();
    let month = timestamp.getMonth() + 1;
    let day = timestamp.getDate();
    let hours = timestamp.getHours();
    let min = timestamp.getMinutes();
    let sec = timestamp.getSeconds();

    let time = day+"/"+month+"/"+year+" "+hours+":"+min+":"+sec;
        return (
            <div>
                <Card>
                    <CardHeader
                        avatar={
                            <Avatar>A</Avatar>
                        }
                        title={detail.username}
                        subheader={time}
                    />
                    <CardContent>
                        <h4>{detail.media_url}</h4>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default Post