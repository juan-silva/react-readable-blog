import React, { Component } from 'react'
import * as acts from '../actions/PostActions'
import { connect } from 'react-redux'
import CommentEntry from './comment-entry.js'
import CommentForm from './comment-form.js'

class PostComments extends Component{

	componentDidMount(){
		this.props.dispatch(acts.fetchPostComments(this.props.post.id))
	}

	render(){
		var { comments } = this.props
		comments = comments.sort(function(a, b){return b.timestamp - a.timestamp})

		return (
			<div>
				<button id="new-comment" className="btn btn-primary" data-toggle="collapse" data-target="#new-comment-form-container">New Comment</button>
				<h4>Post Comments</h4>

				
				<div style={{height:40}} className="spacer"> </div>

				<div className="collapse" id="new-comment-form-container">
					<CommentForm mode="New" post_id={this.props.post.id} />
				</div>

				{comments && comments.map((comment) => (
					<CommentEntry key={comment.id} comment={comment} />		
				))}
				{comments && comments.length == 0 && (
					<div style={{marginTop:50}} className="alert alert-danger" role="alert">No comments yet for this post</div>
				)}
			</div>
		)
	}
}

function mapStateToProps(store){
	return {
		comments: store.comments,
	}
}

export default connect(mapStateToProps)(PostComments)
