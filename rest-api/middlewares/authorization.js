const { verifyAccessJWT } = require("../helpers/jwt");
const { getJWT, deleteJWT } = require("../helpers/redis");

const userAuthorization = async (req, res, next) => {
  const { authorization } = req.headers;

  //verify if jwt is valid
  const decoded = await verifyAccessJWT(authorization);

  if (decoded.email) {
    //check if jwt is exit in redis
    const userId = await getJWT(authorization);
  
    if (!userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    req.userId = userId;

    return next();
  };

  //delete old token from redis db
  deleteJWT(authorization);

  return res.status(403).json({ message: "Forbidden JWT" });
}

/*
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
};*/

module.exports = {
    userAuthorization,
    /*verify*/
};