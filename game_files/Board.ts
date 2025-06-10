import PlayedLine from './lines/PlayedLine';
import Line from './lines/Line';
import Direction from './lines/Direction';
import { Box } from './lines/Box';

class Board {
    private readonly x_size: number;
    private readonly y_size: number;
    private readonly moves: Array<PlayedLine> = new Array<PlayedLine>();
    private readonly boxes: Array<Box> = new Array<Box>();

    constructor(x_size: number, y_size: number) {
        this.x_size = x_size;
        this.y_size = y_size;
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
    public playLine(line: PlayedLine): void {
        const createdBoxes = this.getNewBoxes(line);
        this.moves.push(line);
        if (createdBoxes !== null) {
            for (const box of createdBoxes) {
                this.boxes.push(new Box(box.x, box.y, line.getPlayer()));
            }
        }
    }
    public getBoxes(): Array<Box> {
        return this.boxes;
    }
    indexOfLineInList(list: Array<Line>, line: Line): number {
        for (let i = 0; i < list.length; i++) {
            if (
                list[i].getX() === line.getX() &&
                list[i].getY() === line.getY() &&
                list[i].getDirection() === line.getDirection()
            ) {
                return i;
            }
        }
        return -1;
    }
    public getValidMoves(): Array<Line> {
        let validMoves: Array<Line> = new Array<Line>();
        for (let i = 0; i < this.x_size - 1; i++) {
            for (let j = 0; j < this.y_size; j++) {
                validMoves.push(new Line(i, j, Direction.RIGHT));
            }
        }

        for (let i = 0; i < this.x_size; i++) {
            for (let j = 0; j < this.y_size - 1; j++) {
                validMoves.push(new Line(i, j, Direction.DOWN));
            }
        }
        for (const playedMove of this.moves) {
            let index = this.indexOfLineInList(validMoves, playedMove);
            if (index > -1) {
                validMoves.splice(index, 1);
            }
        }
        return validMoves;
    }

    getNewBoxes(line: Line): Array<Point> {
        // If a line is placed, wh
        //Had to draw a picture for this.
        let out: Array<Point> = [];
        if (line.getDirection() == Direction.RIGHT) {
            if (line.getX() + 1 < this.getXSize() && line.getY() > 0) {
                // Completes bottom of box
                if (
                    this.indexOfLineInList(
                        this.moves,
                        new Line(line.getX(), line.getY() - 1, Direction.RIGHT)
                    ) != -1 &&
                    this.indexOfLineInList(
                        this.moves,
                        new Line(line.getX(), line.getY() - 1, Direction.DOWN)
                    ) != -1 &&
                    this.indexOfLineInList(
                        this.moves,
                        new Line(
                            line.getX() + 1,
                            line.getY() - 1,
                            Direction.DOWN
                        )
                    ) != -1
                ) {
                    out.push({ x: line.getX(), y: line.getY() - 1 });
                }
            }
            if (
                line.getX() + 1 < this.getXSize() &&
                line.getY() + 1 < this.getYSize()
            ) {
                // Completes top of box
                if (
                    this.indexOfLineInList(
                        this.moves,
                        new Line(line.getX() + 1, line.getY(), Direction.DOWN)
                    ) != -1 &&
                    this.indexOfLineInList(
                        this.moves,
                        new Line(line.getX(), line.getY(), Direction.DOWN)
                    ) != -1 &&
                    this.indexOfLineInList(
                        this.moves,
                        new Line(line.getX(), line.getY() + 1, Direction.RIGHT)
                    ) != -1
                ) {
                    out.push({ x: line.getX(), y: line.getY() });
                }
            }
        } else if (line.getDirection() == Direction.DOWN) {
            if (
                line.getX() + 1 < this.getXSize() &&
                line.getY() + 1 < this.getYSize()
            ) {
                // Completes left of box
                if (
                    this.indexOfLineInList(
                        this.moves,
                        new Line(line.getX(), line.getY(), Direction.RIGHT)
                    ) != -1 &&
                    this.indexOfLineInList(
                        this.moves,
                        new Line(line.getX() + 1, line.getY(), Direction.DOWN)
                    ) != -1 &&
                    this.indexOfLineInList(
                        this.moves,
                        new Line(line.getX(), line.getY() + 1, Direction.RIGHT)
                    ) != -1
                ) {
                    out.push({ x: line.getX(), y: line.getY() });
                }
            }
            if (line.getX() > 0 && line.getY() + 1 < this.getYSize()) {
                // Completes right of box
                if (
                    this.indexOfLineInList(
                        this.moves,
                        new Line(line.getX() - 1, line.getY(), Direction.DOWN)
                    ) != -1 &&
                    this.indexOfLineInList(
                        this.moves,
                        new Line(line.getX() - 1, line.getY(), Direction.RIGHT)
                    ) != -1 &&
                    this.indexOfLineInList(
                        this.moves,
                        new Line(
                            line.getX() - 1,
                            line.getY() + 1,
                            Direction.RIGHT
                        )
                    ) != -1
                ) {
                    out.push({ x: line.getX() - 1, y: line.getY() });
                }
            }
        }
        return out;
    }

    public checkIfLineMakesBox(line: Line): boolean {
        return this.getNewBoxes(line).length > 0;
    }
}
interface Point {
    x: number;
    y: number;
}
export default Board;
