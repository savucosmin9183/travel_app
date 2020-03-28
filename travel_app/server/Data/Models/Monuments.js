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
    rating: {
        type: Number,
        min: 0,
        max: 10,
        default: 0
    },
    location: {
        type: {
            type:String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type:[Number],
            required: true
        }
    }
}, { timestamps: true });

const MonumentModel = mongoose.model('Monuments', MonumentSchema);

module.exports = MonumentModel;