const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');

app.use(bodyParser.json());

mongoose.Promise = global.Promise

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017');
process.on('SIGINT', () => {
    mongoose.connection.close( () => {
        console.log("Mongo default connection terminated")
        process.exit(0);
    })
})


app.use(require('./app/routes/routes'));
app.use('./public', express.static(path.join(__dirname, 'public'), {
    fallthrough: false
}));

app.listen(port, () => {
    console.log(`The magic happens on port ${port}`)
})