let mail = require("nodemailer")

async function gmail(mailoption) {
    return new Promise((res, rej) => {
        let transport = mail.createTransport({
            service: "gmail",
            auth: {
                user: "skzain234@gmail.com",
                pass: "rqfalzosvudvczvn"
            }
        })
        transport.sendMail(mailoption, (error, info) => {
            if (error) {
                rej(false)
            }
            res(`otp send to your email ${mailoption.to}`)
        })
    })
}

module.exports = { gmail }