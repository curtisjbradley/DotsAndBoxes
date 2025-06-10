import {useContext} from "react";
import {UserContext} from "../context/UserContext.tsx";
import {useParams} from "react-router";
import {NotFound} from "../static-pages/NotFound.tsx";
import {EditableProfile} from "./EditableProfile.tsx";
import {ViewProfile} from "./ViewProfile.tsx";


export function Profile() {
    const userContext = useContext(UserContext);
    const profileId = useParams()?.profileId;
    if(!profileId){
        return <NotFound />;
    }

    if (userContext.userData?.userName === profileId) {
        return <EditableProfile user={profileId} />
    } else {
        return <ViewProfile user={profileId} />;
    }
}