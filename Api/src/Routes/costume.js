const {Router} = require('express')
const {Costume} = require('../db')

const router = Router();

router.get('/', async (req,res)=>{
    try {
        const allCostumes = await Costume.findAll();
        const arrayCostumes = [];
        for (let i = 0; i < allCostumes.length; i++) {
            arrayCostumes.push(allCostumes[i].name)   
        }
        res.status(200).send(arrayCostumes)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.post('/',async (req,res)=>{
    const {name} = req.body;
    try {
        const newCostume = await Costume.create({name});
        res.status(200).send(newCostume);
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.post('/array',async (req,res)=>{
    const names = req.body
    try {
        const newCostumes = await Costume.bulkCreate(names);
        res.status(200).send(newCostumes);
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router;