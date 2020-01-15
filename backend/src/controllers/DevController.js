const Dev = require('../models/Dev');
const axios = require('axios');
const parseStringAsArray = require('../utils/parseStringAsArray');


module.exports = {
    async index(req, res) {
        const allDevs = await Dev.find();
        res.json(allDevs);
    },

    async store(req, res) {
        const { github_username, techs, latitude, longitude } = req.body;
        const gitResponse = await axios.get(`https://api.github.com/users/${github_username}`);
        const { name, login, avatar_url, bio } = gitResponse.data;

        // If dev doesn't exist on db, create one
        let newDev = await Dev.findOne({ github_username });
        if (!newDev) {
            const techsArray = parseStringAsArray(techs);

            // Latitude, longitude are inverted in MongoDB
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }

            newDev = await Dev.create({
                github_username,
                name: name || login,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            })
        }

        res.json(newDev);
    }
}