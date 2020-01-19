const socketio = require('socket.io');
const parseStringAsArray = require('./utils/parseStringAsArray');
const calculateDistance = require('./utils/calculateDistance');

let io;
// Array of clients connected to the socket
// This information is saved locally for simplicity, but in a production environment,
// it would be saved on a database.
const connections = [];

exports.setupWebsocket = (server) => {
    io = socketio(server);
    io.on('connection', socket => {
        const { latitude, longitude, techs } = socket.handshake.query;

        connections.push({
            id: socket.id,
            coordinates: {
                latitude: Number(latitude),
                longitude: Number(longitude),
            },
            techs: parseStringAsArray(techs),
        });
    });
};

// Returns all connections that are close to a dev and are looking for at least one of the techs he knows
exports.findConnectionsNearDev = (coordinates, techs) => {
    const maxDist = 10;     // Given in kilometers

    return connections.filter(conn => {
        return calculateDistance(coordinates, conn.coordinates) < maxDist && conn.techs.some(tech => techs.includes(tech));
    })
};

exports.sendMessage = (toConnections, message, data) => {
    toConnections.forEach(conn => {
        io.to(conn.id).emit(message, data);
    });
}