const pg = require('pg');
require('dotenv').config();

const conString = process.env.DBCONNECT || "postgres://paijcngn:f535dFJgYdvZDnqYDQdgZMQmk5seEMNr@snuffleupagus.db.elephantsql.com/paijcngn";//Can be found in the Details page
const client = new pg.Client(conString);
client.connect();
module.exports = client;