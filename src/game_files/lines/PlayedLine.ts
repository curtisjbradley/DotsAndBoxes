import Line from './Line';
import Players from '../Players';
import Direction from './Direction';

class PlayedLine extends Line {
    private readonly player: Players;

    constructor(x: number, y: number, direction: Direction, player: Players) {
        super(x, y, direction);
        this.player = player;
    }
    public getPlayer(): Players {
        return this.player;
    }
}

export default PlayedLine;
