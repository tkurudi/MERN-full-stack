import React, { Component } from 'react'
import { connect } from 'react-redux';
import PostForm from './PostForm';
import Spinner from '../common/Spinner';
import { getPosts } from '../../actions/postActions';

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }
    
  render() {
    return (
      <div className="feed">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <PostForm/>
                </div> 
            </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps)(Posts)