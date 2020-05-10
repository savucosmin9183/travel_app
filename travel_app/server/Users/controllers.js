const express = require('express');
const nodemailer = require("nodemailer");
var randomstring = require("randomstring");

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
        const token = randomstring.generate();
        await UsersService.add(name, email, username, password, role, token);

        const url = `http://localhost:3000/api/v1/users/confirmation/${token}`;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.MAIL,
              pass: process.env.PASS
            }
          });


        const mailOptions = {
            from: `travelapp <${process.env.MAIL}>`,
            to: email,
            subject: 'Account verification',
            text: `Click on ${url} to verify your account!`
        };

        transporter.sendMail(mailOptions, function(err, info){
            if(err){
                console.log(err)
            }
            else{
                console.log('email sent: ' + info.response);
            }
        })

        

        res.status(201).end();
    } catch (err) {
        // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js 
        res.status(500);
        next(err);
    }
});

router.post('/send_answer', async (req, res, next) => {
    const{
        answer,
        mail
    } = req.body;

    try{
        const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
              user: 'travelapp45@gmail.com',
              pass: 'Qwerty123!'
            }
        });


        const mailOptions = {
            from: 'travelapp <travelapp45@gmail.com>',
            to: mail,
            subject: 'Response',
            text: answer
        };

        transporter.sendMail(mailOptions, function(err, info){
            if(err){
                console.log(err)
            }
            else{
                console.log('email sent: ' + info.response);
            }
        })
    }
    catch(err){
        next(err);
    }
    

})

router.get('/confirmation/:id', async (req, res, next) => {
    const token = req.params.id;

    try{
        const user = await UsersService.find_by_token_and_verify(token);
        res.redirect('http://localhost:3001')
    }
    catch(err){
        next(err);
    }

})

router.post('/login', async (req, res, next) => {
  const {
      username,
      password
  } = req.body;

  try {

    const token = await UsersService.authenticate(username, password);
    const user = await UsersService.get_user_by_username(username);

    res.status(200).json({token: token,
                          role: user[0].role});
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

router.get('/:id', async (req, res, next) => {
    const username = req.params.id;
    try{
        const user = await UsersService.get_user_by_username(username);
        res.json(user);
    }
    catch(err){
        next(err);
    }

})


router.put('/:id', async (req, res, next) => {
    const username = req.params.id;

    const monument = req.body;

    try{
        console.log(username);
        console.log(monument);
        await UsersService.update_visited(username, monument);
        res.status(200).end();
    }
    catch(err){
        next(err);
    }
})

router.delete('/:id', async (req, res, next) => {
    const {
        id
    } = req.params;
    try{
        await UsersService.delete_by_id(id)
        res.status(200).end();
    } catch (err) {
        next(err);
    }
})

router.delete('/', async (req, res, next) => {
    try{
        await UsersService.delete_all();
        res.status(200).end();
    }
    catch(err){
        next(err);
    }
})

module.exports = router;