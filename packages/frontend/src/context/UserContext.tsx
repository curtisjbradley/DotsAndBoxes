import * as React from "react";


export interface IUserContext {
    token: string | null
    setToken: (token: string | null) => void
}

export const InitialContext : IUserContext = {
    token: null,
    setToken: (_) => {}
}

export const UserContext : React.Context<IUserContext>  = React.createContext(InitialContext);

