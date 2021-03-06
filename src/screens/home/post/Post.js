import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIconBorder from '@material-ui/icons/FavoriteBorder';
import FavoriteIconFill from '@material-ui/icons/Favorite';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import profile_pic from '../../../assets/profile_pic.jpg';

import './Post.css'

const styles = theme => ({
    media: {
        height: 0,
        paddingTop: '60%'
    },
    formControl: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
    },
    card: {
        maxWidth: 1100,
    },
    avatar: {
        margin: 10,
        cursor:'pointer'
    }
})


class Post extends Component {
    constructor() {
        super()
        this.state = {
            isLiked: false,
            likes: Math.floor(Math.random() * 10) + 1,
            comments: [],
            comment: ""
        }
    }

    commentChangeHandler = (e) => {
        this.setState({
            comment: e.target.value,
        });
    }

    commentAddHandler = () => {
        if (this.state.comment === '') {
            return
        }
        this.setState({
            comments: this.state.comments.concat(this.state.comment),
            comment:''
        })
    }

    likeClickHandler = () => {
        /* toggle the like icon */
        if (this.state.isLiked) {
            this.setState({ isLiked: false });
        } else {
            this.setState({ isLiked: true });
        }
        /* increase or decrement the link based on toggle */
        if (!this.state.isLiked) {
            this.setState({ likes: this.state.likes + 1 })
        } else {
            this.setState({ likes: this.state.likes - 1 })
        }
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

        let time = ('0' + day).slice(-2) + "/" + ('0' + month).slice(-2) + "/" + year + " " + ('0' + hours).slice(-2) + ":" + ('0' + min).slice(-2) + ":" + ('0' + sec).slice(-2);
        let caption = '';
        description.forEach(post => {
            if (detail.id === post.id) {
                caption = post.caption;
            }
        });

        return (
            <div className="cardContainer">
                <Card className={classes.card}>
                    <CardHeader
                        avatar={
                            <Avatar className={classes.avatar} src={profile_pic}/>
                        }
                        title={detail.username}
                        subheader={time}
                    />
                    <CardMedia
                        className={classes.media}
                        image={detail.media_url}
                        title=""
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {caption}
                        </Typography>
                        <Typography style={{ color: '#4dabf5' }} component="p" >
                            #Garden #Rose #nature #Lab #Cells
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="Add to favorites" onClick={this.likeClickHandler}>
                            {this.state.isLiked && <FavoriteIconFill style={{ color: 'red' }} />}
                            {!this.state.isLiked && <FavoriteIconBorder />}
                        </IconButton>
                        <Typography>
                            {this.state.likes} likes
                        </Typography>
                    </CardActions>
                    <CardContent>
                        {this.state.comments.map((c, index) => (
                            <div key={index} className={classes.row}>
                                <Typography component="p" style={{ fontWeight: 'bold' }}>
                                    {detail.username}:
                                </Typography>
                                <Typography component="p" >
                                    {c}
                                </Typography>
                            </div>
                        ))}
                        <div className={classes.formControl}>
                            <FormControl style={{ flexGrow: 1}}>
                                <InputLabel htmlFor="comment">Add a comment</InputLabel>
                                <Input id="comment" value={this.state.comment} onChange={this.commentChangeHandler} />
                            </FormControl>
                            <FormControl className="commentAdd">
                                <Button onClick={this.commentAddHandler} style={{marginTop: "12px",marginLeft: "10px"}}
                                    variant="contained" color="primary">
                                    ADD
                                </Button>
                            </FormControl>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default withStyles(styles)(Post);