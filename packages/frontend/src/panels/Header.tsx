import "../styles/Header.css"
import {Link} from "react-router";
import {FrontEndRoutes} from "dots_and_boxes_backend/src/shared/ValidRoutes.ts";
import {useContext} from "react";
import {UserContext} from "../context/UserContext.tsx";
import {LoggedInNav} from "./LoggedInNav.tsx";
import {LoggedOutNav} from "./LoggedOutNav.tsx";

export function Header() {
    const userData = useContext(UserContext);
    return (
        <header>
            <h1><Link to={FrontEndRoutes.HOME}>Dots and Boxes</Link> </h1>
            <div>
                    {userData.token ? <LoggedInNav /> : <LoggedOutNav />}
            </div>
        </header>
    )

}