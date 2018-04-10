import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as acts from '../actions/PostActions'
import uuidv1 from 'uuid/v1'


class PostForm extends Component{

	savePost = (e) => {
		e.preventDefault()
		var field_id = (this.props.mode !== "New")?this.props.post.id:"New"
		var thepost = {
			title: document.getElementById('title_'+field_id).value,
			author: document.getElementById('author_'+field_id).value,
			body: document.getElementById('body_'+field_id).value,
			category: document.getElementById('post-category_'+field_id).value,
		}
		if(this.props.mode == "New"){
			thepost.id = uuidv1()
			thepost.timestamp = Date.now()
			this.props.dispatch(acts.createPost(thepost))
		}else{
			thepost.id = this.props.post.id
			this.props.dispatch(acts.updatePost(thepost))
		}
		
		window.$("#new-psot-form-container").collapse('hide')
		if(this.props.onSave !== undefined)
			this.props.onSave()
	}

	cancel = () => {
		window.$("#new-post-form-container").collapse('hide')
		if(this.props.onCancel !== undefined)
			this.props.onCancel()
	}

	componentDidMount(){
		console.log("Compoent mounted")
		var field_id = (this.props.mode !== "New")?this.props.post.id:"New"
		if(this.props.post !== undefined){
			document.getElementById('title_'+field_id).value = this.props.post.title
			document.getElementById('author_'+field_id).value = this.props.post.author
			document.getElementById('body_'+field_id).value = this.props.post.body
			document.getElementById('post-category_'+field_id).value = this.props.post.category
		}
	}

	render(){

		const {categories, post} = this.props

		var field_id = (this.props.mode !== "New")?this.props.post.id:"New"

		return(
			<div className="card card-body">
				<h3>{this.props.mode} Blog Post</h3>
				<form onSubmit={this.savePost}>

					<input id="post_id" type="hidden" value="" />
					<div className="form-group">
						<label htmlFor="title">Title</label>
						<input required type="text" className="form-control" id={"title_"+field_id} placeholder="Blog Post Title"  />
					</div>
					<div className="form-group">
						<label htmlFor="author">Author</label>
						<input required type="text" className="form-control" id={"author_"+field_id} placeholder="Post Author" />
					</div>
					<div className="form-group">
						<label htmlFor="category">Category</label>
						<select className="form-control" id={"post-category_"+field_id} defaultValue="react">
							{categories.map((cat) => (
								<option key={cat.path} value={cat.path}>{cat.name}</option>
							))}
						</select>
					</div>									
					<div className="form-group">
						<label htmlFor="body">Body</label>
						<textarea required className="form-control" id={"body_"+field_id} placeholder="Enter post content here"></textarea>
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

export default connect(mapStateToProps)(PostForm)