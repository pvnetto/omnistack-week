const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const PORT = 3333;

const app = express();
mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0-zjtyi.mongodb.net/${process.env.MONGODB_DB_NAME}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});