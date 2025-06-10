import {useContext, useEffect} from "react";
import {UserContext} from "../context/UserContext.tsx";

export function TokenReader() {
    const userData = useContext(UserContext)
    useEffect(() => {
        const localToken = localStorage.getItem("token")
        if(localToken !== userData.token) {
            userData.setToken(localToken)
        }
    }, [userData.token]);
    return (<div></div>)
}