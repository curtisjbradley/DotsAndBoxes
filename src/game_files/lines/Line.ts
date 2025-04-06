import Direction from "./Direction";

class Line {
    private readonly x: number; // x of top left most dot
    private readonly y: number; // y of top left most dot
    private readonly direction: Direction;

    constructor(x: number, y: number, direction: Direction) {
        this.x = x;
        this.y = y;
        this.direction = direction;
    }

public getX() : number {
    return this.x;
}

public getY(): number {
    return this.y;
}

public getDirection() : Direction {
    return this.direction;
}



public toString(): string {
    return "Line{" +
        "x=" + this.x +
        ", y=" + this.y +
        ", direction=" + this.direction +
        '}';
}


}
export default Line;