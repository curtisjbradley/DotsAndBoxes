import { Route, Routes } from 'react-router';
import { MainLayout } from './panels/MainLayout.tsx';
import { Home } from './static-pages/Home.tsx';
import { Login } from './auth/Login.tsx';
import { FrontEndRoutes } from 'dots_and_boxes_backend/src/shared/ValidRoutes.ts';
import { useMemo, useState } from 'react';
import {
    type IUserContext,
    type IUserData,
    UserContext,
} from './context/UserContext.tsx';
import { NotFound } from './static-pages/NotFound.tsx';
import { TokenReader } from './auth/TokenReader.tsx';
import { jwtDecode } from 'jwt-decode';
import { Profile } from './profile/Profile.tsx';
import { GameView } from './game/GameView.tsx';
import { ProtectedRoute } from './auth/ProtectedRoute.tsx';
import { MyGames } from './profile/MyGames.tsx';

interface IJwtTokenData {
    username: string;
    iat: number;
    exp: number;
}

export function App() {
    const [userData, setUserData] = useState<IUserData | null>(
        createUserData(localStorage.getItem('token'))
    );

    function createUserData(token: string | null): IUserData | null {
        if (!token) return null;
        const decodedData: IJwtTokenData = jwtDecode(token);
        return {
            token: token,
            userName: decodedData.username,
        };
    }

    const updateToken = (newToken: string | null) => {
        if (newToken) {
            localStorage.setItem('token', newToken);
        } else {
            localStorage.removeItem('token');
        }

        setUserData(createUserData(newToken));
    };

    const context: IUserContext = useMemo((): IUserContext => {
        return {
            setToken: updateToken,
            userData,
        };
    }, [userData]);

    return (
        <UserContext.Provider value={context}>
            <TokenReader />
            <Routes>
                <Route path={FrontEndRoutes.HOME} element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route
                        path={FrontEndRoutes.LOGIN}
                        element={<Login registering={false} />}
                    />
                    <Route
                        path={FrontEndRoutes.REGISTER}
                        element={<Login registering={true} />}
                    />
                    <Route path={'/'} element={<ProtectedRoute />}>
                        <Route
                            path={FrontEndRoutes.PROFILE}
                            element={<Profile />}
                        />
                        <Route
                            path={FrontEndRoutes.GAME}
                            element={<GameView />}
                        />
                        <Route
                            path={FrontEndRoutes.MY_GAMES}
                            element={<MyGames />}
                        />
                    </Route>
                    <Route path={'*'} element={<NotFound />} />
                </Route>
            </Routes>
        </UserContext.Provider>
    );
}
