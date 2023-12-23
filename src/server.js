const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const pool = require('./db');

const app = express();

const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app, pool);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

module.exports = app;