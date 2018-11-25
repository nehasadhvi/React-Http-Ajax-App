import React, { Component } from 'react';

import './FullPost.css';
import axios from 'axios';

class FullPost extends Component {

    state = {
        loadedData: null
    }

    componentDidUpdate() {
        if(this.props.id) {
            if(!this.state.loadedData || this.props.id !== this.state.loadedData.id) {
                axios.get('https://jsonplaceholder.typicode.com/posts/'+ this.props.id)
                    .then(data => {
                        this.setState({loadedData: data.data})
                    })
            }
        }
    }

    deletePostHandler = () => {
        axios.delete('https://jsonplaceholder.typicode.com/posts/'+ this.props.id)
                .then(data => {
                    console.log(data);
                })
    }

    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        if(this.props.id) {
            post = <p style={{textAlign: 'center'}}>Loading...</p>;
        }
        if(this.state.loadedData) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedData.title}</h1>
                    <p>{this.state.loadedData.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
                    </div>
                </div>
            );
        }
        return post;
    }
}

export default FullPost;