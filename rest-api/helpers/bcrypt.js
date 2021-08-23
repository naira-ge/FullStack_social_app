const bcrypt = require('bcrypt');
const saltRound = 10;


const hashPassword = (plainPassword) => {
    return new Promise((resolve) => {
        resolve(bcrypt.hashSync(plainPassword, saltRound));
    })
};

const comparePassword = (plainPass, dbPass) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plainPass, dbPass, function (err, matches) {
            if (err) {
                console.log("password incorrect");
                return reject(err);
            } else if (matches) {
                console.log('The password matches!');
                return resolve(matches);
            } 
        })
    })
}

module.exports = { hashPassword, comparePassword };