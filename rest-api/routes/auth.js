const router = require("express").Router();
const User = require("../models/user/User.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { crateAccessJWT, crateRefreshJWT } = require("../helpers/jwt");


//Refresh token
const refreshTokens = [];

router.post("/refresh", async (req, res) => {
    //take the refresh token from the user
    const refreshToken = req.body.token;

    //send error if there is no token ot it's invalid
    if (!refreshToken) {
        return res.status(401).json("You are not authenticated!");
    }
    if (!refreshTokens.includes(refreshToken)) {
        return res.status(403).json("Refresh token is not valid!");
    }

    jwt.verify(refreshToken, "myRefreshSecretKey", (err, user) => {
        if (err) {
                return res.status(403).json("Token is not valid");
        };

        refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateAccessToken(user);
        refreshToken.push(newRefreshToken);

        res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        });
    })
    //create new access token, refresh token and send to user

});

const generateAccessToken = (user) => {
    return jwt.sign(
            { id: user.id, isAdmin: user.isAdmin },
            process.env.JWT_ACCESS_SECRET,
            { expiresIn: "1d" }
    );
};

const generateRefreshToken = (user) => {
    return jwt.sign(
            { id: user.id, isAdmin: user.isAdmin },
            process.env.JWT_REFRESH_SECRET
    );
}

//REGISTER User
router.post("/register", async (req, res) => {

    try {
        //generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        
        //create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });
        
        //save user and return respond
        const user = await newUser.save();

        //Generate an access token 
            const accessToken = generateAccessToken(user.email);
            const refreshToken = generateRefreshToken(user.email);
            refreshTokens.push(refreshToken);

            const {password, updateAt, createdAt, ...other} = user._doc;
        
        res.status(200).json({
                ...other,
                accessToken,
                refreshToken
        });

    } catch(err) {
        res.status(500).json(err);
    }
});


//LOGIN User
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json("User not found");
        } else {

            //Generate an access token 
            const accessToken = generateAccessToken(user.email);
            const refreshToken = generateRefreshToken(user.email);
            refreshTokens.push(refreshToken);

            res.status(200).json({
                username: user.username,
                isAdmin: user.isAdmin,
                id: user._id,
                accessToken,
                refreshToken,
            });
        }

        const validPassword = await bcrypt.compare(password, user.password, function (err, matches) {
            if (err) {
                 console.log('Error while checking password');
            } else if (matches) {
                console.log('The password matches!');
            } 
        });
        
        if (!validPassword) {
            return res.status(400).json("password incorrect");
        }

    } catch (err) {
        res.status(500).json(err);
    }
    
});

const verify = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, "mySecretKey", (err, user) => {
            if (err) {
                return res.status(403).json("Token is not valid");
            }
            
            req.user = user;
            next();
        })
    } else {
        res.status(401).json("You are not authenticated!")
    }
};


//DELETE user
router.delete("/:userId", verify, async (req, res) => {
    try {
    if (req.user.id === req.params.userId || req.user.isAdmin) {
        const user = await User.findByIdAndDelete(req.params.userId);

        res.status(200).json("User has been deleted.");
    } else {
        res.status(403).json("You are not allowed to delete this user!")
    }

    } catch (err) {
        res.status(500).json(err);
    }
});

//LogOut User
router.post('/logout', verify, async (req, res) => {
    try {
        const refreshToken = await req.body.token;
        refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
        res.status(200).json("You logged out successfully.");
    } catch (err) {
        res.status(500).json(err);
    }
    
});

module.exports = router;