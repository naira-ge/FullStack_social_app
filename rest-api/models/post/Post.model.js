const { PostSchema } = require('./Post.schema');

const insertPost = (postObj) => {
    return new Promise((resolve, reject) => {
        try {
            PostSchema(postObj)
                .save()
                .then(data => resolve(data))
                .catch(error => reject(error));
        } catch (error) {
            reject(error);
        }
    });
};

const getPosts = (userId) => {
    return new Promise((resolve, reject) => {
        try {
            PostSchema
                .find({ userId })
                .then(data => resolve(data))
                .catch(error => reject(error));
            
        } catch (error) {
            reject(error);
        }
    });
};

const getPostById = (_id) => {
    return new Promise((resolve, reject) => {
        try {
            PostSchema
                .find({ _id })
                .then(data => resolve(data))
                .catch(error => reject(error));
        } catch (error) {
            reject(error);
        }
    });
};

const updateClientReply = ({ postId, userId, message, sender }) => {
    return new Promise((resolve, reject) => {
        try {
            PostSchema
                .findOneAndUpdate(
                    { postId, userId },
                    {
                        status: 'Pending user response',
                        $push: {
                            conversations: { message, sender }
                        }
                    },
                    { new: true }
                )
                .then(data => resolve(data))
                .catch(error => reject(error));
        } catch (error) {
            reject(error);
        }
    });
};

const updatePostInfo = ({ postId, userId, updateInfo }) => {
    return new Promise((resolve, reject) => {
        try {
            PostSchema
                .findOneAndUpdate(
                    { postId, userId },
                    {
                        status:"Update",
                        $set: {...updateInfo}
                    },
                    { new: true }
                )
                .then(data => resolve(data))
                .catch(error => reject(error));
        } catch (error) {
            reject(error);
        }
    });
};

const deletePost = ({ postId, userId }) => {
    return new Promise((resolve, reject) => {
        try {
            PostSchema
                .findOneAndDelete({ postId, userId })
                .then(data => resolve(data))
                .catch(error => reject(error));
        } catch (error) {
            reject(error);
        }
    });
};

const likePost = ({_id, userId, post }) => {
    console.log(post[0], "1");

    return new Promise((resolve, reject) => {
        try {
            if (!post[0].like.includes(userId)) {
                return PostSchema.findOneAndUpdate({ _id }, { $push: { like: userId } }, { new: true })
                .then(data => resolve(data))
                .catch(error => reject(error));
        } else {
            return PostSchema.findOneAndUpdate({ _id }, { $pull: { like: userId } }, { new: true })
                .then(data => resolve(data))
                .catch(error => reject(error));
        }
    
        } catch (error) {
            reject(error);
        }
    });
};


module.exports = {
    insertPost,
    getPosts,
    getPostById,
    updateClientReply,
    updatePostInfo,
    deletePost,
    likePost
};