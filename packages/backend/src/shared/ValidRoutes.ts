export const FrontEndRoutes = {
    HOME: "/",
    LOGIN: "/login",
    REGISTER: "/register",
    PROFILE: "/profile/:profileId",
    MY_GAMES: "/mygames",
    GAME: "/game/:gameId",
}

export const BackEndRoutes = {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    GAMES: "/api/games",
    GAME: "/api/game/:gameId",
}