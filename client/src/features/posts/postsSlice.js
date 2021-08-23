import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    userPosts: [],
    isLoading: false,
    error: '',
    searchPost: [],
    selectedPost: [],
    createPending: false,
    createFail: '',
};

const postsSlice = createSlice({
    name:'posts',
    initialState: initialState,
    reducers: {
        getPostsPending: (state) => {
            state.isLoading = true;
        },
        getPostsSuccess: (state, { payload }) => {
            state.userPosts = payload;
            state.searchPost = payload;
            state.isLoading = false;
            state.error = '';
        },
        getPostsFail: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        searchPosts: (state, { payload }) => {
            state.searchPost = state.userPosts.filter(post => {
                if (!payload) return post;
                
                return (post.title.toLowerCase().includes(payload.toLowerCase()) ||
                        post.desc.toLowerCase().includes(payload.toLowerCase()));
            });
        },
        getSinglePostPending: (state) => {
            state.isLoading = true;
        },
        getSinglePostSuccess: (state, { payload }) => {
            state.selectedPost = payload;
            state.isLoading = false;
            state.error = '';
        },
        getSinglePostFail: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        createPostPending: (state) => {
            state.createPending = true;
        },
        createPostSuccess: (state, { payload }) => {
            state.userPosts = payload;
            state.searchPost = payload;
            state.createPending = false;
            state.createFail = '';
        },
        createPostFail: (state, { payload }) => {
            state.createPending = false;
            state.createFail = payload;
        },
        createCommentPending: (state) => {
            state.createPending = true;
        },
        createCommentSuccess: (state, { payload }) => {
            state.selectedPost = payload;
            state.createPending = false;
            state.createFail = '';
        },
        createCommentFail: (state, { payload }) => {
            state.createPending = false;
            state.createFail = payload;
        },
        likePostPending: (state) => {
            state.isLoading = true;
        },
        likePostSuccess: (state, { payload }) => {
            state.userPosts = payload;
            state.searchPost = payload;
            state.isLoading = false;
            state.error = '';
        },
        likePostFail: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
    },
});


//ascending order
function sortAsc (arr, field) {
    return arr.sort(function (a, b) {
        if (a[field] > b[field]) {
            return 1;
        }
        if (b[field]> a[field]) {
            return -1;
        }
        return 0;
    })
};

//descending order
function sortDesc (arr, field) {
    return arr.sort(function (a, b) {
        if (a[field] > b[field]) {
            return -1;
        }
        if (b[field]> a[field]) {
            return 1;
        }
        return 0;
    })
}

const { reducer, actions } = postsSlice;

export const {
    getPostsPending,
    getPostsSuccess,
    getPostsFail,
    getSinglePostPending,
    getSinglePostSuccess,
    getSinglePostFail,
    searchPosts,
    createPostPending,  
    createPostSuccess,
    createPostFail,
    createCommentPending,  
    createCommentSuccess,
    createCommentFail,
    likePostPending,
    likePostSuccess,
    likePostFail
} = actions;


export default reducer;