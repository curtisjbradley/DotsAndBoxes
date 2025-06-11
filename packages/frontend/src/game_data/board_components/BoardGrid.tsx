import {useId} from "react";
import type {IMove} from "dots_and_boxes_backend/src/shared/SerializedGame.ts";
import {PlayedLine} from "./PlayedLine.tsx";

interface IPointGrid {
    x_num: number;
    y_num: number;
    cell_dim: number;
    circle_radius: number;
}

interface ILineGrid {
    cell_dim: number;
    line_width: number;
    moves: IMove[]
}

interface Point {
    x: number
    y: number;
}
export function PointGrid(props: IPointGrid) : React.ReactNode[] {
    const points: Point[] = [];
    for (let i = 0; i < props.x_num; i++) {
        for (let j = 0; j < props.y_num; j++) {
            points.push({x: i, y: j});
        }
    }

    return (
            points.map((point, _) => (
                <circle key={useId()} r={props.circle_radius} cx={point.x * props.cell_dim + props.circle_radius} cy={point.y * props.cell_dim + props.circle_radius} />
            ))
    )
}


export function LineGrid(props: ILineGrid) : React.ReactNode[] {

    return (
        props.moves.map((move, _) => {
            return move.lines.map(playedLine =>
                <PlayedLine key={useId()} x={playedLine.x} y={playedLine.y} player={move.player} cell_dim={props.cell_dim} line_width={props.line_width} direction={playedLine.direction} />
            )
        })
    )
}
