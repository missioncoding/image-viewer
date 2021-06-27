import React, { Component } from 'react';
import Header from '../../common/header/Header';
import './Profile.css';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import CardMedia from '@material-ui/core/CardMedia';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIconBorder from '@material-ui/icons/FavoriteBorder';
import FavoriteIconFill from '@material-ui/icons/Favorite';
import { withStyles } from '@material-ui/core/styles';
import profile_pic from '../../assets/profile_pic.jpg';


const styles = {
    editFullNameContainer: {
        position: 'relative',
        width: "180px",
        backgroundColor: "#fff",
        top: "30%",
        margin: "0 auto",
        boxShadow: "2px 2px #888888",
        padding: "20px"
    },
    media: {
        height: '200px',
        paddingTop: '56.25%', // 16:9
    },
    profileHeadInfo: { float: "left", width: "200px", fontSize:'small'},
    profileSummary: { width: "600px", fontSize: "big" },
    openedImageObjModal: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
    openedImageObjContainer: { display: 'flex', flexDirection: 'row', backgroundColor: "#fff", width: '70%', height: '70%' },
    openedImageObjContainerRow1: { width: '50%', padding: 10 },
    openedImageObjContainerRow2: { display: 'flex', flexDirection: 'column', width: '50%', padding: 10 },
    openedImageObjContainerRow21: { borderBottom: '2px solid #c0c0c0', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' },
    openedImageObjContainerRow22:{ display: 'flex', height: '100%', flexDirection: 'column', justifyContent: 'space-between' }
};

class Profile extends Component {

    constructor() {
        super();
        this.state = {
            postDescription: [],
            postDetails: [],
            dupPostDescription: [],
            dupPostDetails:[],
            likes: Math.floor(Math.random() * 10) + 1,
            user: "zeedcp",
            fullname: "Mohammad Abdul Khadar Zeelani",
            isEditModalOpen: false,
            fullNameRequired: 'dispNone',
            isImageModalOpen: false,
            openedImageObj: null,
            imageMediaObj: null,
            comments: {},
            likes: Math.floor(Math.random() * 10) + 1,
            follows: Math.floor(Math.random() * 10) + 1,
            followedBy: Math.floor(Math.random() * 10) + 1,
            isLiked: false,
            currentComment: '',
            newFullName: ''
        }
    }

    componentWillMount() {
        let data = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        xhr.addEventListener('readystatechange', function () {
            if (this.readyState === 4) {
                let parsedData = JSON.parse(this.responseText).data;
                that.setState({ postDescription: parsedData,
                                dupPostDescription: parsedData});
                // now get the post details for each post description
                that.getPostDetails();

            }
        })
        xhr.open("GET", "https://graph.instagram.com/me/media?fields=id,caption&access_token=" + window.sessionStorage.getItem('access-token'));
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.send(data)
    }

    getPostDetails = () => {
        this.state.postDescription.map(post => {
            this.getPostDetailsById(post.id)
        });
    }

    getPostDetailsById = (id) => {
        let that = this
        let xhr = new XMLHttpRequest();
        let data = null
        console.log("post id here :" + id)
        xhr.addEventListener('readystatechange', function () {
            if (this.readyState === 4) {
                let parsedData = JSON.parse(this.responseText);
                that.setState({ postDetails: that.state.postDetails.concat(parsedData),
                                dupPostDetails:  that.state.dupPostDetails.concat(parsedData)});
            }
        })
        xhr.open("GET", "https://graph.instagram.com/" + id + "?fields=id,media_type,media_url,username,timestamp&access_token=" + window.sessionStorage.getItem('access-token'))
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.send(data)
    }

    logout = () => {
        sessionStorage.clear();
        this.props.history.replace('/');
    }

    openEditModalHandler = () => {
        this.setState({ isEditModalOpen: true,
            newFullName: "" });
    }

    closeEditModalHandler = () => {
        this.setState({ isEditModalOpen: false, fullNameRequired: 'dispNone'});
    }

    fullNameChangeHandler = (e) => {
        console.log("Fullname change handler :" + e.target.value)
        this.setState({
            newFullName: e.target.value
        })
    }

    updateFullNameHandler = () => {
        console.log("new full name : " + this.state.newFullName)
        if (this.state.newFullName === '') {
            this.setState({ fullNameRequired: 'dispBlock' })
        } else {
            this.setState({ fullNameRequired: 'dispNone' })
        }

        if (this.state.newFullName === '') { return }

        this.setState({
            fullname: this.state.newFullName
        })

        this.closeEditModalHandler()
    }

    openImageModalHandler = (event) => {
        var descResult = this.state.postDescription.find(item => {
            return item.id === event.target.id
        })
        var mediaDetails = this.state.postDetails.find(item => {
            return item.id === event.target.id
        })
        console.log(descResult);
        this.setState({ isImageModalOpen: true, openedImageObj: descResult, imageMediaObj: mediaDetails });
    }

    closeImageModalHandler = () => {
        this.setState({ isImageModalOpen: false });
    }

    likeClickHandler = (id) => {
        if (!this.state.isLiked) {
            this.setState({
                likes: this.state.likes + 1
            })
        } else {
            this.setState({
                likes: this.state.likes - 1
            })
        }
        if (this.state.isLiked) {
            this.setState({
                isLiked: false
            });
        } else {
            this.setState({
                isLiked: true
            });
        }
    }

    addCommentHandler = (id) => {
        console.log('id', id);
        if (this.state.currentComment === "" || typeof this.state.currentComment === undefined) {
            return;
        }

        let commentList = this.state.comments.hasOwnProperty(id) ?
            this.state.comments[id].concat(this.state.currentComment) : [].concat(this.state.currentComment);

        this.setState({
            comments: {
                ...this.state.comments,
                [id]: commentList
            },
            currentComment: ''
        })
    }

    searchAddHandler = (searchFor) =>{
        console.log("Search string :" + this.state.postDescription)
        let posts = this.state.dupPostDescription;
        let selectedPosts = []
        posts = posts.filter((post) => {
            let caption = post.caption.toLowerCase();
            let enteredStr = searchFor.toLowerCase();
            if (caption.includes(enteredStr)) {
                selectedPosts.push(post.id)
                return true
            } else {
                return false
            }
        })
        this.setState({
            postDescription: posts
        })
        console.log("selected posts " +selectedPosts)
        console.log("postDetails " +this.state.postDetails)
        let postd = this.state.dupPostDetails
        postd = postd.filter(item => selectedPosts.includes(item.id));
        this.setState({
            postDetails: postd
        })
    }

    commentChangeHandler = (e) => {
        this.setState({
            currentComment: e.target.value
        });
    }

    render() {
        const { classes } = this.props;
        let likeCount = this.state.likes;
        return (
            <div>
                <Header showProfileIcon="true" showSearchBox="true" searchHandler={this.searchAddHandler} history={this.props.history}
                    logout={this.logout}
                    openProfilePage={this.openProfilePage} />
                <div className="top-container">
                    <Avatar className="profile-picture-avatar"
                        alt="User Image"
                        src={profile_pic}
                    />
                    <span style={{ marginLeft: "20px" }}>
                        <div className={classes.profileSummary}> {this.state.user} <br /><br />
                            <div className={classes.profileHeadInfo}> Posts: {this.state.postDetails.length} </div>
                            <div className={classes.profileHeadInfo}> Follows:  {this.state.follows}</div>
                            <div className={classes.profileHeadInfo}> Followed By: {this.state.followedBy} </div> <br />
                        </div><br />
                        <div style={{ fontSize: "small" }}> {this.state.fullname}
                            <Fab variant="round" color="secondary" aria-label="Edit"    style={{ marginLeft: "20px" }} onClick={this.openEditModalHandler}>
                                <EditIcon />
                            </Fab>
                        </div>
                        <Modal
                            aria-labelledby="edit-full-name-modal"
                            open={this.state.isEditModalOpen}
                            onClose={this.closeEditModalHandler}
                            style={{ alignItems: 'center', justifyContent: 'center' }}
                        >
                            <div style={styles.editFullNameContainer}>
                                <Typography variant="h5" id="modal-title">
                                    Edit
                                </Typography><br />
                                <FormControl required>
                                    <InputLabel htmlFor="fullname">Full Name</InputLabel>
                                    <Input id="fullname" onChange={this.fullNameChangeHandler} />
                                    <FormHelperText className={this.state.fullNameRequired}><span className="red">required</span></FormHelperText>
                                </FormControl><br /><br /><br />
                                <Button variant="contained" color="primary" onClick={this.updateFullNameHandler}>
                                    UPDATE
                                </Button>
                            </div>
                        </Modal>
                    </span>
                </div>
                {this.state.postDetails != null &&
                    <GridList cellHeight={'auto'} cols={3} style={{ padding: "40px" }}>
                        {this.state.postDetails.map(item => (
                            <GridListTile key={item.id}>
                                <CardMedia
                                    id={item.id}
                                    style={styles.media}
                                    image={item.media_url}
                                    title=""
                                    onClick={this.openImageModalHandler}
                                />
                            </GridListTile>
                        ))}
                    </GridList>}
                {this.state.openedImageObj != null &&
                    <Modal
                        aria-labelledby="image-modal"
                        aria-describedby="modal to show image details"
                        open={this.state.isImageModalOpen}
                        onClose={this.closeImageModalHandler}
                        className={classes.openedImageObjModal}>
                        <div className={classes.openedImageObjContainer}>
                            <div className={classes.openedImageObjContainerRow1}>
                                <img style={{ height: '100%', width: '100%' }}
                                    src={this.state.imageMediaObj.media_url}
                                    alt={this.state.openedImageObj.caption} />
                            </div>

                            <div className={classes.openedImageObjContainerRow2}>
                                <div className={classes.openedImageObjContainerRow21}>
                                    <Avatar
                                        alt="User Image"
                                        src={profile_pic}
                                        style={{ width: "50px", height: "50px", margin: '10px' }} />
                                    <Typography component="p">
                                        {this.state.user}
                                    </Typography>
                                </div>
                                <div className={classes.openedImageObjContainerRow22}>
                                    <div>
                                        <Typography component="p">
                                            {this.state.openedImageObj.caption}
                                        </Typography><br />
                                        <Typography style={{ color: '#4dabf5' }} component="p" >
                                            #Garden #Leaves #Plants #Rose #Lab #Cells
                                        </Typography>
                                        {this.state.comments.hasOwnProperty(this.state.openedImageObj.id) && this.state.comments[this.state.openedImageObj.id].map((comment, index) => {
                                            return (
                                                <div key={index} className="row">
                                                    <Typography component="p" style={{ fontWeight: 'bold' }}>
                                                        {this.state.user}:
                                                    </Typography>
                                                    <Typography component="p" >
                                                        {comment}
                                                    </Typography>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div>
                                        <div className="row">
                                            <IconButton aria-label="Add to favorites" onClick={this.likeClickHandler.bind(this, this.state.openedImageObj.id)}>
                                                {this.state.isLiked && <FavoriteIconFill style={{ color: '#F44336' }} />}
                                                {!this.state.isLiked && <FavoriteIconBorder />}
                                            </IconButton>
                                            <Typography component="p">
                                                {likeCount} likes
                                            </Typography>
                                        </div>
                                        <div className="row">
                                            <FormControl style={{ flexGrow: 1 }}>
                                                <InputLabel htmlFor="comment">Add a comment</InputLabel>
                                                <Input id="comment" value={this.state.currentComment} onChange={this.commentChangeHandler} />
                                            </FormControl>
                                            <FormControl>
                                                <Button onClick={this.addCommentHandler.bind(this, this.state.openedImageObj.id)}
                                                    variant="contained" color="primary">
                                                    ADD
                                                </Button>
                                            </FormControl>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal>}
            </div>
        )
    }
}

export default withStyles(styles)(Profile);