import * as React from 'react';

export interface IUserData {
    userName: string;
    token: string;
}
export interface IUserContext {
    userData: IUserData | null;
    setToken: (token: string | null) => void;
}

export const InitialContext: IUserContext = {
    userData: null,
    setToken: (_) => {},
};

export const UserContext: React.Context<IUserContext> =
    React.createContext(InitialContext);
