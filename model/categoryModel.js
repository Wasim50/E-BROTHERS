const { compareSync } = require("bcrypt");
let { Category } = require("../schema/cetagorySchema");
let joi = require("joi");

//addcategory joivalidation function.
async function addCategory(param) {
    let schema = joi.object({
        name: joi.string().min(4).max(50).required(),
        p_id: joi.number().min(0)
    });

    let validate = await schema.validateAsync(param, { abortEarly: false }).catch((err) => {
        return { error: err }
    });
    if (!validate || (validate && validate.error)) {
        let msg = [];
        for (let i of validate.error.details) {
            msg.push(i.message)
        }
        return { error: msg }
    }
    return { data: validate.data }

}

//add category function..
async function add(param, userdata) {
    let validate = await addCategory(param).catch((err) => {
        return { error: err }
    });
    if (!validate || (validate && validate.error)) {
        return { error: validate.error }
    }

    if (param.p_id) {
        let cat = await Category.findOne({ where: { id: param.p_id } }).catch((err) => {
            return { error: err }
        });
        if (!cat || (cat && cat.error)) {
            return { error: "parent cat not found" }
        }
    }

    param["created_by"] = userdata.id
    param["updated_by"] = userdata.id

    let createds = await Category.create(param).catch((err) => {
        return { error: err }
    });
    if (!createds || (createds && createds.error)) {
        return { error: " cat not added in DB" }
    }
    return { data: createds }
}

//update category joivalidation function..
async function updateCategory(param) {
    let schema = joi.object({
        id: joi.number().min(1).required(),
        name: joi.string().min(4).max(50),
        p_id: joi.number().min(1)
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

//update category function..
async function update(param, userdata) {

    let verify = await updateCategory(param).catch((err) => {
        return { error: err }
    });

    if (!verify || (verify && verify.error)) {
        let error = (verify&&verify.error)?verify.error:"invalid data";
        return { error,status:400 }
    }

    if (param.id) {
        let category = await Category.findOne({ where: { id: param.id } }).catch((err) => {
            return { error: err }
        });
        if (!category || (category && category.error)) {
            let error = (category && category.error) ? category.error : "data not found";
            return { error, status: 404 }
        }
    }

    param["updated_by"] = userdata.id

    let updateds = await Category.update(param, { where: { id: param.id } }).catch((err) => {
        return { error: err }
    });
    if (!updateds || (updateds && updateds.error)) {
        let error = (updateds || (updateds && updateds.error)) ? updateds.error : "error while updating";
        return { error, status: 501 }
    }
    return { data: updateds, status: 200 }
}

//viewall category joivalidation function..
async function viewCategory(param) {
    let schema = joi.object({
        id: joi.number(),
        name: joi.string().min(4).max(100),
        p_id: joi.number(),
        page: joi.number(),
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

//viewall category function..
async function viewall(param) {
    let check = await viewCategory(param).catch((err) => {
        return { error: err }
    });

    if (!check || (check && check.error)) {
        let error = (check && check.error) ? check.error : "invalid data";
        return { error, status: 401 }
    }

    let where = {}
    if (param.id) { where["id"] = param.id }
    if (param.name) { where["name"] = param.name }
    if (param.p_id) { where["p_id"] = param.p_id }

    let record = (param.record) ? param.record : 10;
    let page = (param.page) ? param.page : 1;
    let offset = record * (page - 1);

    let counts = await Category.count({ where: where }).catch((err) => {
        return { error: err }
    });
    if (!counts || (counts && counts.error)) {
        let error = (counts && counts.error) ? counts.error : "can't count ";
        return { error, status: 404 }
    }

    let categories = await Category.findAll({
        where: where,
        limit: record,
        offset: offset
    }).catch((err) => { return { error: err } });
    if (!categories || (categories && categories.error)) {
        let error = (categories && categories.error) ? categories.error : "data not found";
        return { error, status: 404 }
    }

    let res = {
        data: categories,
        total: counts,
        page: page,
        record: record
    }
    return res;
}
module.exports = { add, update, viewall }