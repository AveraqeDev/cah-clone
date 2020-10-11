const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const { NODE_ENV } = require('./config');

const errorHandler = require('./middleware/error-handler');
const { successResponse } = require('./util/responses');

// Create express app
const app = express();

// Setup morgan option based on environment
const morganOption = (NODE_ENV === 'production')
    ? 'tiny'
    : 'common';

// CORS middleware for allowing cross origin
app.use(cors());
// Morgan middleware for logging information
app.use(morgan(morganOption));
// Helmet middleware for hiding server type
app.use(helmet({
    contentSecurityPolicy: false,
}));

app.use('/', express.static(path.join(__dirname, '../client/build')))

app.get('/api/v1', (req, res, next) => {
    return successResponse(res, "Hello World!")
});

app.get('/api/v1/error', (req, res, next) => {
    let num = 1;
    try {
        num.toPrecision(500);
        res.send(num);
    } catch (e) {
        next(e);
    }
})

// Error handling middleware
app.use(errorHandler);

module.exports = app;