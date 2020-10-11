const RoundState = require('./round-state');

class Round {

    /**
     * Initialize a new round
     * @param {Player} czar 
     * @param {Game} game 
     */
    constructor(blackCard, czar, game) {
        this.state = RoundState.PICKING;
        this.blackCard = blackCard;
        this.czar = czar;
        this.cards = [];
        this.playersSkipped = [];
        this.playerPicks = [];
        this.skips = 0;
        this.time = 75;
        this.game = game;
       
        this.startRoundLoop()
    }

    /**
     * Returns true if round skipped threshold met
     * @param {Player} player 
     * @returns {Boolean}
     */
    skip(player) {
        if(!this.playersSkipped.includes(player)) {
            this.playersSkipped.push(player);
            this.skips += 1;

            if(this.skips >= this.game.players.length - 2) {
                return true;
            }
        }
        return false;
    }

    /**
     * Starts the round game loop
     */
    startRoundLoop() {
        const hrtimeMs = () => {
            let time = process.hrtime();
            return time[0] * 1000 + time[1] / 1000000;
        }

        let previous = hrtimeMs();

        const loop = () => {
            const timeout = setTimeout(loop, 1000);
            let now = hrtimeMs();
            let delta = (now - previous) / 1000;
            console.log('delta', delta);
            this.game.update()
            if(this.game.players.length <= 2) {
                clearTimeout(timeout);
                this.game.endGame(null, "Not enough players");
            }
            if(this.time <= 0) {
                clearTimeout(timeout);
                switch (this.state) {
                    case RoundState.PICKING:
                        this.state = RoundState.VOTING;
                        this.time = 75;
                        this.startRoundLoop()
                    case RoundState.VOTING:
                        this.endRound(null, "Time up")
                    default:
                        this.endRound(null, "Time up")
                }
            } else {
                if(this.state == RoundState.PICKING && this.playerPicks.length === this.game.players.length - 1) {
                    clearTimeout(timeout);
                    this.state = RoundState.VOTING;
                    this.time = 75;
                    this.startRoundLoop()
                }
            }
            previous = now;
            this.time--;
        }
    }

    /**
     * Ends a round
     * @param {Player} winner 
     * @param {String} msg 
     */
    endRound(winner, msg) {
        this.game.roundEnded(winner, msg)
    }

    /**
     * Handles when a player leaves lobby
     * @param {Player} player 
     */
    playerLeft(player) {
        if(player == this.czar) {
            this.endRound(null, 'Czar left game');
        }

        if(this.playerPicks.includes(player)) {
            this.playerPicks = this.playerPicks.filter(item => {
                return item != player
            })
        }

        if(this.playerSkipped.includes(player)) {
            this.playerSkipped = this.playerSkipped.filter(item => {
                return item != player
            })
        }``
    }
    
    /**
     * Process when a player plays a card
     * @param {Player} player 
     * @param {Card} card 
     */
    pick(player, card) {
        if(!this.playerPicks.find(o => o.player === player)) {
            this.playerPicks.push({player, card});
        }
    }
}

module.exports = Round;
