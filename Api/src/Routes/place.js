const {Router} = require('express');
const {Place} = require('../db');

const router = Router();

router.get('/', async (req,res)=>{
    try {
        const allPlaces = await Place.findAll();
        const arrayPlaces = [];
        for (let i = 0; i < allPlaces.length; i++) {
            arrayPlaces.push(allPlaces[i].name)   
        }
        res.status(200).send(arrayPlaces)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.post('/',async (req,res)=>{
    const {object} = req.body;
    try {
        const newPlace = await Place.create({object});
        res.status(200).send(newPlace);
    } catch (error) {
        res.status(400).send(error.message)

    }
})

router.post('/array',async (req,res)=>{
    console.log(req.body);
    const objects = req.body;
    try {
        const newPlaces = await Place.bulkCreate(objects);
        res.status(200).send(newPlaces);
    } catch (error) {
        res.status(400).send(error.message)

    }
})

module.exports = router;