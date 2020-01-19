import socketio from 'socket.io-client';

const socket = socketio('http://192.168.100.107:3333', {
    autoConnect: false,
});

const subscribeToNewDevs = (subscribeFunc) => {
    socket.on('newDev', subscribeFunc);
}

const connect = (latitude, longitude, techs) => {
    socket.io.opts.query = {
        latitude,
        longitude,
        techs
    };

    socket.connect();
    socket.on('message', text => {      // Handles messages received from the server via the socket
        console.log("Receiving message");
        console.log(text);
    });
}

const disconnect = () => {
    if (socket.connected) {
        socket.disconnect();
    }
}

export { connect, disconnect, subscribeToNewDevs };