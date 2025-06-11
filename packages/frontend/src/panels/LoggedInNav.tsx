import {useContext} from "react";
import {UserContext} from "../context/UserContext.tsx";
import {Link, useNavigate} from "react-router";
import {FrontEndRoutes} from "dots_and_boxes_backend/src/shared/ValidRoutes.ts"

export function LoggedInNav() {
    const userData = useContext(UserContext);
    const navigate = useNavigate();

    function logOut() {
        userData.setToken(null)
        navigate("/")
    }

    return (
        <nav>
            <Link to={FrontEndRoutes.MY_GAMES}>My Games</Link>
            <Link to={"/profile/" + userData.userData?.userName}>{userData.userData?.userName}</Link>
            <button onClick={logOut}>Log Out</button>
        </nav>
    )

}