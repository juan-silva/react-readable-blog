//Import existing actions
import * as acts from '../actions/actionTypes'

//Define initial state of store
const commentsArray = []

function CommentsReducer(state = commentsArray, action){
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

export default CommentsReducer