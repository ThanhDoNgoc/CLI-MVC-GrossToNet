require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const grossToNet = require('./routes/grosstonet.route');

// Config the database
const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : process.env.DB_HOST,
      port : process.env.DB_PORT,
      user : process.env.DB_USER,
      password : process.env.DB_PASSWORD,
      database : process.env.DB_DATABASE
    }
  });

// Connect to the database

knex.schema.createTableIfNotExists('history', (table) => {
    table.increments('id').primary();
    table.bigint('gross').notNullable();
    table.integer('dependent').notNullable();
    table.integer('area').notNullable();
    table.bigint('net').notNullable();
}).then(() => {
    console.log("Created database");
})

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/', grossToNet);

let port = process.env.PORT;

app.set("view engine","ejs");
app.set("views","./views");

app.use("/public",express.static('public'));

//app.get('/', gross);

app.listen(port, () => {
    console.log(`App running on: http://localhost:${port}`);
});
