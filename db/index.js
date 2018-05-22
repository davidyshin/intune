const pgp = require("pg-promise")({});
const dotenv = require('dotenv')

dotenv.load();
var connectionString = process.env.DATABASE_URL
var db = pgp(connectionString);

module.exports = db;