import React, {Component} from 'react';
import Header from '../../common/header/Header';
import './Home.css';

class Home extends Component {

    constructor() {
        super();
        this.state = {
            postDescription :[],
            postDetails: []
        };
    }

    componentWillMount () {
        let data= null;
        let xhr = new XMLHttpRequest();
        let that = this;
        xhr.addEventListener('readystatechange', function() {
            if (this.readyState === 4) {
                that.setState({postDescription : JSON.parse(this.responseText).data});
                // now get the post details for each post description
                that.getPostDetails();

            }
        })
        xhr.open("GET", "https://graph.instagram.com/me/media?fields=id,caption&access_token=" + window.sessionStorage.getItem('access-token'));
        xhr.setRequestHeader("Cache-Control","no-cache");
        xhr.send(data)
    }

    getPostDetails = () => {
        this.state.postDescription.map(post => {
             this.getPostDetailsById(post.id)
        });
    }

    getPostDetailsById = (id) => {
        let that = this
        let xhr =  new XMLHttpRequest();
        let data = null
        console.log("post id here :" + id)
        xhr.addEventListener('readystatechange', function() {
            if (this.readyState === 4) {
                that.setState({postDetails : that.state.postDetails.concat(JSON.parse(this.responseText))});
            }
        })
        xhr.open("GET","https://graph.instagram.com/"+id+"?fields=id,media_type,media_url,username,timestamp&access_token=" + window.sessionStorage.getItem('access-token'))
        xhr.setRequestHeader("Cache-Control","no-cache");
        xhr.send(data)
    }

    render () {
        return (
            <div>
               <Header baseurl={this.props.baseurl}/>
               <div>
               {this.state.postDescription.map(d => (
                   <h1>{d.id} = {d.caption}</h1>
               ))}
               </div>
               <div>
               {this.state.postDetails.map(d => (
                   <h2>{d.id} = {d.media_url}</h2>
               ))}
               </div>
            </div>
        )
    }
}

export default Home