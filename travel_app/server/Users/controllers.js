const express = require('express');

const UsersService = require('./services.js');


const router = express.Router();

router.post('/register', async (req, res, next) => {
    const {
        name,
        email,
        username,
        password,
        role
    } = req.body;

    // validare de campuri
    try {
        await UsersService.add(name, email, username, password, role);

        res.status(201).end();
    } catch (err) {
        // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js 
        next(err);
    }
});

router.post('/login', async (req, res, next) => {
  const {
      username,
      password
  } = req.body;

  try {

    const token = await UsersService.authenticate(username, password);

    res.status(200).json(token);
} catch (err) {
    // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js 
    next(err);
}

})

router.get('/', async (req, res, next) => {
    try{
        const users = await UsersService.get_all();
        res.json(users);
    } catch (err){
        next(err);
    }
})
module.exports = router;