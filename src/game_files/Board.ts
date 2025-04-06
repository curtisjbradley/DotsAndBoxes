import PlayedLine from "./lines/PlayedLine";
import Line from "./lines/Line";
import Direction from "./lines/Direction";
import Players from "./Players";
import {Box} from "./lines/Box";

class Board {
    private readonly x_size: number;
    private readonly y_size: number;
    private readonly moves: Array<PlayedLine> = new Array<PlayedLine>();
    private readonly boxes: Array<Box> = new Array<Box>();

    constructor(x_size : number, y_size : number) {
        this.x_size = x_size;
        this.y_size = y_size;
        this.boxes.push(new Box(1,1, Players.PLAYER1));
        this.moves.push(new PlayedLine(1,1,Direction.DOWN, Players.PLAYER1));
        this.moves.push(new PlayedLine(2,4,Direction.RIGHT, Players.PLAYER2));

    }

    public getYSize(): number {
        return this.y_size;
    }
    public getXSize(): number {
        return this.x_size;
    }

    public getMoves(): Array<PlayedLine> {
        return this.moves;
    }

    public getBoxes() : Array<Box> {
        return this.boxes;
    }

    public getValidMoves(): Array<Line> {
        let validMoves: Array<Line> = new Array<Line>();
        for (let i = 0; i < this.x_size - 1; i++) {
            for (let j = 0; j < this.y_size; j++) {
                validMoves.push(new Line(i,j, Direction.RIGHT));
            }
        }

        for (let i = 0; i < this.x_size; i++) {
            for (let j = 0; j < this.y_size - 1; j++) {
                validMoves.push(new Line(i,j, Direction.DOWN));
            }
        }
        for (const playedMove of this.moves) {
            for (let j = 0; j < validMoves.length; j++) {
                if (validMoves[j].getX() === playedMove.getX() && validMoves[j].getY() === playedMove.getY() && validMoves[j].getDirection() === playedMove.getDirection()){
                    validMoves.splice(j,1);
                }
            }
        }
        return validMoves;
    }
    public checkIfLineMakesBox(line : Line) : boolean {
        return false
    }
}
export default Board;