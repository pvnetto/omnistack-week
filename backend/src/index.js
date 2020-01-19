const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');

const { setupWebsocket } = require('./websocket')
const routes = require('./routes');


require('dotenv').config();
const PORT = 3333;

const app = express();
// Extracts HTTP server from the express server
// This allows us to use it separately for web socket, while keeping express functionalities
const server = http.Server(app);

setupWebsocket(server);
mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0-zjtyi.mongodb.net/${process.env.MONGODB_DB_NAME}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});