import * as BlogAPI from '../blogAPI'
import * as acts from './actionTypes'


//Action creators
export const loadComments = (comments) =>(
	{
		type: acts.LOAD_COMMENTS,
		comments
	}
)

export const addComment = (comment) => (
	{
		type: acts.ADD_COMMENT,
		comment
	}
)

export const editComment = (comment) => (
	{
		type: acts.EDIT_COMMENT,
		comment
	}
)

export const deleteComment = (comment) => (
	{
		type: acts.DELETE_COMMENT,
		comment
	}
)


//Asynch actions
export const createComment = (comment) => dispatch => (
	BlogAPI.post("comments", comment).then(
		data => dispatch(addComment(data))
	)
)

export const updateComment = (comment) => dispatch => (
	BlogAPI.put("comments/"+comment.id, comment).then(
		data => dispatch(editComment(data))
	)
)

export const removeComment = (comment) => dispatch => (
	BlogAPI.del("comments/"+comment.id).then(
		data => dispatch(deleteComment(data))
	)
)

export const updateCommentVote = (comment) => dispatch => (
	BlogAPI.post("comments/"+comment.id, comment).then(
		data => dispatch(editComment(data))
	)
)
