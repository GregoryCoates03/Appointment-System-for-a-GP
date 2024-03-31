//https://medium.com/@eslmzadpc13/how-to-connect-a-postgres-database-to-express-a-step-by-step-guide-b2fffeb8aeac

const { Pool } = require('pg');
require('dotenv').config({ path: './src/secret.env'});
const fs = require('fs');

process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';

const pool = new Pool({
    connectionString: process.env.DB_CONNECTION,
    ssl: {
        rejectUnauthorized: false,
        ca: fs.readFileSync(process.env.CA_CERT)
    }
});

module.exports = pool;