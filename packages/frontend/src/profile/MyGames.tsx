import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext.tsx';
import type { IGameData } from 'dots_and_boxes_backend/src/shared/SerializedGame.ts';
import { BackEndRoutes } from 'dots_and_boxes_backend/src/shared/ValidRoutes.ts';
import { GameList } from './GameList.tsx';

export function MyGames() {
    const userContext = useContext(UserContext);
    const [gameData, setGameData] = useState<IGameData[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        fetch(`${BackEndRoutes.GAMES}`, {
            method: 'GET',
            headers: {
                ContentType: 'application/json; charset=UTF-8',
                Authorization: `Bearer ${userContext.userData?.token}`,
            },
        })
            .then((response: Response) => {
                setLoading(false);
                if (response.status === 401) {
                    userContext.setToken(null);
                    return;
                }
                if (response.ok) {
                    response.json().then((d: IGameData[]) => {
                        const games = d.filter(
                            (game) =>
                                game.player1 ===
                                    userContext.userData?.userName ||
                                game.player2 === userContext.userData?.userName
                        );
                        setGameData(games);
                    });
                }
            })
            .catch((error: Error) => {
                console.error(error);
                setLoading(false);
                setError(true);
            });
    }, []);

    return (
        <div>
            {loading && !error && <p>Loading...</p>}
            {error && <p aria-live={'polite'}>Ran into an error!</p>}
            {!loading && !error && <GameList games={gameData} />}
        </div>
    );
}
