import React, { Component } from 'react'
import CommentItem from './CommentItem';

export default class CommentFeed extends Component {
  render() {
      const { comments, postId } = this.props;


    return comments.map(comment => <commentItem key={comment._id} comment={comment} postId={postId}/>
    )
  }
}

export default CommentFeed