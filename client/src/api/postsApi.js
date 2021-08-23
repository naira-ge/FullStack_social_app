import axios from 'axios';

const rootUrl = "http://localhost:8800/api/";

const postsUrl = rootUrl + "posts/";
const likeUrl = rootUrl + "posts/like/";


export const getAllPosts = () => {
    return new Promise(async (resolve, reject) => {
        try {
        const result = await axios.get(postsUrl, {
            headers: {
                Authorization: sessionStorage.getItem("accessJWT"),
            }
        });
            
            resolve(result);

        } catch (error) {
            reject(error.message);
        }
    })
};

export const createNewPost = (post) => {
    return new Promise(async (resolve, reject) => {
        try {
        const result = await axios.post(postsUrl,  post, {
            headers: {
                Authorization: sessionStorage.getItem("accessJWT"),
            },
        });
            
            resolve(result);

        } catch (error) {
            reject(error.message);
        }
    })
};

export const getSinglePost = (postId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.get(postsUrl + postId, {
                headers: {
                    Authorization: sessionStorage.getItem("accessJWT"),
                },
            });
            
            resolve(result);

        } catch (error) {
            reject(error.message);
        }
    })
};

export const createNewComment = (_id, message) => {
    return new Promise(async (resolve, reject) => {
        try {
        const result = await axios.patch(postsUrl + _id,  {message: message}, {
            headers: {
                Authorization: sessionStorage.getItem("accessJWT"),
            },
        });
            
            resolve(result);

        } catch (error) {
            reject(error.message);
        }
    })
};

export const likePost = (_id) => {
    return new Promise(async (resolve, reject) => {
        try {
        const result = await axios.patch(likeUrl + _id,  {
            headers: {
                Authorization: sessionStorage.getItem("accessJWT"),
            },
        });
            console.log("APIresult", result);
            resolve(result);

        } catch (error) {
            reject(error.message);
        }
    })
};