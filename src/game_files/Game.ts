import Board from "./Board";
import Players from "./Players";

class Game {
    private board: Board;
    private player : Players;

    constructor();
    constructor(board?: Board) {
        this.board = board ?? new Board(5,5);
        this.player = Players.PLAYER1
    }

    public getBoard() : Board {
        return this.board;
    }

    public setBoard(board: Board) : void {
        this.board = board;
    }

    public getCurrentPlayer() : Players {
        return this.player;
    }
    public setCurrentPlayer(player : Players) : void {
        this.player = player;
    }
}

export default Game;