import Game from './Game.ts';
import { PointGrid } from './board_components/BoardGrid.tsx';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext.tsx';
import { PlayedGrid } from './board_components/PlayedGrid.tsx';
import { PlayableGrid } from './board_components/PlayableGrid.tsx';
import type { ILine } from 'dots_and_boxes_backend/src/shared/SerializedGame.ts';

interface IDotsAndBoxesProps {
    game: Game;
    handlePlaceLine: (line: ILine) => void;
}

//Creates a 1000 x ___ svg to represent the game state
export function DotsAndBoxes(props: IDotsAndBoxesProps) {
    const game = props.game;
    const userData = useContext(UserContext);

    const cellDim =
        1000 / Math.max(game.getBoard().x_size, game.getBoard().y_size);
    const dotRadius = cellDim * 0.05;
    const lineWidth = dotRadius;
    return (
        <svg
            width={`${cellDim * (game.getBoard().x_size - 1) + 2 * dotRadius}`}
            height={cellDim * (game.getBoard().y_size - 1) + 2 * dotRadius}
        >
            <PlayedGrid
                cell_dim={cellDim}
                line_width={lineWidth}
                moves={game.getBoard().moves}
            />
            {userData.userData?.userName === game.currentPlayer && (
                <PlayableGrid
                    handlePlaceLine={props.handlePlaceLine}
                    cell_dim={cellDim}
                    line_width={lineWidth}
                    playable_moves={game.getBoard().getValidMoves()}
                />
            )}
            <PointGrid
                circle_radius={dotRadius}
                cell_dim={cellDim}
                x_num={game.getBoard().x_size}
                y_num={game.getBoard().y_size}
            />
        </svg>
    );
}
