const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');

const devSchema = new mongoose.Schema({
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String],
    location: {
        type: PointSchema,      // Uses schema as a type for location
        index: '2dsphere'       // This index is required for coordinates in MongoDB
    }
});

module.exports = mongoose.model('Dev', devSchema);