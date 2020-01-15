const mongoose = require('mongoose');

const PointSchema = new mongoose.Schema({
    type: {                 // In this case, fields are declared with a config object, instead of just the type
        type: String,
        enum: ['Point'],
        required: true,
    },
    coordinates: {
        type: [Number],     //  A coordinate is an array with two numbers
        required: true,
    }
});

module.exports = PointSchema;