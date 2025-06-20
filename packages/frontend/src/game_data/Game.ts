import GameBoard from './GameBoard.ts';
import type { IGameData } from 'dots_and_boxes_backend/src/shared/SerializedGame.ts';

class Game {
    private readonly board: GameBoard;
    player1: string;
    player2: string;
    currentPlayer: string;
    private constructor(
        board: GameBoard,
        player1: string,
        player2: string,
        currentPlayer: string
    ) {
        this.board = board;
        this.player1 = player1;
        this.player2 = player2;
        this.currentPlayer = currentPlayer;
    }

    static deserialize(data: IGameData): Game {
        return new Game(
            GameBoard.deserialize(data.board),
            data.player1,
            data.player2,
            data.currentMove
        );
    }

    public getBoard(): GameBoard {
        return this.board;
    }
}

export default Game;
