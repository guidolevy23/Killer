const {DataTypes} = require('sequelize');

const Costume = (database) => {
    database.define("Costume", {
        id_costume:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name:{
            type: DataTypes.STRING,
            allowNull : false,
            unique:true

        }
    },
    {
        timestamps:false
    })
}

module.exports = Costume;