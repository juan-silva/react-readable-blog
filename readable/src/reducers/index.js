import { combineReducers } from 'redux'

//Import existing actions
import * as acts from '../actions'


//Define initial state of store
const postsArray = []

const commentsArray = []

const categoriesArray = []


//Define the reducer
function posts (state = postsArray, action){
	switch (action.type){

		case acts.ADD_POST:
			var newstate = state.slice(0)
			newstate.push(action.post)
			return newstate

		case acts.EDIT_POST:
			return state.map((p)=>{
				if(p.id !== action.post.id)
					return p
				return action.post
			})

		case acts.DELETE_POST:
			return state.filter((p)=>(p.id !== action.post.id))

		case acts.LOAD_POSTS:
			return action.posts

		default:
			return state;
	}
}

function comments(state = commentsArray, action){
	switch(action.type){

		case acts.ADD_COMMENT:
			var newstate = state.slice(0)
			newstate.push(action.comment)
			return newstate

		case acts.EDIT_COMMENT:
			return state.map((c)=>{
				if(c.id !== action.comment.id)
					return c
				return action.comment
			})

		case acts.DELETE_COMMENT:
			return state.filter((c)=>(c.id !== action.comment.id))

		case acts.LOAD_COMMENTS:
			return action.comments

		default:
			return state;
	}
}

function categories(state = categoriesArray, action){
	switch(action.type){
		case acts.LOAD_CATEGORIES:
			return state.concat(action.categories)
		default:
			return state;
	}
}


export default combineReducers({
	posts,
	comments,
	categories
})
