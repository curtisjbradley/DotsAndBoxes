import {FrontEndRoutes} from "dots_and_boxes_backend/src/shared/ValidRoutes.ts";
import {Link} from "react-router";

export function LoggedOutNav() {
    return (
        <nav>
            <Link to={FrontEndRoutes.LOGIN}>Login</Link>
        </nav>
    )
}