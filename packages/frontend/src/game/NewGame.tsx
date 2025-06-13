import {useActionState, useContext} from "react";
import {BackEndRoutes} from "dots_and_boxes_backend/src/shared/ValidRoutes.ts"
import type {IInviteDocument} from "dots_and_boxes_backend/src/providers/InviteProvider.ts";
import {UserContext} from "../context/UserContext.tsx";

interface ILinkCreation {
    statusCode: number | null;
    invite : IInviteDocument | null;
}



export function NewGame() {
    const userData = useContext(UserContext);
    const [state , formAction, isPending]  = useActionState(async (_ : ILinkCreation, formData : FormData) => {
        const width = formData.get("gridWidth");
        const height = formData.get("gridHeight");
        const invite = await fetch(BackEndRoutes.GAMES, {method: "POST", headers: {
            "Content-Type": "application/json",
                "Authorization": `Bearer ${userData.userData?.token}`
            },  body: JSON.stringify({width, height})})
        if (!invite.ok) {
            return {statusCode: invite.status, invite: null}
        }

        const body: IInviteDocument = await invite.json()
        const out : ILinkCreation = {statusCode: invite.status, invite: body};
        return  out

    },{statusCode: null,invite: null})

    return (<div>
        <h1>New Game</h1>
        <form action={formAction}>
            <label>
                Grid Width
                <input type="number" required name={"gridWidth"} />
            </label>
            <label>
                Grid Height
                <input type="number" required name={"gridHeight"} />
            </label>
            <button type="submit">Create Game</button>
        </form>
        {isPending && <p>Creating Invite Link</p>}
        {!isPending && state.invite && <CreatedLink invite={state.invite} />}
        {state.statusCode == 400 && <p aria-live={"polite"}>Bad Input Data</p>}
        {state.statusCode == 500 && <p aria-live={"polite"}>Something Went Wrong</p>}

    </div>)
}


interface CreatedLinkProps {
    invite: IInviteDocument
}
export function CreatedLink(props: CreatedLinkProps) {
    return <div>
        <h3>Invite Created</h3>
        <p>{props.invite.size.x} by {props.invite.size.y} game invite created</p>
        <p>{`${window.location.origin}/invite/${props.invite._id}`}</p>
    </div>

}