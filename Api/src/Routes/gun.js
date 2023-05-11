const {Router} = require('express')
const {Gun} = require('../db') 
const router = Router();

router.get('/', async (req,res)=>{
    try {
        const allGuns = await Gun.findAll();
        const arrayGuns = [];
        for (let i = 0; i < allGuns.length; i++) {
            arrayGuns.push(allGuns[i].type)   
        }
        res.status(200).send(arrayGuns)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.post('/',async (req,res)=>{
    const {type} = req.body;
    try {
        const newGun = await Gun.create({type});
        res.status(200).send(newGun);
    } catch (error) {
        res.status(400).send(error.message)

    }
})

router.post('/array',async (req,res)=>{
    const types = req.body;
    try {
        const newGuns = await Gun.bulkCreate(types);
        res.status(200).send(newGuns);
    } catch (error) {
        res.status(400).send(error.message)

    }
})


module.exports = router;