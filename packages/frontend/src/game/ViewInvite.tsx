import {useParams} from "react-router";
import  type {IInviteDocument} from "dots_and_boxes_backend/src/providers/InviteProvider.ts"
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../context/UserContext.tsx";
import {AcceptInvite} from "./AcceptInvite.tsx";

export function ViewInvite() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [expired,setExpired] = useState(false);
    const [invite, setInvite] = useState<IInviteDocument | null>(null);
    const {inviteId} = useParams()
    const userData = useContext(UserContext);
    useEffect(() => {
        setLoading(true);
        fetch(`/api/invite/${inviteId}`, {method: "GET", headers: {"Content-Type": "application/json",
        "Authorization": `Bearer ${userData.userData?.token}`}}).then(res => {
            if (res.status == 404) {
                setLoading(false);
                setError(false);
                setExpired(true);
                return;
            }
            if(!res.ok){
                setError(true);
                setLoading(false);
                setExpired(false);
                return
            }
            res.json().then(setInvite)
            setLoading(false);
            setError(false);
            setExpired(false);
        })
    }, []);

    let page = null
    if(!loading && !error){
        if(expired){
            page = <ExpiredInvite />
        }
        else if (invite?.username === userData.userData?.userName) {
            page = <SelfInvite/>
        } else if (invite) {
            page = <AcceptInvite invite={invite} />
        } else {
            page = null
        }
    }

        return <div>
            {loading && <p>Loading...</p>}
            {error && <p>Ran into an error.</p>}
            {page}

        </div>
}




function SelfInvite() {
    return <div>
        <h2>Share This Link</h2>
        <p>You cannot play yourself. Share this link with a friend to get started.</p>
    </div>
}

function ExpiredInvite() {
    return <div>
        <h2>
            Invite Invalid
        </h2>
        <h3>The invite link may be wrong, or may have expired.</h3>
    </div>
}