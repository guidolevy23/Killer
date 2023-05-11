const {Player} = require('../db')

const getAllPlayers =async ()=>{
    console.log("ENTRE AL CONTROLADOR");
    const allPlayers = await Player.findAll();
    // console.log(allPlayers[0].dataValues.jugadores);
    const arrayPlayers = [];
    for (let i = 0; i < allPlayers[0].dataValues.jugadores.length; i++) {
        arrayPlayers.push(allPlayers[0].dataValues.jugadores[i])   
    }
    return allPlayers
    
}




module.exports = getAllPlayers()