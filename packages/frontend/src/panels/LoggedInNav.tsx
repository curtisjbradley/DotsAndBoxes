import {useContext} from "react";
import {UserContext} from "../context/UserContext.tsx";
import {Link, useNavigate} from "react-router";

export function LoggedInNav() {
    const userData = useContext(UserContext);
    const navigate = useNavigate();

    function logOut() {
        userData.setToken(null)
        navigate("/")
    }

    return (
        <nav>
            <Link to={"/profile/" + userData.userData?.userName}>{userData.userData?.userName}</Link>
            <button onClick={logOut}>Log Out</button>
        </nav>
    )

}