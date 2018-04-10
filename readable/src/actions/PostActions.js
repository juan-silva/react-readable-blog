import * as BlogAPI from '../blogAPI'
import * as acts from './actionTypes'
import * as commActions from './CommentActions'

//Action creators
export const addPost = (post) => (
	{
		type: acts.ADD_POST,
		post
	}
)

export const editPost = (post) => (
	{
		type: acts.EDIT_POST,
		post
	}
)

export const deletePost = (post) => (
	{
		type: acts.DELETE_POST,
		post
	}
)

export const loadPosts = (posts) =>(
	{
		type: acts.LOAD_POSTS,
		posts
	}
)



//Asynch Actions
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
		data => dispatch(commActions.loadComments(data))
	)
)