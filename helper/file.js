const { func } = require("joi");
let multer = require("multer");
let fs = require("fs").promises;

async function parseFile(req, res, option = {}) {
    let size = (option.size) ? option.size : "1000*3";
    let ext = (option.ext) ? option.ext : "jpg|png";
    let field = (option.field) ? option.field : null;
    if (!field) {
        return { error: "fields are required" }
    }

    let upload = multer({
        limit: size,
        fileFilter: function (req, file, cb) {
            let test = ext.test(file.mimetype)
            if (!test) {
                return cb({ error: "this extension is not allowed" })
            }
            cb(null, true)
        }
    });
    if (typeof (field) == "string") {
        upload = upload.single(field)
    } else if (typeof (field) == "object") {
        upload = upload.fields(field)
    } else {
        return { error: "please pass a field" }
    }

    return new Promise((resolve, reject) => {
        upload(req, res, (error) => {
            if (error) {
                reject(error)
            }
            resolve(true)
        });
    });
}
async function singleFileUpload(destination, buffer) {
    let file = await fs.writeFile(destination, buffer).catch((err) => {
        return { error: err }
    });
    if (file && file.error) {
        return { error: file.error }
    }
    return { data: true }
}

module.exports = { parseFile, singleFileUpload }