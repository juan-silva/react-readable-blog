import React, { Component } from 'react';
import * as actsPost from './actions/PostActions'
import * as actsCat from './actions/CategoryActions'
import { connect } from 'react-redux'
import Toolbar from './components/toolbar.js'
import PostForm from './components/post-form.js'
import PostEntry from './components/post-entry.js'


class PostsListing extends Component {

	state  = {
		currentCat: 'all',
		currentSort: 'published'
	}

	componentDidMount(){
		
		if(this.props.categories.length == 0)
		  this.props.dispatch(actsCat.fetchCategories())

		if(this.props.posts == 0)
		  this.props.dispatch(actsPost.fetchPosts())

		if(this.props.categoryID !== undefined)
			this.setState({currentCat: this.props.categoryID})

	}

	selectCategory = (event) => {
		console.log("Selected: "+event.target.value)
		this.setState({currentCat: event.target.value});
		this.props.history.push('/'+event.target.value)
	}

	selectSort = (event) => {
		this.setState({currentSort: event.target.value});
	}

	sortBy = (sort, posts) =>{
		if(sort == "published"){
			return posts.sort(function(a, b){return b.timestamp - a.timestamp})
		}
		return posts.sort(function(a, b){return b.voteScore - a.voteScore})
	}

	render() {
		const { posts } = this.props

		if(posts.length > 0){
			var postMatches = posts.filter(p => (this.state.currentCat == "all" || p.category == this.state.currentCat))

			if(postMatches.length > 0)
				postMatches = this.sortBy(this.state.currentSort, postMatches)
		}

		return (
			<div>
				<button id="new-post" className="btn btn-primary" data-toggle="collapse" data-target="#new-post-form-container">New Post</button>
				<Toolbar 
					onSelectCategory={this.selectCategory} 
					onSelectSort={this.selectSort} 
					currentCat={this.state.currentCat}
					currentSort={this.state.currentSort} />


				<div className="collapse" id="new-post-form-container">
					<PostForm mode="New" />
				</div>

				{postMatches && postMatches.map((post)=>(
						<PostEntry key={post.id} post={post} link={true} />
				))}

				{(postMatches && postMatches.length == 0) && (
					<div style={{marginTop:50}} className="alert alert-danger" role="alert">No Posts Match the Category Filter</div>
				)}

				{posts.length == 0 && (
					<div style={{marginTop:50}} className="alert alert-danger" role="alert">No Posts Found</div>
				)}
			</div>
		);
	}
}

function mapStateToProps(store){
	return {
		posts: store.posts,
		categories: store.categories
	}
}

export default connect(mapStateToProps)(PostsListing)


