let { Sequelize, DataTypes, Model, QueryTypes, Op } = require("sequelize");

let sequelizecon = new Sequelize("mysql://root:@localhost/pac");

sequelizecon.authenticate()
    .then((data) => {
        console.log("connected to DB")
    })
    .catch((error) => {
        console.log("not connected to DB")
    });

    Sequelize.sync()

module.exports = { DataTypes, Model, QueryTypes, Op, sequelizecon }


