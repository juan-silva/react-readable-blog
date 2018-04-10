import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import PostsListing from './PostsListing'
import PostDetail from './PostDetail'

class App extends Component {

	render() {
		return (
			<div className="App container">
				<div className="row">
					<div className="col-12">
						<h1>Readable Blog</h1>

						<Route exact
							path="/" 
							render={({history})=>(
								<PostsListing history={history}  />
							)}
						/>

						<Route exact
							path="/:category" 
							render={({history, match})=>(
								<PostsListing history={history} categoryID={match.params.category} />
							)}
						/>

						<Route exact
							path="/:category/:id" 
							render={({match})=>(
								<PostDetail postID={match.params.id} />
							)}
						/>

					</div>
				</div>
			</div>
		);
	}
}

export default App
