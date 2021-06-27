import React, { Component } from 'react';
import Header from '../../common/header/Header';
import Post from './post/Post'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import {withStyles} from '@material-ui/core/styles';
import profile_pic from '../../assets/profile_pic.jpg';

import './Home.css';

const styles = theme => ({
    gridContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 90
    },
    gridList: {
        width: 1100,
        height: 'auto',
        overflowY: 'auto'
    }
});



class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            postDescription: [],
            postDetails: [],
            dupPostDescription: [],
            dupPostDetails:[]
        };
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

    logout = () => {
        sessionStorage.clear();
        this.props.history.replace('/');
    }
    
    openProfilePage = () =>{
        this.props.history.push('/profile');
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

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Header showProfileIcon="true" showSearchBox="true" searchHandler={this.searchAddHandler} history={this.props.history}
                        logout={this.logout}
                        openProfilePage={this.openProfilePage}
                        showMyAccountMenuItem="true"/>
                <div className={classes.gridContainer}>
                    <GridList className={classes.gridList} cellHeight={'auto'} cols={2}>
                        {this.state.postDetails.map((item, index) => (
                             <GridListTile key={item.id}>
                                 <Post detail={item} description={this.state.postDescription}/>
                            </GridListTile>
                        ))}
                    </GridList>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Home);