const chalk = require('chalk');
const { NODE_ENV } = require('../config');
const { errorResponse } = require('../util/responses');

// Middleware for handling errors
module.exports = (error, req, res, next) => {
    const message = (NODE_ENV === 'production')
        ? "Server Error"
        : (console.error(chalk.red('[CAH-Server] - Error\n'), error), error.message);

    return errorResponse(res, message, 500)
};