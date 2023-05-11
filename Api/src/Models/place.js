const {DataTypes} = require('sequelize');

const Place = (database)=>{
    database.define("Place",{
        id_place:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
            unique:true
        }
    },
    {
        timestamps:false
    })
}

module.exports = Place;