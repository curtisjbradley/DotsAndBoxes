import type {IMove, ISerializedBoard} from "dots_and_boxes_backend/src/shared/SerializedGame.ts";



class GameBoard {
    readonly x_size: number;
    readonly y_size: number;
    readonly moves: IMove[] = []

    constructor(x_size: number, y_size: number, moves? : Array<IMove>) {
        this.x_size = x_size;
        this.y_size = y_size;
        this.moves = moves ?? [];
    }

    static deserialize(data : ISerializedBoard): GameBoard {
        return new GameBoard(data.size.x,data.size.y, data.moves);
    }

}

export default GameBoard;
