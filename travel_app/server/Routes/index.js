const express = require('express');
const { Monuments, Messages } = require('../Data');


const UsersController = require('../Users/controllers');

const router = express.Router();

router.use('/users', UsersController);

router.get('/monuments',  async (req, res, next) => {
    try {
        const monuments = await Monuments.find();
        res.json(monuments);
    } catch (err) {
        next(err);
    }
});

router.post('/monuments/vote/:id', async (req, res, next) => {
    const id = req.params.id
    const rate = req.body.rating;

    console.log(id, rate);

    try{
        await Monuments.findOneAndUpdate({_id: id}, {$inc: {rating:rate, number_of_votes:1}})
        res.status(200).end();
    }
    catch(err){
        next(err);
    }
})

router.get('/messages', async (req, res, next) => {
    try{
        const messages = await Messages.find();
        res.json(messages);
    }
    catch(err){
        next(err);
    }
})

router.post('/messages', async (req, res, next) => {
    const{
        username,
        message
    } = req.body
    try{
        const msg = new Messages({
            username,
            message
        });
        await msg.save();
        res.status(200).end();
    }
    catch(err){
        next(err);
    }
})


router.post('/monuments', async (req, res, next) => {
    const {
        title,
        description,
        address,
        image,
        longitude,
        latitude
    } = req.body;
    try {
        const monument = new Monuments({
            title,
            description,
            address,
            image,
            longitude,
            latitude
        });
        await monument.save();
        res.status(201).end();
    } catch (err){
        if(err.name === "ValidationError")
            res.status(400);
        next(err);
    }
});

router.delete('/monuments/:id', async (req, res, next) => {
    const {
        id
    } = req.params;

    try{
        await Monuments.findByIdAndDelete(id);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
})


module.exports = router;