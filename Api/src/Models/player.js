const {DataTypes} = require('sequelize');

const Player = (database)=>{
    database.define("Player",{
        id_player:{
            type: DataTypes.STRING,
            primaryKey:true,
        },
        jugadores:{
            type:DataTypes.ARRAY(DataTypes.STRING)
        }
    },{
        timestamps:false
    })
}

module.exports = Player;