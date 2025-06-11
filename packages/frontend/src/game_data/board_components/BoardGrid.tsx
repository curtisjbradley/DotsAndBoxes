import { useId } from 'react';

interface IPointGrid {
    x_num: number;
    y_num: number;
    cell_dim: number;
    circle_radius: number;
}

interface Point {
    x: number;
    y: number;
}
export function PointGrid(props: IPointGrid): React.ReactNode[] {
    const points: Point[] = [];
    for (let i = 0; i < props.x_num; i++) {
        for (let j = 0; j < props.y_num; j++) {
            points.push({ x: i, y: j });
        }
    }

    return points.map((point, _) => (
        <circle
            key={useId()}
            r={props.circle_radius}
            cx={point.x * props.cell_dim + props.circle_radius}
            cy={point.y * props.cell_dim + props.circle_radius}
        />
    ));
}
