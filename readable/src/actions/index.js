import * as BlogAPI from '../blogAPI'

//Action constants
export const ADD_POST = 'ADD_POST'

export const EDIT_POST = 'EDIT_POST'

export const DELETE_POST = 'DELETE_POST'

export const LOAD_CATEGORIES = 'LOAD_CATEGORIES'

export const LOAD_POSTS = 'LOAD_POSTS'

export const LOAD_COMMENTS = 'LOAD_COMMENTS'

export const ADD_COMMENT = 'ADD_COMMENT'

export const EDIT_COMMENT = 'EDIT_COMMENT'

export const DELETE_COMMENT = 'DELETE_COMMENT'



//Action creators
export const addPost = (post) => (
	{
		type: ADD_POST,
		post
	}
)

export const editPost = (post) => (
	{
		type: EDIT_POST,
		post
	}
)

export const deletePost = (post) => (
	{
		type: DELETE_POST,
		post
	}
)

export const loadCategories = (categories) =>(
	{
		type: LOAD_CATEGORIES,
		categories
	}
)

export const loadPosts = (posts) =>(
	{
		type: LOAD_POSTS,
		posts
	}
)

export const loadComments = (comments) =>(
	{
		type: LOAD_COMMENTS,
		comments
	}
)

export const addComment = (comment) => (
	{
		type: ADD_COMMENT,
		comment
	}
)

export const editComment = (comment) => (
	{
		type: EDIT_COMMENT,
		comment
	}
)

export const deleteComment = (comment) => (
	{
		type: DELETE_COMMENT,
		comment
	}
)





// Asynchronous action creators
export const fetchCategories = () => dispatch => (
	BlogAPI.get("categories").then(
		data => dispatch(loadCategories(data.categories))
	)
)

export const fetchPosts = () => dispatch => (
	BlogAPI.get("posts").then(
		data => dispatch(loadPosts(data))
	)
)

export const createPost = (post) => dispatch => (
	BlogAPI.post("posts", post).then(
		data => dispatch(addPost(data))
	)
)

export const updatePost = (post) => dispatch => (
	BlogAPI.put("posts/"+post.id, post).then(
		data => dispatch(editPost(data))
	)
)

export const updatePostVote = (post) => dispatch => (
	BlogAPI.post("posts/"+post.id, post).then(
		data => dispatch(editPost(data))
	)
)

export const removePost = (post) => dispatch => (
	BlogAPI.del("posts/"+post.id).then(
		data => dispatch(deletePost(data))
	)
)

export const fetchPostComments = (post_id) => dispatch => (
	BlogAPI.get("posts/"+post_id+"/comments").then(
		data => dispatch(loadComments(data))
	)
)

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

