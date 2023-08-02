let { Sequelizecon, Model, DataTypes, QueryTypes, Op, sequelizecon } = require("../init/dbconfig");

class Product_image extends Model { }
Product_image.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    image_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
    { tableName: "product_image", modelName: "Product_image", sequelize: sequelizecon }
);

module.exports = { Product_image }