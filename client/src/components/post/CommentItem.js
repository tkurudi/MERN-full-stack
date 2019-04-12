import React, { Component } from 'react'
import {connect} from 'react-redux'
import {deleteComment} from '../../actions/postActions';
class CommentItem extends Component {
  render() {
      const {}
    return (
      <div>
        
      </div>
    )
  }
}

const mapStateToProps = state => ({
auth: state.auth,
post: state.auth
})

export default connect(mapStateToProps, {deleteComment})(CommentItem)