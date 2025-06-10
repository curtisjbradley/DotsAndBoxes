// @ts-ignore
import './css/App.css';
// @ts-ignore
import './css/game.css';
import Game from './game_files/Game.js';
import {useEffect, useState} from 'react';
import Board from './game_files/Board';
import Direction from './game_files/lines/Direction';
import PlayedLine from './game_files/lines/PlayedLine';
import Line from './game_files/lines/Line';
import { Box } from './game_files/lines/Box';
import Players from './game_files/Players';

const GameWindow = ({ game }: { game: Game }) => {

    const board: Board = game.getBoard();
    let points = [];
    for (let i = 0; i < board.getXSize(); i++) {
        for (let j = 0; j < board.getYSize(); j++) points.push({ x: i, y: j });
    }
    const cellDim = 1000 / Math.max(game.getBoard().getXSize(), game.getBoard().getYSize());
    const radius = 5;

    const [dots, setDots] = useState([]);
    const [lines, setLines] = useState([]);
    const [moves, setMoves] = useState([]);
    const [boxes, setBoxes] = useState([]);

    const playLine = (line: Line): void => {
        const giveExtraMove = game.getBoard().checkIfLineMakesBox(line);
        game.getBoard().playLine(
            new PlayedLine(
                line.getX(),
                line.getY(),
                line.getDirection(),
                game.getCurrentPlayer()
            )
        );
        if (!giveExtraMove) {
            game.setCurrentPlayer(
                game.getCurrentPlayer() === Players.PLAYER1
                    ? Players.PLAYER2
                    : Players.PLAYER1
            );
        }
        updateBoardState();
    };

    const updateBoardState = () => {


        setDots(
            points.map((point) => (
                <circle
                    key={point.x + '-' + point.y}
                    cx={point.x * cellDim + radius}
                    cy={point.y * cellDim + radius}
                    r={radius}
                    className="dot"
                />
            ))
        );

        setLines(
            board
                .getMoves()
                .map((line: PlayedLine) => (
                    <rect
                        key={
                            line.getX() +
                            '-' +
                            line.getY() +
                            '-' +
                            line.getDirection()
                        }
                        x={line.getX() * cellDim}
                        y={line.getY() * cellDim}
                        width={
                            line.getDirection() === Direction.DOWN
                                ? 2 * radius
                                : cellDim + 2 * radius
                        }
                        height={
                            line.getDirection() === Direction.RIGHT
                                ? 2 * radius
                                : cellDim + 2 * radius
                        }
                        rx={radius}
                        ry={radius}
                        className={'player' + (line.getPlayer() + 1) + 'Line'}
                        tabIndex={0}
                        aria-label={`Played Line at (${line.getX()},${line.getY()}) by ${line.getPlayer()} in direction ${line.getDirection().toString()}`}
                    />
                ))
        );

        setMoves(
            board
                .getValidMoves()
                .map((move: Line) => (
                    <rect
                        key={
                            move.getX() +
                            '-' +
                            move.getY() +
                            '-' +
                            move.getDirection()
                        }
                        x={move.getX() * cellDim}
                        y={move.getY() * cellDim}
                        width={
                            move.getDirection() === Direction.DOWN
                                ? 2 * radius
                                : cellDim + 2 * radius
                        }
                        height={
                            move.getDirection() === Direction.RIGHT
                                ? 2 * radius
                                : cellDim + 2 * radius
                        }
                        rx={radius}
                        ry={radius}
                        onClickCapture={() => playLine(move)}
                        tabIndex={0}

                        aria-label={`Playable Move at (${move.getX()},${move.getY()}) in direction ${move.getDirection().toString()}`}
                        className="playableMove"
                    />
                ))
        );

        setBoxes([
            board
                .getBoxes()
                .map((box: Box) => (
                    <rect
                        key={box.getX() + '-' + box.getY() + 'BOX!'}
                        x={box.getX() * cellDim + 2 * radius}
                        y={box.getY() * cellDim + 2 * radius}
                        width={cellDim - 2 * radius}
                        height={cellDim - 2 * radius}
                        className={'player' + (box.getPlayer() + 1) + 'Box'}
                    />
                )),
        ]);
    };

    useEffect(() => {
        updateBoardState();
    }, [board, setBoxes, setLines, setDots, setMoves]);

    return (
        <svg height={"100vh"} width={"auto"} viewBox={`0 0 ${cellDim * game.getBoard().getXSize()} ${cellDim * game.getBoard().getYSize()}`}>
            <svg className="game" height={1000} width={1000} tabIndex={0} aria-label={`Dots and Boxes Game ${game.getBoard().getXSize()} by ${game.getBoard().getYSize()}`}>
                {boxes} {moves}
                {lines}
                {dots}
            </svg>
        </svg>

    );
};

export default GameWindow;
