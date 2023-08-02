let joi = require("joi");
let { Product_image } = require("../schema/productImageSchema")
let {singleFileUpload,parseFile} = require("../helper/file")


async function imageUplaod(param) {
    let schema = joi.object({
        product_id: joi.number().required()
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

async function productImage(param, files, userdata) {
    let check = await imageUplaod(param).catch((err) => {
        return { error: err }
    });
    if (!check || (check && check.error)) {
        let error = (check && check.error) ? check.error : "incorrect data";
        return { error, status: 400 }
    }

    let not_upload = [];
    let bulkimage = [];

    let filedestination = "C:/ZAIN/Eshoppers/public/upload/"
    for (let i of files) {
    
        let fileName = Date.now() + "-" + Math.round(Math.random() * 1E9);
        let ext = i.mimetype.split('/').pop();
        let upload = await singleFileUpload(filedestination+fileName+"."+ext,i.buffer).catch((err) => {
            return { error: err }
        });
        if (!upload || (upload && upload.error)) {
            not_upload.push({ error: upload })
            continue;
        }
        bulkimage.push({ product_id: param.product_id, image_name: fileName })
    }
    param["created_by"]=userdata.id;
    
    let uploadImage = await Product_image.bulkCreate(bulkimage).catch((err) => {
        return { error: err }
    });
    if (!uploadImage || (uploadImage && uploadImage.error)) {
        let error = (uploadImage && uploadImage.error) ? uploadImage.error : "image not upload";
        return {error,status:500}
    }
    return {data:"image uploaded successfully"}
}

module.exports = { productImage }