//https://medium.com/@eslmzadpc13/how-to-connect-a-postgres-database-to-express-a-step-by-step-guide-b2fffeb8aeac

const { Pool } = require('pg');
require('dotenv').config({ path: './src/secret.env'});
const fs = require('fs');

//console.log(process.env)
//process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

module.exports = pool;