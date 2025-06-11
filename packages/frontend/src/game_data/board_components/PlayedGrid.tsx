import { PlayedLine } from './PlayedLine.tsx';
import { useId } from 'react';

import type { IMove } from 'dots_and_boxes_backend/src/shared/SerializedGame.ts';

interface ILineGrid {
    cell_dim: number;
    line_width: number;
    moves: IMove[];
}

export function PlayedGrid(props: ILineGrid): React.ReactNode[] {
    return props.moves.map((move, _) => {
        return move.lines.map((playedLine) => (
            <PlayedLine
                key={useId()}
                x={playedLine.x}
                y={playedLine.y}
                player={move.player}
                cell_dim={props.cell_dim}
                line_width={props.line_width}
                direction={playedLine.direction}
            />
        ));
    });
}
