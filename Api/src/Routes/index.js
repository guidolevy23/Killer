const { Router } = require('express');
const {Place, Costume , Player , Gun} = require('../db');
const gunRoute = require('./gun');
const placeRoute = require('./place');
const costumeRoute = require('./costume')
const playerRoute = require('./player')
const router = Router();

router.use('/gun',gunRoute)
router.use('/place',placeRoute)
router.use('/costume', costumeRoute)
router.use('/player', playerRoute)

router.get('/all', async (req,res)=>{
    try {
        const arrayPlaces = [];
        const arrayCostumes = [];
        const arrayPlayers = [];
        const arrayGuns = [];

        const allPlayers = await Player.findAll();
        for (let i = 0; i < allPlayers[0].dataValues.jugadores.length; i++) {
            arrayPlayers.push(allPlayers[0].dataValues.jugadores[i])   
        }
        const allCostumes = await Costume.findAll();
        for (let i = 0; i < allCostumes.length; i++) {
            arrayCostumes.push(allCostumes[i].name)   
        }
        const allGuns = await Gun.findAll();
        for (let i = 0; i < allGuns.length; i++) {
            arrayGuns.push(allGuns[i].type)   
        }
        const allPlaces = await Place.findAll();
        for (let i = 0; i < allPlaces.length; i++) {
            arrayPlaces.push(allPlaces[i].name)   
        }
        const todito = [{costumes:[...arrayCostumes]},{guns: [...arrayGuns]},{place:[...arrayPlaces]}, {players:[...arrayPlayers]}];
        res.status(200).send(todito)
    } catch (error) {
        res.status(400).send(error.message)
    }


})

module.exports = router;