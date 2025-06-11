import { useParams } from 'react-router';
import { useContext, useEffect, useState } from 'react';
import { NotFound } from '../static-pages/NotFound.tsx';
import type {
    IGameData,
    ILine,
} from 'dots_and_boxes_backend/src/shared/SerializedGame.ts';
import { DotsAndBoxes } from '../game_data/DotsAndBoxes.tsx';
import Game from '../game_data/Game.ts';
import { UserContext } from '../context/UserContext.tsx';
import { BackEndRoutes } from 'dots_and_boxes_backend/src/shared/ValidRoutes.ts';

export function GameView() {
    const userContext = useContext(UserContext);
    const { gameId } = useParams();
    const [gameData, setGameData] = useState<IGameData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [notFound, setNotFound] = useState<boolean>(false);

    useEffect(() => {
        fetch(`${BackEndRoutes.GAMES}?id=${gameId}`, {
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
                if (response.status === 404) {
                    setNotFound(true);
                    return;
                }
                if (response.ok) {
                    response.json().then((d: IGameData) => {
                        setGameData(d);
                    });
                }
            })
            .catch((error: Error) => {
                console.error(error);
                setLoading(false);
                setError(true);
            });
    }, []);

    function handlePlaceLine(line: ILine) {
        console.log(line);
    }

    return (
        <div>
            {loading && !error && <p>Loading...</p>}
            {error && <p aria-live={'polite'}>Ran into an error!</p>}
            {notFound ? (
                <NotFound />
            ) : gameData ? (
                <DotsAndBoxes
                    handlePlaceLine={handlePlaceLine}
                    game={Game.deserialize(gameData)}
                />
            ) : null}
        </div>
    );
}
