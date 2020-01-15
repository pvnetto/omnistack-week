const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0-zjtyi.mongodb.net/${process.env.MONGODB_DB_NAME}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(express.json());
app.use(routes);

app.listen(3000, () => {
    console.log('Listening on port 3000');
});