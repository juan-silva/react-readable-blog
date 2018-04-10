import * as BlogAPI from '../blogAPI'
import * as acts from './actionTypes'


export const loadCategories = (categories) =>(
	{
		type: acts.LOAD_CATEGORIES,
		categories
	}
)

// Asynchronous action creators
export const fetchCategories = () => dispatch => (
	BlogAPI.get("categories").then(
		data => dispatch(loadCategories(data.categories))
	)
)
