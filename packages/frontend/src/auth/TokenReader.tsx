import { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext.tsx';
import {jwtDecode} from "jwt-decode";
import {Outlet} from "react-router";

export function TokenReader() {
    const userData = useContext(UserContext);
    useEffect(() => {
        const localToken = localStorage.getItem('token');
        if (localToken) {
            const exp = jwtDecode(localToken)?.exp
            if(!exp) {
                localStorage.removeItem('token');
                userData.setToken(null)
                return;
            }
            if (Date.now() >= exp * 1000) {
                userData.setToken(null)
                localStorage.removeItem('token');
                return;
            }
        }

        if (localToken !== userData.userData?.token) {
            userData.setToken(localToken);
        }
    }, [userData.userData]);
    return <Outlet />;
}
