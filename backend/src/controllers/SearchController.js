const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(req, res) {
        // Query parameters
        const { latitude, longitude, techs } = req.query;
        const techsArray = parseStringAsArray(techs);

        // Finds nearby devs with specified techs using MongoDB query operators
        // Finding with parameters uses a syntax similar to defining schemas, that is, an object with field: {options},
        // with options being operators ($op) followed by the required expression
        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000,
                }
            }
        });

        res.json(devs);
    }
}