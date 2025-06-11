import { useId } from 'react';
import type { ILine } from 'dots_and_boxes_backend/src/shared/SerializedGame.ts';
import { PlayableLine } from './PlayableLine.tsx';

interface ILineGrid {
    cell_dim: number;
    line_width: number;
    playable_moves: ILine[];
    handlePlaceLine: (line: ILine) => void;
}

export function PlayableGrid(props: ILineGrid): React.ReactNode[] {
    return props.playable_moves.map((line, _) => {
        return (
            <PlayableLine
                handlePlaceLine={props.handlePlaceLine}
                key={useId()}
                x={line.x}
                y={line.y}
                cell_dim={props.cell_dim}
                line_width={props.line_width}
                direction={line.direction}
            />
        );
    });
}
