import {useContext, useState} from "react";
import {UserContext} from "../context/UserContext.tsx";
import  type {IInviteDocument} from "dots_and_boxes_backend/src/providers/InviteProvider.ts"
import {useNavigate} from "react-router";
import type {IGameData} from "dots_and_boxes_backend/src/shared/SerializedGame.ts"

interface IAcceptInviteProps {
    invite: IInviteDocument
}
export function AcceptInvite(props : IAcceptInviteProps) {
    const userData = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    function acceptInvite() {
        setLoading(true);
        fetch(`/api/invite/${props.invite._id}`, {method: "PATCH",
            headers: {"Content-Type": "application/json",
                "Authorization": `Bearer ${userData.userData?.token}`}
        }).then(res => {
            if(res.ok) {
                res.json().then((data : IGameData) => {
                    setLoading(false);
                    setError(false);
                    if(data._id) {
                        return navigate(`/game/${data._id}`)
                    }
                })
            }
        }).catch(error => {
            setLoading(false);
            setError(true)
            console.error(error)
        })
    }

    return (<div>
        <h2>Invite from {props.invite.username}</h2>
        <h3>Play a {props.invite.size.x} by {props.invite.size.y} game</h3>
        <button onClick={acceptInvite} disabled={loading}>Accept Invite</button>
        {loading && <p>Loading...</p>}
        {error && <p aria-live={"polite"}>{error}</p>}
    </div>)
}