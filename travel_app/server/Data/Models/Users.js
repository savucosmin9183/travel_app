const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    confirmed:{
        type: Boolean,
        default: false
    },
    confirmation_token:{
        type: String,
        default: ""
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user',
        enum: ['admin', 'user', 'tech']
    },
    visited:{
        type: Array,
        default: []
    }
}, { timestamps: true });

const UserModel = mongoose.model('Users', UserSchema);
module.exports = UserModel;
