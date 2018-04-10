import React, { Component } from 'react';
import { connect } from 'react-redux'

class Toolbar extends Component{

	render(){
		const { 
			categories,
			currentCat, 
			currentSort, 
			onSelectCategory, 
			onSelectSort} = this.props

		return(
			<div>
				<form className="form-inline">
					<div className="form-group">
						<label htmlFor="category">Category: </label>
						<select className="form-control form-control-sm" id="category" onChange={onSelectCategory} value={currentCat}>
							<option key="all" value="all">All</option>
							{categories.map((cat) => (
								<option key={cat.path} value={cat.path}>{cat.name}</option>
							))}
						</select>
					</div>
					<div className="form-group">
						<label htmlFor="sort">Sort by: </label>
						<select className="form-control form-control-sm" id="sort" onChange={onSelectSort} value={currentSort}>
							<option value="published">Date Published</option>
							<option value="votes">Number of Votes</option>
						</select>
					</div>
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

export default connect(mapStateToProps)(Toolbar)
