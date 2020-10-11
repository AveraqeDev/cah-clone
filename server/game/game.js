const GameState = require('./game-state');
const Round = require('./round');
const blackCards = require('./black-cards.json');
const { LOBBY } = require('./game-state');

class Game {

    constructor(id, owner) {
        this.id = id;
        this.state = GameState.LOBBY
        this.players = [owner];
        this.round = null;
        this.roundCount = 0;
        this.czarIndex = 0;
        this.targetScore = 5;
        this.blackCardsUsed = [];
        this.winner = null;
    }

    /**
     * Starts a new round
     */
    startNewRound() {
        if(this.state === GameState.LOBBY) {
            this.state = GameState.IN_GAME;
        }
        if(this.czarIndex > this.players.length) {
            this.czarIndex = 0;
        }
        this.round = new Round(this.getBlackCard(), this.players[this.czarIndex], this);
        this.roundCount += 1;
        this.czarIndex += 1;
    }

    update() {
        for(const player in this.players) {
            player.socket.emit('gameUpdate', {
                players,
                roundCount,
                time: this.round.time || 0,
                state: this.state,
                roundState: this.round.state,
                blackCard: this.round.blackCard,
                czar: this.round.czar || null,
                skips: this.round.skips || 0,
                picked: this.round.playerPicks || []
            })
        }
    }

    roundEnded(winner) {
        if(winner) {
            winner.updateScore(1);
        }
        for(const player in this.players) {
            player.socket.emit('roundEnd', { winner })
            if(player.getScore() >= this.targetScore) {
                this.endGame();
            }
        }
        this.startNewRound()
    }

    endGame() {
        this.state = GameState.END_GAME;
        console.log(`[CAH-Server] Game ${this.id} ended`);
        for(const player in this.players) {
            player.game = null;
            player.socket.emit('gameEnd', {winner: this.winner})
        }
    }

    getBlackCard() {
        card = blackCards[Math.floor(Math.random() * blackCards.length)];
        while(this.blackCardsUsed.includes(card)) {
            card = blackCards[Math.floor(Math.random() * blackCards.length)];
        }
        this.blackCardsUsed.push(card);
        return card;
    }

    addPlayer(player) {
        this.players.push(player);
        if(this.state === LOBBY && this.players.length >= 3) {
            this.startNewRound()
        }
    } 

    getRound() {
        return this.round;
    }
}

module.exports = Game;