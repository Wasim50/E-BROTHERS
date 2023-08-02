

function globalErrorHandler(error, req, res, next) {
    console.log("URL", req.url);
    console.log("Request Body", req.params, req.query, req.body);
    console.log("Globel Error Handler", error);
    console.log( error.name );
    console.log( error.message );
    res.status(500).send({ error: "internal server error" });
}

module.exports = { globalErrorHandler }