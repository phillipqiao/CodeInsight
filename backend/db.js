const Pool = require("pg").Pool;

var parse = require('pg-connection-string').parse;

// Load enviroment variables
require('dotenv').config(); 

var config = parse(process.env.DATABASE_URL)

const pool = new Pool(config)

module.exports = pool;

//pool is the database, learn how to query the database from pool