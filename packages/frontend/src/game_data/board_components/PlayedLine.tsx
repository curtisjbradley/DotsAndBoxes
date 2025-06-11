import {useId} from "react";
import {Directions} from "dots_and_boxes_backend/src/shared/SerializedGame.ts";

interface IPlayedLine {
    x: number;
    y: number;
    player: string;
    cell_dim: number;
    line_width: number;
    direction: string;
}

export function PlayedLine(props: IPlayedLine) {
    if (props.direction === Directions.DOWN) {
        return (<rect key={useId()} x={props.x * props.cell_dim + props.line_width / 2} y={props.y * props.cell_dim + props.line_width}
                      width={props.line_width}
                      height={props.cell_dim}
        />)
    } else {
        return (<rect key={useId()} x={props.x * props.cell_dim + props.line_width} y={props.y * props.cell_dim + props.line_width / 2}
                      width={props.cell_dim}
                      height={props.line_width}
        />)
    }
}