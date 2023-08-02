let { User } = require("../schema/userSchema");
let joi = require("joi");
let bcrypt = require('bcrypt');
let { User_permission } = require("../schema/UserPermissionSchema")
let { encrypt } = require("../helper/securityHelper")
let { gmail } = require("../helper/mailer");
let randomstring = require("randomstring");
const { where } = require("sequelize");
// let Otp = require("otp-generator");

//user's register joivalidation function..
async function checkRegister(param) {
    let schema = joi.object({

        name: joi.string().min(4).max(100).required(),
        email: joi.string().min(6).max(55).required(),
        password: joi.string().min(8).max(150).required()
    });

    let valid = await schema.validateAsync(param, { abortEarly: false }).catch((err) => {
        return { error: err }
    });
    if (!valid || (valid && valid.error)) {
        let msg = [];
        for (let i of valid.error.details) {
            msg.push(i.message)
        }
        return { error: msg }
    }
    return { data: valid.data }

}

//user's registeration function..
async function Register(param) {
    let check = await checkRegister(param).catch((err) => {
        return { error: err }
    });

    if (!check || (check && check.error)) {
        let error = (check && check.error) ? check.error : "invalid register data";
        let status = (check && check.status) ? check.status : 400
        return { error, status }
    }

    param.password = await bcrypt.hash(param.password, 10).catch((err) => {
        return { error: err }
    })
    if (!param.password || (param.password && param.password.error)) {
        let error = (param.password && param.password.error) ? param.password.error : "error in password encrption";
        return { error, status: 401 }
    }

    let find = await User.findOne({ where: { email: param.email } }).catch((err) => {
        return { error: err }
    });

    if (find) {
        return { error: "this email is already registered" }
    }

    let user = await User.create(param).catch((err) => {
        return { error: err }
    })
    if (!user || (user && user.error)) {
        let error = (user && user.error) ? user.error : "user not created";
        return { error, status: 401 }
    }

    let user_permission = await User_permission.create({ user_id: user.id, permission_id: 5 }).catch((err) => {
        return { error: err }
    });

    if (!user_permission || (user_permission && user_permission.error)) {

        let del = await User.destroy({ where: { id: user.id } }).catch((err) => {
            return { error: err }
        });

        if (del.error) {
            return { error: "permission denied" }
        }

        return { error: "internal server error" }
    }

    return { data: user }
}

//user's login joivalidation function..
async function checkLogin(param) {
    let schema = joi.object({
        email: joi.string().min(5).max(100).required(),
        password: joi.string().min(8).max(150).required(),
    });

    let valid = await schema.validateAsync(param, { abortEarly: false }).catch((err) => {
        return { error: err }
    });
    if (!valid || valid && valid.error) {
        let msg = [];
        for (let i of valid.error.details) {
            msg.push(i.message)
        }
        return { error: msg }
    }
    return { data: valid.data }
}


//user's login function..
async function Login(param) {
    let valid = await checkLogin(param).catch((err) => {
        return { error: err }
    });
    if (!valid || (valid && valid.error)) {
        let error = (valid && valid.error) ? valid.error : "invalid login data";
        return { error, status: 400 }
    }

    let user = await User.findOne({ where: { email: param.email } }).catch((err) => {
        return { error: err }
    });
    if (!user || (user && user.error)) {
        let error = (user && user.error) ? user.error : "user not found";
        return { error, status: 404 }
    }

    let compare = await bcrypt.compare(param.password, user.password).catch((err) => {
        return { error: err }
    });
    if (!compare || (compare && compare.error)) {
        let error = (compare && compare.error) ? compare.error : "wrong password";
        return { error, status: 401 }
    }

    let token = await encrypt({ id: user.id }, "#@#@#").catch((err) => {
        return { error: err }
    });

    if (!token || (token && token.errror)) {
        let error = (token && token.error) ? token.error : "error in token";
        return { error, status: 500 }
    }
    let updatedUser = await User.update({ token: token }, { where: { id: user.id } }
    ).catch((err => { return { error: err } }
    ));

    if (!updatedUser || (updatedUser && updatedUser.error)) {
        let error = (updatedUser && updatedUser.error) ? updatedUser.error : "user not updated";
        return { error, status: 401 }
    }

    return { data: "logging success", token: token }
}

