let image = require("../helper/file");
let {productImage} = require("../model/addProductImage")

async function addImage(req, res) {
    let file = await image.parseFile(req, res, {
        size: 4000 * 1000,
        ext: /jpg|png|jpeg/,
        field: [{ name: 'productImage', maxCount: 1 }]
    }).catch((err) => { return { error: err } });
    if (!file || (file && file.error)) {
        let error = (file && file.error) ? file.error : "incorrect size,ext and field";
        return res.status(500).send({ error })
    }

    let data = await productImage(req.body, req.files.productImage, req.userdata).catch((err) => {
        return { error: err }
    });
    if (!data || (data && data.error)) {
        console.log("error in controller",data.error)
        let error = (data && data.error) ? data.error : "image not upload";
        return res.status(500).send({ error })
    }
    return res.status(200).send({ data: data.data })
}

module.exports = { addImage }