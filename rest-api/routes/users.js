const express = require('express');
const router = express.Router();
const User = require('../models/user/User.schema');
const bcrypt = require('bcrypt');

const {insertUser, getUserByEmail, getUserById, updatePassword, storeUserRefreshJWT, updateUserInfo, verifyUser} = require("../models/user/User.model");
const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { crateAccessJWT, crateRefreshJWT } = require("../helpers/jwt");
const { userAuthorization } = require("../middlewares/authorization");
const { setPasswordResetPin, getPinByEmail, deletePin } = require("../models/resetPin/ResetPin.model");
const { emailProcessor } = require("../helpers/nodemailer");
const { resetPassReqValidation, updatePassValidation } = require("../middlewares/formValidationJoi");
const { deleteJWT } = require("../helpers/redis");

//root router
router.all('/', (req, res, next) => {
    //res.json({ message: "return user router" });

    next();
});

// Get user profile authorization
router.get('/', userAuthorization, async (req, res) => {
    //extract user id
    const _id = req.userId;
    
    //get user profile based on the user id
    const userProf = await getUserById(_id);

    const {password, updatedAt, refreshJWT, createdAt, ...other} = userProf._doc;

    res.json({ user: other });
});

//Create and register new user route
router.post('/', async (req, res) => {
    const { email, username, password } = req.body;

    try {
        //hash password
        const hashedPassword = await hashPassword(password);

        //create new user
        const newUser = {
            username,
            email,
            password: hashedPassword,
        };

        const result = await insertUser(newUser);
        res.json({ message: "New user created", result });

    } catch (error) {
        res.status(500).json({status: "error", message: error.message});
    }
});

//User SignIn route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.json({ status: "error", message: "Invalid form submission!" });
    };

    //get user with email from db 
    const user = await getUserByEmail(email);
    
    const passFromDb = user && user._id ? user.password : null;

    if (!passFromDb) {
        return res.json({ status: "error", message: "Invalid email or password!" })
    }

    //hash password and compare with db password
    const validPassword = await comparePassword(password, passFromDb);

    if (!validPassword) {
        res.json({ status: "error", message: "Password incorrect!" });
    }

    const accessJWT = await crateAccessJWT(user.email, `${user._id}`);
    const refreshJWT = await crateRefreshJWT(user.email, `${user._id}`);

    res.json({
        status: "success",
        message: "Login Successfully!",
        accessJWT,
        refreshJWT
    });
});

//User reset password pin
router.post('/reset-password', resetPassReqValidation, async (req, res) => {
    const { email } = req.body;

    const user = await getUserByEmail(email);

    if (user && user._id) {
        //create unique 6 digit pin
        const setPin = await setPasswordResetPin(email);
        await emailProcessor({ email, pin: setPin.pin, type: "request-new-password" });

        return res.json({
                status: "success",
                message:
                    "If the email is exist in our database, the password reset pin will be sent to your email shortly."
            });
    };

    return res.json({
        status: "error",
        message:
            "If the email is exist in our database, the password reset pin will be sent to your email shortly."
    });
});

//User reset password
router.patch('/reset-password', updatePassValidation, async (req, res) => {
    const { email, pin, newPassword } = req.body;
    
    const getPin = await getPinByEmail(email, pin);

    //validate pin
    if (getPin._id) {

        const dbDate = getPin.createdAt;
        const expiresIn = 1;

        let expDate = dbDate.setDate(dbDate.getDate() + expiresIn);
        const today = new Date();

        if (today > expDate) {
            return res.json({status: "error", message: "Invalid or expired pin"});
        }
        
        //encrypt new password
        const hashPass = await hashPassword(newPassword);
        const user = await updatePassword(email, hashPass);

        if (user._id) {
            //send email notification
            await emailProcessor({ email, type: "password-update-success" });

            //delete pin from db
            deletePin(email, pin);

            return res.json({ status: "success", message: "Your password has been updated!" });
        }
    }
    
    res.json({ status: "error", message: "Unable to update your password, please try later." });
});

// User logout and invalidate jwt
router.delete('/logout', userAuthorization, async (req, res) => {
    const { authorization } = req.headers;

    //extract user id
    const _id = req.userId;

    //delete accessJWT from redis database
    deleteJWT(authorization);

    //delete refreshJWT from mangoDb
    const result = await storeUserRefreshJWT(_id, '');

    if (result._id) {
        return res.json({ status: "success", message: "Log out successfully" });
    }

    res.json({ status: "error", message: "Unable to log out, please try again later" });
});

//Update user information
router.patch('/', userAuthorization, async(req, res) => {
        try {
            //extract user id
            const _id = req.userId;

            const { username, profilePicture, coverPicture, desc, city, phone, company, position, github, skills, portfolio } = req.body;
            console.log(req.body, "_id", _id);

            const user = await updateUserInfo(_id, req.body);
            
            if (user._id) {
            const {password, updateAt, ...result} = user._doc;
                return res.status(200).json({ status: "success", result });
                
            };

            res.status(403).json("You can update only your account!",);
        } catch(err) {
            return res.status(403).json(err.message);
        }
});

/*
//delete user
router.delete("/:id", async(req, res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin) {

        try {
            const user = await User.findByIdAndDelete(req.body.userId);
            
            res.status(200).json("Account has been deleted");

        } catch(err) {
            return res.status(500).json(err);
        }

    } else {
        return res.status(403).json("You can delete only your account!");
    }
});

//follow a user
router.patch("/:id/follow", async(req, res) => {
    if(req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(!user.followers.includes(req.body.userId)) {
                await user.updateOne({ 
                    $push: {followers: req.body.userId} 
                });
                await currentUser.updateOne({ 
                    $push: {following: req.params.id} 
                });
                res.status(200).json("user has been followed");

            } else {
                res.status(403).json("you allready follow");
            }
    
        } catch(err) {
            return res.status(500).json(err);
        }

    } else {
        return res.status(403).json("You can't follow yourself")
    }
})

//unfollow a user
router.patch("/:id/unfollow", async(req, res) => {
    if(req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(user.followers.includes(req.body.userId)) {
                await user.updateOne({ 
                    $pull: {followers: req.body.userId} 
                });
                await currentUser.updateOne({ 
                    $pull: {following: req.params.id} 
                });
                res.status(200).json("user has been unfollowed");

            } else {
                res.status(403).json("you don't follow this user");
            }
    
        } catch(err) {
            return res.status(500).json(err);
        }

    } else {
        return res.status(403).json("You can't unfollow yourself")
    }
});*/


module.exports = router;