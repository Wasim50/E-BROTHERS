const { func } = require("joi");
let jwt = require("jsonwebtoken");
// let bcrypt = require("bcrypt");
//it is based on callback function

//jwt =>sign,verify
//bcrypt =>hash,compare

function encrypt(data, key) {
    return new Promise((res, rej) => {
        jwt.sign(data, key, (err, data) => {
            if (err) { rej(err) }
            res(data)
        });
    });
}

function decrypt(data, key) {
    return new Promise((res, rej) => {
        jwt.verify(data, key, (err,data) => {
            if (err) { rej(err) }
            res(data)
        });
    });
}

module.exports = { encrypt, decrypt }