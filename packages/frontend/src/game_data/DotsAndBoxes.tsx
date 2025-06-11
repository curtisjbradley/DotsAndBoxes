
import Game from './Game.ts';
import {LineGrid, PointGrid} from "./board_components/BoardGrid.tsx";


interface IDotsAndBoxesProps {
    game : Game;
}

    //Creates a 1000 x ___ svg to represent the game state
export function DotsAndBoxes (props : IDotsAndBoxesProps) {
    const game = props.game;

    const cellDim = 1000 / Math.max(game.getBoard().x_size, game.getBoard().y_size);
    const dotRadius = cellDim * 0.05
    return (<svg width={`${cellDim * (game.getBoard().x_size - 1) + 2 * dotRadius}`} height={cellDim * (game.getBoard().y_size - 1) + 2 * dotRadius}>
        <PointGrid circle_radius={dotRadius} cell_dim={cellDim} x_num={game.getBoard().x_size} y_num={game.getBoard().y_size} />
        <LineGrid cell_dim={cellDim} line_width={dotRadius} moves={game.getBoard().moves} />
    </svg>)
}

