import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as acts from './actions'
import PostEntry from './components/post-entry.js'
import PostComments from './components/post-comments.js'
import { Link } from 'react-router-dom'
import PostForm from './components/post-form.js'

class PostDetail extends Component {

	state = {
		editMode: false
	}

	edit = () => {
		this.setState({editMode:true})
	}

	delete = () => {
		var post = this.props.posts.filter((p)=>p.id === this.props.postID)[0]
		this.props.dispatch(acts.removePost(post))
	}

	onSave = () =>{
		this.setState({editMode:false})
	}

	onCancel = () =>{
		this.setState({editMode:false})
	}

	componentDidMount(){
		if(this.props.posts == 0)
		  this.props.dispatch(acts.fetchPosts())
		if(this.props.categories.length == 0)
		  this.props.dispatch(acts.fetchCategories())
	}
	render(){
		const post = this.props.posts.filter((p)=>p.id === this.props.postID)[0]
		const { editMode } = this.state
		console.log(this.props.posts)
		console.log(post)
		return (
			<div>
				<Link to="/" >Back to All Posts</Link>
				{post !== undefined && (
					<div>
						{editMode && (
							<PostForm mode="Edit" post={post}  onSave={this.onSave} onCancel={this.onCancel} />
						)}
						{!editMode && (
							<div>
								<button onClick={this.delete}  style={{float:'right'}} type="button" className="btn btn-danger btn-small">Delete</button>
								<button onClick={this.edit} style={{float:'right'}} type="button" className="btn btn-primary btn-small">Edit</button>
							    <PostEntry key={post.id} post={post} link={false} />
							</div>
						)}
						<PostComments post={post} />
					</div>
				)}
				{post == undefined && (
					<div style={{marginTop:50}} className="alert alert-danger" role="alert">This post has been removed or does not exist</div>
				)}
			</div>
			
		)
	}
}


function mapStateToProps(store){
	return {
		posts: store.posts,
		categories: store.categories
	}
}

export default connect(mapStateToProps)(PostDetail)