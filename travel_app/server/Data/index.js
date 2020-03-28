const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Monuments = require('./Models/Monuments');
const Users = require("./Models/Users");

module.exports = {
    Monuments,
    Users
}