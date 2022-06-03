require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const grossToNet = require('./routes/grosstonet.route');

// Config the database
const dbConfig = process.env.MONGO_URL + process.env.MONGO_DB;
const mongoose = require('mongoose');

// Connect to the database
mongoose.set('useCreateIndex', true);
mongoose.connect(dbConfig, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/', grossToNet);

let port = process.env.PORT;

app.set("view engine","ejs");
app.set("views","./views");

app.use("/public",express.static('public'));

app.listen(port, () => {
    console.log(`App running on: http://localhost:${port}`);
});
