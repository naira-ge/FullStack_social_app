const jwt = require("jsonwebtoken");
const { setJWT, getJWT } = require("./redis");
const { storeUserRefreshJWT } = require("../models/user/User.model");
const { token } = require("morgan");

const crateAccessJWT = async (email, _id) => {
  try {
    const accessJWT = await jwt.sign(
      { email },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: '7d'});

    await setJWT(accessJWT, _id);

    return Promise.resolve(accessJWT);

  } catch (error) {
    return Promise.reject(error);
  }
  
};

const crateRefreshJWT = async (email, _id) => {
  try {
    const refreshJWT = jwt.sign({ email }, process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_SECRET_EXP_DAY });
  
    await storeUserRefreshJWT(_id, refreshJWT);
    return Promise.resolve(refreshJWT);

  } catch (error) {
    return Promise.reject(error);
  }
  
};

const verifyAccessJWT = (userJWT) => {
  try {
    return Promise.resolve(jwt.verify(userJWT, process.env.JWT_ACCESS_SECRET));
  } catch (error) {
    return Promise.resolve(error);
  }
};

const verifyRefreshJWT = (userJWT) => {
  try {
    return Promise.resolve(jwt.verify(userJWT, process.env.JWT_REFRESH_SECRET));
  } catch (error) {
    return Promise.resolve(error);
  }
};



module.exports = {
  crateAccessJWT,
  crateRefreshJWT,
  verifyAccessJWT,
  verifyRefreshJWT,
};