import {useParams} from "react-router";

export function Game() {
    const {gameId} = useParams()
    return <p>Game {gameId}</p>
}