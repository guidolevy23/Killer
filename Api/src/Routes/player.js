const {Router} = require('express');
const {Player} = require('../db');

const router = Router();

router.get('/', async (req,res)=>{
    try {
        const allPlayers = await Player.findAll();
        console.log(allPlayers[0].dataValues.jugadores);
        const arrayPlayers = [];
        for (let i = 0; i < allPlayers[0].dataValues.jugadores.length; i++) {
            arrayPlayers.push(allPlayers[0].dataValues.jugadores[i])   
        }
        res.status(200).send(arrayPlayers)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.post('/',async (req,res)=>{
    const {jugadores, id_player} = req.body;
    try {
        const players = await Player.create({jugadores, id_player});
        res.status(200).send(players);
    } catch (error) {
        res.status(400).send(error.message)

    }
})

router.put('/update', async (req,res)=>{
    const {jugadores, id_player} = req.body;
    try{
        const players = await Player.update({ jugadores}, {
            where: {
              id_player
            }
          });
        res.status(200).send(players)
    } catch(error){
        res.status(400).send(error.message)
    }
})

router.delete('/delete/:id_player', async (req,res)=>{
    const {id_player} = req.params;
    await Player.destroy({
        where: {
          id_player
        }
      });
})

module.exports = router;