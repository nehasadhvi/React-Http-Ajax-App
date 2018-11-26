import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
import axios from 'axios';

class Blog extends Component {

    state = {
        posts: [],
        selectedPostId: null,
        error: false
    }

    componentDidMount() {
        axios.get('/posts')
            .then(data => {
                const posts = data.data.slice(0,4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Neha'
                    }
                });
                this.setState({posts: updatedPosts});
            })
            .catch(err => {
                this.setState({error: true})
            });
    }

    postClickHandler = (id) => {
        this.setState({selectedPostId: id});
    }

    render () {

        let posts = <p style={{'textAlign': 'center'}}>Something went wrong !</p>
        if(!this.state.error) {
            posts = this.state.posts.map(post => <Post 
                key={post.id} 
                author={post.author} 
                title={post.title} 
                clicked={() => {this.postClickHandler(post.id)}} />)
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;