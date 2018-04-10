//Import existing actions
import * as acts from '../actions/actionTypes'

//Define initial state of store
const postsArray = []


//Define the reducer
function PostsReducer (state = postsArray, action){
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

export default PostsReducer