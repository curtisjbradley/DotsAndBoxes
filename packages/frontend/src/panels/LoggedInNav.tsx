import {useContext} from "react";
import {UserContext} from "../context/UserContext.tsx";
import {useNavigate} from "react-router";

export function LoggedInNav() {
    const userData = useContext(UserContext);
    const navigate = useNavigate();

    function logOut() {
        userData.setToken(null)
        navigate("/")
    }

    return (
        <nav>
            <button onClick={logOut}>Log Out</button>
        </nav>
    )

}