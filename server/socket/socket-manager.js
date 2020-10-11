

module.exports = socket => {
    console.log(chalk.greenBright(
        chalk.yellow('[CAH-Server]'),
        'Socket.IO listening...'
    ));

    // Handles when a user Connects
    socket.on('userConnect', userId, gameId => {
        // Add user to connectedSockets Object
        connectedSockets[userId] = socket.id;

        // send userConnect event to all connected sockets
        socket.broadcast.emit('userConnect', userId);
    });
}