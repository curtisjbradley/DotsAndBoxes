import type {IGameData} from "dots_and_boxes_backend/src/shared/SerializedGame.ts"
import {Link} from "react-router";

interface IGameList {
    games: IGameData[] | null
}
export function GameList(props: IGameList) {
    if (!props.games || props.games.length === 0) {
        return <p>No games found.</p>;
    }
    return Object.values(props.games).map(game => {
        return <Link to={`/game/${game._id}`}>{game.player1} vs {game.player2}</Link>
    })
}