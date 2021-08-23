const router = require('express').Router();
const Post = require('../models/post/Post.schema');
const { insertPost, getPosts, getPostById, updateClientReply, updatePostInfo, deletePost, likePost } = require('../models/post/Post.model');
const { getUserById } = require('../models/user/User.model');
const { userAuthorization } = require('../middlewares/authorization');
const { createNewPostValidation, replyPostMessageValidation } = require('../middlewares/formValidationJoi');


//root router
router.all('/', (req, res, next) => {
    //res.json({ message: "return post router" });

    next();
});

//Create a new post
router.post('/', userAuthorization, createNewPostValidation, async (req, res) => {
    try {
        const { title, desc, status, img } = req.body;

        const postUserId = req.userId;

        const postObj = {
            userId: postUserId,
            title,
            desc,
            status,
            img,
            conversations: [],
        };

        const result = await insertPost(postObj);

        if (result._id) {
            return res.json({status: "success", result });
        };

        res.status(403).json({status: "error", message: "Unable to create the post, please try again."});
    
    } catch (error) {
        res.status(500).json({status: "error", message: error.message});
    }
    
});

//Get all posts for specific user
router.get('/', userAuthorization, async (req, res) => {
    try {
        const userId = req.userId;

        const user = await getUserById(userId)
        const userPosts = await getPosts(userId);

        const friendPosts = await Promise.all(
                user.following.map((friendId) => {
                return getPosts( friendId );
            })
        );
        const result = await userPosts.concat(...friendPosts);

        if (userPosts.length) {
            return res.json({status: "success", result });
        };

        res.json({status: "error", message: "Couldn't find post, please try again."});
    
    } catch (error) {
        res.status(403).json({status: "error", message: error.message});
    }
    
});

//Get post by postId
router.get('/:_id', userAuthorization, async (req, res) => {
    try {
        const { _id } = req.params;

        const result = await getPostById(_id);

        return res.json({ status: "success", result });
    
    } catch (error) {
       res.status(403).json({status: "error", message: "Unable find post, please try again."});
    }
    
});

// Update post reply message  from client
router.patch('/:_id', userAuthorization, replyPostMessageValidation, async (req, res) => {
    try {

        const{ message, sender } = req.body;

        const { _id } = req.params;
        const userId = req.userId;

        const result = await updateClientReply({ _id, userId, message, sender });
        
        if (result._id) {
            return res.json({status: "success", result });
        };

        return res.status(403).json({status: "error", message: "Unable update your message, please try again."});
    
    } catch (error) {
        res.status(500).json({status: "error", message: error.message});
    }
    
});

// Update post information
router.patch('/update/:_id', userAuthorization, async (req, res) => {
    try {
        const { _id } = req.params;
        const userId = req.userId;

        const updateInfo = { ...req.body };

        const result = await updatePostInfo({ _id, userId, updateInfo });
        
        if (result._id) {
            return res.json({status: "success", result });
        };

        return res.status(403).json({status: "error", message: "Unable update post, please try again."});
    
    } catch (error) {
        res.status(500).json({status: "error", message: error.message});
    }
});

// Delete post information
router.delete('/delete/:_id', userAuthorization, async (req, res) => {
    try {
        const { _id } = req.params;
        const userId = req.userId;

        const result = await deletePost({ _id, userId });
        
        return res.json({status: "success", message: "Post has been deleted successfully!" });
    
    } catch (error) {
        res.status(500).json({status: "error", message: error.message});
    }
});

//Like or dislike post by postId
router.patch('/like/:_id', userAuthorization, async (req, res) => {
    
    try {
        const { _id } = req.params;
        const userId = req.userId;
        const post = await getPostById(_id);

        const result = await likePost({_id, userId, post });
        console.log(result);

        if (result._id) {
            return res.json({status: "success", result });
        };

        return res.status(403).json({status: "error", message: "Unable like post, please try again."});
        
    } catch (err) {
        res.status(500).json(err.message);
    }

});


module.exports = router;