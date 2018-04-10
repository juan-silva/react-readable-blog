import React, { Component } from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as acts from '../actions/PostActions'
import PostForm from '../components/post-form.js'

class PostEntry extends Component{

	state = {
		editMode: false
	}

	edit = () => {
		this.setState({editMode:true})
	}

	onSave = () =>{
		this.setState({editMode:false})
	}

	onCancel = () =>{
		this.setState({editMode:false})
	}

	delete = () => {
		this.props.dispatch(acts.removePost(this.props.post))
	}

	voteUp = () => {
		var thepost = {
			id: this.props.post.id,
			option: "upVote"
		}
		this.props.dispatch(acts.updatePostVote(thepost))
	}

	voteDown = () =>{
		var thepost = {
			id: this.props.post.id,
			option: "downVote"
		}
		this.props.dispatch(acts.updatePostVote(thepost))
	}

	render(){
		const { post } = this.props
		const { editMode } = this.state

		return (
			<div className="item-container">
				{editMode && (
					<PostForm 
						mode="Edit" 
						post={post}
						onSave={this.onSave} 
						onCancel={this.onCancel} />
				)}
				{!editMode && (
					<div>
						<button onClick={this.delete}  style={{float:'right'}} type="button" className="btn btn-danger btn-small">Delete</button>
						<button onClick={this.edit} style={{float:'right'}} type="button" className="btn btn-primary btn-small">Edit</button>
						{this.props.link && (
							<Link to={"/"+post.category+"/"+post.id}><h2>{post.title}</h2></Link>
						)}
						{!this.props.link && (
							<h2>{post.title}</h2>
						)}	
						<div className="item-author">
							{post.author} - 
							<Moment  format="LLLL">
								{post.timestamp}
							</Moment> 
						</div>
						<div className="item-text">{post.body}</div>
						<div className="item-footnote">Category: {post.category}</div>
						<div className="item-footnote">Votes: {post.voteScore}</div>
						<div className="item-footnote">Comments: {post.commentCount}</div>
						<div className="item-footnote"><button onClick={this.voteUp} type="button"><i className="fas fa-thumbs-up"></i></button></div>
						<div className="item-footnote"><button onClick={this.voteDown} type="button"><i className="fas fa-thumbs-down"></i></button></div>
					</div>
				)}
			</div>
		)
	}
}

function mapStateToProps(state){
	return null
}

export default connect(mapStateToProps)(PostEntry)