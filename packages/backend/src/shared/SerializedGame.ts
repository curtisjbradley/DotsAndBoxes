export const Directions = {
    DOWN: "DOWN",
    RIGHT: "RIGHT",
}
export interface IGameData {
    _id: string;
    board: ISerializedBoard;
    player1: string;
    player2: string;
    startedAt: Date;
    currentMove: string;
}

export interface ISerializedBoard {
    size: {
        x: number;
        y: number;
    },
    moves: IMove[]
}
export interface IMove {
    player: string,
    lines: ILine[]
    playedAt: Date
}


export interface ILine {
    x: number;
    y: number;
    direction: string;
}