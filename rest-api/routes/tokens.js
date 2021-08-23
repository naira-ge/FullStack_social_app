const express = require('express');
const router = express.Router();

const { verifyRefreshJWT, crateAccessJWT } = require('../helpers/jwt');
const { getUserByEmail } = require('../models/user/User.model');


//return refresh jwt
router.get("/", async (req, res, next) => {
    const { authorization } = req.headers;

    //check token validation 
    const decoded = await verifyRefreshJWT(authorization);
    if (decoded.email) {
        //check if the jwt is exit in DB
        const userProf = await getUserByEmail(decoded.email);
        
        if (userProf._id) {
            //check if it's JWT not expired
            let tokenExp = userProf.refreshJWT.addedAt;
            const dbRefreshToken = userProf.refreshJWT.token;

            tokenExp = tokenExp.setDate(tokenExp.getDate() + +process.env.JWT_REFRESH_SECRET_EXP_DAY);
            const today = new Date();

            if (dbRefreshToken !== authorization && tokenExp < today) {
                return res.status(403).json({ message: "Expired token" });
            }

            const accessJWT = await crateAccessJWT(decoded.email, userProf._id.toString());
            

            return res.json({status: "success", accessJWT });
        }
    }


    return res.status(403).json({ message: "Forbidden JWT" });
})

module.exports = router;