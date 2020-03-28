const express = require('express');
const { Monuments } = require('../Data');
const {
    authorizeAndExtractToken
} = require('../security/Jwt');

const {
    authorizeRoles
} = require('../security/Roles');

const UsersController = require('../Users/controllers');

const router = express.Router();

router.use('/users', UsersController);

router.get('/monuments', authorizeAndExtractToken, authorizeRoles('admin','user'),  async (req, res, next) => {
    try {
        const monuments = await Monuments.find();
        res.json(monuments);
    } catch (err) {
        next(err);
    }
});

router.post('/monuments', authorizeAndExtractToken, authorizeRoles('admin'), async (req, res, next) => {
    const {
        title,
        description,
        address,
        image,
        rating,
        location
    } = req.body;
    try {
        const monument = new Monuments({
            title,
            description,
            address,
            image,
            rating,
            location
        });
        await monument.save();
        res.status(201).end();
    } catch (err){
        if(err.name === "ValidationError")
            res.status(400);
        next(err);
    }
});

router.delete('/monuments/:id', authorizeAndExtractToken, authorizeRoles('admin'), async (req, res, next) => {
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