//Import existing actions
import * as acts from '../actions/actionTypes'

//Define initial state of store

const categoriesArray = []

function CategoriesReducer(state = categoriesArray, action){
	switch(action.type){
		case acts.LOAD_CATEGORIES:
			return state.concat(action.categories)
		default:
			return state;
	}
}

export default CategoriesReducer