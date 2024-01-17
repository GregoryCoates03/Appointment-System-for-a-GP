const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const pool = require('./db');
const task = require('./cronJobs');

// https://www.npmjs.com/package/helmet
const helmet = require('helmet');
const cors = require('cors');

const app = express();

app.use(helmet());
app.use(cors());

const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app, pool);

task.start();

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

module.exports = app;