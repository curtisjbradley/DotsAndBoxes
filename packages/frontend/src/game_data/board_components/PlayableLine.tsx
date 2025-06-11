import { useId } from 'react';
import {
    Directions,
    type ILine,
} from 'dots_and_boxes_backend/src/shared/SerializedGame.ts';

interface IPlayableLine {
    x: number;
    y: number;
    cell_dim: number;
    line_width: number;
    direction: string;
    handlePlaceLine: (line: ILine) => void;
}

export function PlayableLine(props: IPlayableLine) {
    if (props.direction === Directions.DOWN) {
        return (
            <rect
                fill={'yellow'}
                key={useId()}
                x={props.x * props.cell_dim + props.line_width / 2}
                y={props.y * props.cell_dim + props.line_width}
                width={props.line_width}
                height={props.cell_dim}
                onClick={() =>
                    props.handlePlaceLine({
                        x: props.x,
                        y: props.y,
                        direction: props.direction,
                    })
                }
            />
        );
    } else {
        return (
            <rect
                fill={'yellow'}
                key={useId()}
                x={props.x * props.cell_dim + props.line_width}
                y={props.y * props.cell_dim + props.line_width / 2}
                width={props.cell_dim}
                height={props.line_width}
                onClick={() =>
                    props.handlePlaceLine({
                        x: props.x,
                        y: props.y,
                        direction: props.direction,
                    })
                }
            />
        );
    }
}
