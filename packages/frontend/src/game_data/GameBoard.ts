import type {
    ILine,
    IMove,
    ISerializedBoard,
} from 'dots_and_boxes_backend/src/shared/SerializedGame.ts';

class GameBoard {
    readonly x_size: number;
    readonly y_size: number;
    readonly moves: IMove[] = [];

    constructor(x_size: number, y_size: number, moves?: Array<IMove>) {
        this.x_size = x_size;
        this.y_size = y_size;
        this.moves = moves ?? [];
    }

    static deserialize(data: ISerializedBoard): GameBoard {
        return new GameBoard(data.size.x, data.size.y, data.moves);
    }

    public getValidMoves(): ILine[] {
        let potentialMoves: ILine[] = [];

        for (let i = 0; i < this.x_size; i++) {
            for (let j = 0; j < this.y_size; j++) {
                if (i < this.x_size - 1) {
                    potentialMoves.push({ x: i, y: j, direction: 'RIGHT' });
                }
                if (j < this.y_size - 1) {
                    potentialMoves.push({ x: i, y: j, direction: 'DOWN' });
                }
            }
        }

        return potentialMoves.filter((validLine) => {
            return !this.moves.find((playedMove) => {
                return (
                    playedMove.lines.find((line) => {
                        return (
                            line.x === validLine.x &&
                            line.y === validLine.y &&
                            line.direction === validLine.direction
                        );
                    }) !== undefined
                );
            });
        });
    }
}

export default GameBoard;
