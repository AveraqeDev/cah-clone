const shortid = require('shortid');
const Game = require('./Game');

const activeGames = [];

const startNewGame = (owner) => {
    const game = new Game(shortid.generate(), owner);
    activeGames.push(game);
}

const joinGame = (player, id) => {
    const game = activeGames.find(game => game.id === id);
    if(!game) {
        player.socket.emit('noGame', { id });
    } else {
        game.addPlayer(player);
    }
}

module.exports = {
    activeGames,
    startNewGame
}