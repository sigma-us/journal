const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config()
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');

app.use(require('./app/config/static.files'))
//handle static 404
app.use(function (err, req, res, next) {
    if (err) console.error
    res.sendStatus(404)
})

app.use(bodyParser.json());

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017', {
    useMongoClient: true
});

mongoose.connection.on('connected', () => {
    console.log('connected');
})
process.on('SIGINT',  () => {
    mongoose.connection.close( () => {
        console.log('Mongoose default connection disconnected through app termination')
        process.exit(0)
    })
})


app.use(require('./app/routes'));
// app.use('./public', express.static(path.join(__dirname, 'public'), {
//     fallthrough: false
// }));

app.listen(port, () => {
    console.log(`The magic happens on port ${port}`)
})