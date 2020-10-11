require('dotenv').config();

// Chalk for displaying colors in console
const chalk = require('chalk');

// Main express app
const app = require('./app');
// HTTP server from Express app
const server = require('http').createServer(app);
// Socket.IO attached to server
const io = require('socket.io').listen(server, {
    // Custom Cores middleware for Socket.IO
    handlePreflightRequest: (req, res) => {
        const headers = {
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Allow-Origin': req.headers.origin,
            'Access-Control-Allow-Credentials': true
        };
        res.writeHead(200, headers);
        res.end();
    }
});

// Socket.IO event handlers
const SocketManager = require('./socket/socket-manager');

const { PORT, NODE_ENV } = require('./config');

// Setup Socket.IO
io.on('connection', SocketManager);

// Start server on given PORT
server.listen(PORT, () => {
    console.log(chalk.greenBright(
        chalk.yellowBright('[CAH-Server]'),
        'Server running in',
        chalk.cyan.underline.bold(`${NODE_ENV}`),
        'mode on',
        chalk.cyan.underline.bold(`*:${PORT}`)
    ));
});
