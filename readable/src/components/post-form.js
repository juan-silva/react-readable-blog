import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as acts from '../actions'
import uuidv1 from 'uuid/v1'


class PostForm extends Component{

	savePost = (e) => {
		e.preventDefault()
		var thepost = {
			title: document.getElementById('title').value,
			author: document.getElementById('author').value,
			body: document.getElementById('body').value,
			category: document.getElementById('post-category').value,
		}
		if(this.props.mode == "New"){
			thepost.id = uuidv1()
			thepost.timestamp = Date.now()
			this.props.dispatch(acts.createPost(thepost))
		}else{
			thepost.id = this.props.post.id
			this.props.dispatch(acts.updatePost(thepost))
		}
		
		console.log(thepost)
		if(this.props.onSave !== undefined)
			this.props.onSave()
	}

	cancel = () => {
		if(this.props.onCancel !== undefined)
			this.props.onCancel()
	}

	componentDidMount(){
		console.log("Compoent mounted")
		if(this.props.post !== undefined){
			document.getElementById('title').value = this.props.post.title
			document.getElementById('author').value = this.props.post.author
			document.getElementById('body').value = this.props.post.body
			document.getElementById('post-category').value = this.props.post.category
		}
	}

	render(){

		const {categories, post} = this.props

		return(
			<div className="card card-body">
				<h3>{this.props.mode} Blog Post</h3>
				<form onSubmit={this.savePost}>

					<input id="post_id" type="hidden" value="" />
					<div className="form-group">
						<label htmlFor="title">Title</label>
						<input type="text" className="form-control" id="title" placeholder="Blog Post Title"  />
					</div>
					<div className="form-group">
						<label htmlFor="author">Author</label>
						<input type="text" className="form-control" id="author" placeholder="Post Author" />
					</div>
					<div className="form-group">
						<label htmlFor="category">Category</label>
						<select className="form-control" id="post-category" defaultValue="react">
							{categories.map((cat) => (
								<option key={cat.path} value={cat.path}>{cat.name}</option>
							))}
						</select>
					</div>									
					<div className="form-group">
						<label htmlFor="body">Body</label>
						<textarea className="form-control" id="body" placeholder="Enter post content here"></textarea>
					</div>
					<button type="submit" className="btn btn-primary">Save</button>
					<button 
						onClick={this.cancel} 
						type="button" 
						className="btn btn-primary" 
						data-toggle="collapse" 
						data-target="#new-post-form-container">Cancel</button>
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