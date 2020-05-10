const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: true });

const MessageModel = mongoose.model('Messages', MessageSchema);
module.exports = MessageModel;