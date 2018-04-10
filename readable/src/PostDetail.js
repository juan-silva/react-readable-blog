import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actsPost from './actions/PostActions'
import * as actsCat from './actions/CategoryActions'
import PostEntry from './components/post-entry.js'
import PostComments from './components/post-comments.js'
import { Link } from 'react-router-dom'
import PostForm from './components/post-form.js'

class PostDetail extends Component {


	componentDidMount(){
		if(this.props.posts == 0)
		  this.props.dispatch(actsPost.fetchPosts())
		if(this.props.categories.length == 0)
		  this.props.dispatch(actsCat.fetchCategories())
	}

	render(){
		const post = this.props.posts.filter((p)=>p.id === this.props.postID)[0]
		
		return (
			<div>
				<Link to="/" >Back to All Posts</Link>
				{post !== undefined && (
					<div>
						<PostEntry key={post.id} post={post} link={false} />
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