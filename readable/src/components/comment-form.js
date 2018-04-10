import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as acts from '../actions/CommentActions'
import uuidv1 from 'uuid/v1'


class CommentForm extends Component{


	saveComment = (e) => {
		e.preventDefault()
		var field_id = (this.props.mode !== "New")?this.props.comment.id:"New"

		var thecomment = {
			id: uuidv1(),
			author: document.getElementById('author_'+field_id).value,
			body: document.getElementById('body_'+field_id).value
		}
		if(this.props.mode == "New"){
			thecomment.id = uuidv1()
			thecomment.timestamp = Date.now()
			thecomment.parentId = this.props.post_id
			this.props.dispatch(acts.createComment(thecomment))
		}else{
			thecomment.id = this.props.comment.id
			thecomment.parentId = this.props.comment.parentId
			this.props.dispatch(acts.updateComment(thecomment))
		}
		window.$("#new-comment-form-container").collapse('hide')
		if(this.props.onSave !== undefined)
			this.props.onSave()
		console.log(thecomment)
	}


	cancel = () => {
		window.$("#new-comment-form-container").collapse('hide')
		if(this.props.onCancel !== undefined)
			this.props.onCancel()
	}

	componentDidMount(){
		console.log("form mounting")
		var field_id = (this.props.mode !== "New")?this.props.comment.id:"New"
		if(this.props.comment !== undefined){
			document.getElementById('author_'+field_id).value = this.props.comment.author
			document.getElementById('body_'+field_id).value = this.props.comment.body	
		}

	}

	render(){

		var field_id = (this.props.mode !== "New")?this.props.comment.id:"New"

		return(
			<div className="card card-body">
				<h3>{this.props.mode} Post Comment</h3>
				<form onSubmit={this.saveComment}>

					<div className="form-group">
						<label htmlFor="author">Author</label>
						<input required type="text" className="form-control" id={"author_"+field_id} placeholder="Comment Author" />
					</div>
					<div className="form-group">
						<label htmlFor="body">Body</label>
						<textarea required className="form-control" id={"body_"+field_id} placeholder="Enter comment here"></textarea>
					</div>
					<button type="submit" className="btn btn-primary">Save</button>
					<button 
						onClick={this.cancel} 
						type="button" 
						className="btn btn-primary" 
						>Cancel</button>
				</form>
			</div>
		)
	}
}

function mapStateToProps(store){
	return {
		categories: store.categories
	}
}

export default connect(mapStateToProps)(CommentForm)