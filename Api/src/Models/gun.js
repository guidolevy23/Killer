const {DataTypes} = require('sequelize');

const Gun = (database)=>{
    database.define("Gun",{
        id_gun:{
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey: true
        },
        type:{
            type: DataTypes.STRING,
            allowNull: false,
            unique:true
        }
    },{
        timestamps:false
    })
}

module.exports = Gun;