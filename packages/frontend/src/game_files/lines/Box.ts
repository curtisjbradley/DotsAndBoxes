import Players from '../Players';

export class Box {
    private readonly x: number;
    private readonly y: number;
    private readonly player: Players;

    constructor(x: number, y: number, player: Players) {
        this.x = x;
        this.y = y;
        this.player = player;
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public getPlayer(): Players {
        return this.player;
    }
}
