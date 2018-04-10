import { combineReducers } from 'redux'

import posts from './PostsReducer'
import comments from './CommentsReducer'
import categories from './CategoriesReducer'


export default combineReducers({
	posts,
	comments,
	categories
})
