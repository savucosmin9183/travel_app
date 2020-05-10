const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/*
#Monument entry
    *Title
    *Description
    *Image
    *Rating
    *Latitude
    *Longitude
*/
const MonumentSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    number_of_votes: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    longitude: {
        type: Number,
        min: -180,
        max: 180,
        required: true
    },
    latitude: {
        type: Number,
        min: -90,
        max: 90,
        required: true 
    }
}, { timestamps: true });

const MonumentModel = mongoose.model('Monuments', MonumentSchema);

module.exports = MonumentModel;