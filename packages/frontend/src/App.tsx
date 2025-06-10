
import {Route, Routes} from "react-router";
import {MainLayout} from "./panels/MainLayout.tsx";
import {Home} from "./static-pages/Home.tsx";
import {Login} from "./auth/Login.tsx";
import {FrontEndRoutes} from "dots_and_boxes_backend/src/shared/ValidRoutes.ts";
import {useMemo, useState} from "react";
import {type IUserContext, UserContext} from "./context/UserContext.tsx";
import {NotFound} from "./static-pages/NotFound.tsx";
import {TokenReader} from "./auth/TokenReader.tsx";

export function App(){
    const [token, setToken] = useState<string | null>(null);

    const updateToken = (newToken: string | null) => {
        setToken(newToken);
        if(newToken !== null) {
            localStorage.setItem("token", newToken);
        } else {
            localStorage.removeItem("token");
        }
    }
    const context : IUserContext = useMemo(() : IUserContext => {
        return {
            token, setToken: updateToken,
        }
    },[token])

    return (
        <UserContext.Provider value={context}>
            <TokenReader />
            <Routes>
                    <Route path={FrontEndRoutes.HOME} element={<MainLayout />} >
                        <Route index element={<Home />} />
                        <Route path={FrontEndRoutes.LOGIN} element={<Login registering={false}/>} />
                        <Route path={FrontEndRoutes.REGISTER} element={<Login registering={true}/>} />
                        <Route path={"*"} element={<NotFound />} />
                    </Route>
            </Routes>
        </UserContext.Provider>

    )
}