import './App.css'
import '../src/css/game.css'
import Game from "./game_files/Game.js";
// @ts-ignore
import React, {useEffect, useRef} from "react";
import Board from "./game_files/Board";
import Direction from "./game_files/lines/Direction";
import PlayedLine from "./game_files/lines/PlayedLine";
import Line from "./game_files/lines/Line";
import {Box} from "./game_files/lines/Box";
import Players from "./game_files/Players";


const  GameWindow =  ({ game }: { game: Game }) => {
    const ref = useRef(null);


    const board: Board = game.getBoard();
    let points = []
    for (let i = 0; i < board.getXSize(); i++) {
        for (let j = 0; j < board.getYSize(); j++)
            points.push({x: i, y: j});
    }


    const [dots, setDots] = React.useState([])
    const [lines, setLines] = React.useState([])
    const [moves, setMoves] = React.useState([])
    const [boxes, setBoxes] = React.useState([])


    const playLine = (line: Line) : void => {
        const giveExtraMove = game.getBoard().checkIfLineMakesBox(line);
        game.getBoard().getMoves().push(new PlayedLine(line.getX(),line.getY(),line.getDirection(), game.getCurrentPlayer()))
        if(!giveExtraMove){
            game.setCurrentPlayer(game.getCurrentPlayer() === Players.PLAYER1 ? Players.PLAYER2 : Players.PLAYER1);
        }
        updateBoardState()
    }

    const updateBoardState = () => {
        const cellDim = Math.min(
            ref.current.height.baseVal.value,
            ref.current.width.baseVal.value
        ) / Math.max(board.getXSize(), board.getYSize()) - 1;

        const radius = 5;

        setDots(
            points.map((point) => (
                <circle
                    key={point.x + "-" + point.y}
                    cx={point.x * cellDim + radius}
                    cy={point.y * cellDim + radius}
                    r={radius}
                    className="dot"
                />
            ))
        );

        setLines(
            board.getMoves().map((line: PlayedLine) => (
                <rect
                    key={line.getX() + "-" + line.getY() + "-" + line.getDirection()}
                    x={line.getX() * cellDim}
                    y={line.getY() * cellDim}
                    width={line.getDirection() === Direction.DOWN ? 2 * radius : cellDim + 2 * radius}
                    height={line.getDirection() === Direction.RIGHT ? 2 * radius : cellDim + 2 * radius}
                    rx={radius}
                    ry={radius}
                    className={"player" + (line.getPlayer() + 1) + "Line"}
                />
            ))
        );

        setMoves(
            board.getValidMoves().map((move: Line) => (
                <rect
                    key={move.getX() + "-" + move.getY() + "-" + move.getDirection()}
                    x={move.getX() * cellDim}
                    y={move.getY() * cellDim}
                    width={move.getDirection() === Direction.DOWN ? 2 * radius : cellDim + 2 * radius}
                    height={move.getDirection() === Direction.RIGHT ? 2 * radius : cellDim + 2 * radius}
                    rx={radius}
                    ry={radius}
                    onClickCapture={() => playLine(move)}
                    className="playableMove"
                />
            ))
        );

        setBoxes([
            board.getBoxes().map((box : Box)=>
                <rect
                    key={box.getX() + "-" + box.getY() + "BOX!"}
                    x={box.getX() * cellDim + 2 * radius}
                    y={box.getY() * cellDim + 2 * radius}
                    width={cellDim - 2 * radius}
                    height={cellDim - 2 * radius}
                    className={"player" + (box.getPlayer() + 1) + "Box"}
                />
            )
        ]);
    };

    useEffect(() => {
        updateBoardState();
    }, [board, setBoxes, setLines, setDots, setMoves]);


    return <svg ref={ref}>{boxes} {moves}{lines}{dots}</svg>
}


export default GameWindow
