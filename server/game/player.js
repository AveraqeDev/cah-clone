
class Player {
    
    constructor(socket, name) {
        this.game = null;
        this.socket = socket;
        this.name = name;
        this.score = score;
        this.cards = []
    }

    setGame(game) {
        this.game = game;
    }

    updateScore(score) {
        this.score += score;
    }

    getSocket() {
        return this.socket;
    }

    getName() {
        return this.name;
    }

    getScore() {
        return this.score;
    }

    getCards() {
        return this.cards;
    }
}

module.exports = Player;