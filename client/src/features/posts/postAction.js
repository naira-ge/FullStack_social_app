import {
    getPostsPending,
    getPostsSuccess,
    getPostsFail,
    searchPosts,
    getSinglePostPending,
    getSinglePostSuccess,
    getSinglePostFail,
    createPostPending,
    createPostSuccess,
    createPostFail,
    createCommentPending,  
    createCommentSuccess,
    createCommentFail,
    likePostPending,
    likePostSuccess,
    likePostFail} from './postsSlice';
import { getAllPosts, getSinglePost, createNewPost, createNewComment, likePost } from '../../api/postsApi';


export const fetchAllPosts = () => async (dispatch) => {
    dispatch(getPostsPending());
    try {
        const result = await getAllPosts();
            
        dispatch(getPostsSuccess(result.data.result));

    } catch (error) {
        dispatch(getPostsFail(error.message));
    }
};

export const filterSearchPost = (str) => (dispatch) => {
    dispatch(searchPosts(str));
};

//Get single post by postId only
export const fetchSinglePosts = (postId) => async (dispatch) => {

    dispatch(getSinglePostPending());
    try {
        const result = await getSinglePost(postId);

        dispatch(getSinglePostSuccess(result.data.result.length && result.data.result[0]));

    } catch (error) {
        dispatch(getSinglePostFail(error.message));
    }
};

//create new post
export const createPost = (post) => async (dispatch) => {
    dispatch(createPostPending());
    try {
        const result = await createNewPost(post);
        
        if (result.status === "error") {
            dispatch(createPostFail("Can't create new post"));
        }
        dispatch(createPostSuccess(result.data.result));

    } catch (error) {
        dispatch(createPostFail(error.message));
    }
};

//create new comment
export const createComment = (_id, message) => async (dispatch) => {
    dispatch(createCommentPending());  
    try {
        const result = await createNewComment(_id, message);
        
        if (result.status === "error") {
            dispatch(createPostFail("Can't create new comment"));
        }
        dispatch(createCommentSuccess(result.data.result));

    } catch (error) {
        dispatch(createCommentFail(error.message));
    }
};

//like or dislike post by postId
export const likeDislikePost = (_id) => async (dispatch) => {
    dispatch(likePostPending());  
    try {
        const result = await likePost(_id);
        console.log("ActionRes", result);
        
        if (result.status === "error") {
            dispatch(createPostFail("Ups can't like, try again"));
        }

        dispatch(likePostSuccess(result.data.result));

    } catch (error) {
        dispatch(likePostFail(error.message));
    }
};


