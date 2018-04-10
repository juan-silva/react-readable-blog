import React, { Component } from 'react'
import Moment from 'react-moment'
import CommentForm from './comment-form'
import * as acts from '../actions'
import { connect } from 'react-redux'

class CommentEntry extends Component{

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
		this.props.dispatch(acts.removeComment(this.props.comment))
	}

	voteUp = () => {
		var thecomment = {
			id: this.props.comment.id,
			option: "upVote"
		}
		this.props.dispatch(acts.updateCommentVote(thecomment))
	}

	voteDown = () =>{
		var thecomment = {
			id: this.props.comment.id,
			option: "downVote"
		}
		this.props.dispatch(acts.updateCommentVote(thecomment))
	}

	render(){
		const { comment } = this.props
		
		const { editMode } = this.state
		
		return (
			<div className="item-container">
				{editMode && (
					<CommentForm 
						mode="Edit" comment={comment}
						onSave={this.onSave} 
						onCancel={this.onCancel} />
				)}
				{!editMode && (
					<div>
						<button onClick={this.delete}  style={{float:'right'}} type="button" className="btn btn-danger btn-small">Delete</button>
						<button onClick={this.edit} style={{float:'right'}} type="button" className="btn btn-primary btn-small">Edit</button>
						<div className="item-text">{comment.body}</div>
						<div className="item-author">
							{comment.author} -  
							<Moment  format="LLLL">
								{comment.timestamp}
							</Moment> 
						</div>
						<div className="item-footnote">Votes: {comment.voteScore}</div>
						<div className="item-footnote"><button onClick={this.voteUp} type="button"><i className="fas fa-thumbs-up"></i></button></div>
						<div className="item-footnote"><button onClick={this.voteDown} type="button"><i className="fas fa-thumbs-down"></i></button></div>
					</div>
				)}
			</div>
		)
	}
}

function mapStateToProps(store){
	return {
		//Just need the dispatch props
	}
}

export default connect(mapStateToProps)(CommentEntry)