//user's forget password joivalidation function..
async function verifyEmail(param) {
    let schema = joi.object({
        email: joi.string().min(4).max(150).required(),
    });

    let valid = await schema.validateAsync(param, { abortEarly: false }).catch((err) => {
        return { error: err }
    });

    if (!valid || (valid && valid.error)) {
        let msg = [];
        for (let i of valid.error.details) {
            msg.push(i.message)
        }
        return { error: msg }
    }
    return { data: valid.data }
}


//user's forget password function..
async function forgetPassword(param) {
    let check = await verifyEmail(param).catch((err) => {
        return { error: err }
    });

    if (!check || (check && check.error)) {
        let error = (check && check.error) ? check.error : "invalid forgetpassword data";
        return { error, status: 400 }
    }

    let user = await User.findOne({ where: { email: param.email } }).catch((err) => {
        return { error: err }
    });

    if (!user || (user && user.error)) {
        let error = (user && user.error) ? user.error : "user not found";
        return { error, status: 404 }
    }

    let otp = randomstring.generate(6)
    let encryptedOTP = await bcrypt.hash(otp, 10).catch((err) => {
        return { error: err }
    });
    if (!encryptedOTP || (encryptedOTP && encryptedOTP.error)) {
        let error = (encryptedOTP && encryptedOTP.error) ? encryptedOTP.error : "error in otp encryption";
        return { error, status: 500 }
    }
    user.otp = encryptedOTP

    let result = await user.save().catch((err) => {
        return { error: err }
    });
    // let result = await User.update({otp:otp},{where:{id:user.id}})

    if (!result || (result && result.error)) {
        let error = (result && result.error) ? result.error : "otp is not save";
        return { error, status: 501 }
    }

    let mailoption = {
        from: "skzain234@gmail.com",
        to: user.email,
        subject: "Forgot Password",
        text: `your OTP is ${otp} for forgot password`
    }

    let sendmail = await gmail(mailoption).catch((err) => {
        return { error: err }
    });

    if (!sendmail || (sendmail && sendmail.error)) {
        let error = (sendmail && sendmail.error) ? sendmail.error : "mail not send";
        return { error, status: 500 }
    }

    return { data: sendmail }
}

//user's reset password joivalidation function..
async function verifyPassword(param) {
    let schema = joi.object({
        email: joi.string().min(10).max(25).required(),
        otp: joi.string().min(6).required(),
        password: joi.string().min(8).required()
    });

    let valid = await schema.validateAsync(param, { abortEarly: false }).catch((err) => {
        return { error: err }
    });

    if (!valid || (valid && valid.error)) {
        let msg = [];
        for (let i of valid.error.details) {
            msg.push(i.message)
        }
        return { error: msg }
    }
    return { data: valid.data }
}

//user's reset password function..
async function resetPassword(param) {
    let check = await verifyPassword(param).catch((err) => {
        return { error: err }
    });
    if (!check || (check && check.error)) {
        let error = (check && check.error) ? check.error : "invalid reset data";
        return { error, status: 400 }
    }

    let user = await User.findOne({ where: { email: param.email } }).catch((err) => {
        return { error: err }
    });
    if (!user || (user && user.error)) {
        let error = (user && user.error) ? user.error : "user not foun";
        return { error, status: 404 }
    }

    let compareotp = await bcrypt.compare(param.otp, user.otp).catch((err) => {
        return { error: err }
    });
    if (!compareotp || (compareotp && compareotp.error)) {
        let error = (compareotp && compareotp.error) ? compareotp.error : "error in otp comparision";
        return { error, status: 500 }
    }

    param.password = await bcrypt.hash(param.password, 10).catch((err) => {
        return { error: err }
    });
    if (!param.password || (param.password && param.password.error)) {
        let = (param.password && param.password.error) ? param.password.error : "password encryption error";
        return { error, status: 500 }
    }

    let updatePassword = await User.update({ password: param.password, otp: "" }, { where: { otp: param.otp } }).catch((err) => {
        return { error: err }
    });

    if (!updatePassword || (updatePassword && updatePassword.error)) {
        let error = (updatePassword && updatePassword.error) ? updatePassword.error : "password not updated";
        return { error, status: 500 }
    }

    return { data: "password reset successfully" }

}
 
module.exports = { Register, Login, forgetPassword, resetPassword }