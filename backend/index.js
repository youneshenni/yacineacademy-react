const express = require('express');
const app = express();
const port = 3000;

const mongoose = require('mongoose');
mongoose.connect('mongodb://root:example@localhost:27017/');

app.get('/api/menu', (req, res) => {
    mongoose.connection.useDb('yacineacademy').collection('menu').find({}).toArray().then(result => result[0].menu).then(x => res.json(x));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});