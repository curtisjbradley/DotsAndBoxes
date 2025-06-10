import {BackEndRoutes, FrontEndRoutes} from "dots_and_boxes_backend/src/shared/ValidRoutes.ts";
import {Link} from "react-router";
import {useActionState, useContext, useId} from "react";
import {useNavigate} from "react-router";
import {UserContext} from "../context/UserContext.tsx";



export interface ILoginProps {
    registering: boolean;
}

export function Login(props: ILoginProps) {
    const navigate = useNavigate()
    const usernameInputId = useId();
    const passwordInputId = useId();

    const userData = useContext(UserContext);

    function getErrorMessage(status: number) {
        switch (status) {
            case 0:
                return ""
            case 400:
                return "Could not send password and username"
            case 401:
                return "Invalid Credentials"
            case 404:
                return "Could not find login route"
            case 409:
                return "User already exists"
            case 500:
                return "Ran into an error"
            default:
                return "Successful"
        }
    }

    const [result, submitAction, isPending] = useActionState(
        async (previousState: number,formData: FormData) => {
            if(previousState === 201){
                return 201
            }
            const username = formData.get("username");
            const password = formData.get("password");

            const res =  await fetch(props.registering ? BackEndRoutes.REGISTER : BackEndRoutes.LOGIN, {method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username,password})})

            if(res.ok) {
                await res.json().then(body => userData.setToken(body.token))
                navigate("/")
            }
            return res.status
        },
        0
    );


    return (
        <div>
            <h2>{props.registering ? "Register" : "Login"}</h2>
            <form className="LoginPage-form" action={submitAction}>
                <label htmlFor={usernameInputId}>Username</label>
                <input id={usernameInputId} name={"username"} required disabled={isPending} />

                <label htmlFor={passwordInputId}>Password</label>
                <input id={passwordInputId} type="password" name={"password"} required disabled={isPending} />
                <input type="submit" value="Submit" disabled={isPending} />
                {result != 201 && <p aria-live={"polite"} style={{color: "red"}}>{getErrorMessage(result)}</p> }
            </form>
            {props.registering ?
                <p>Already have an account? Login <Link to={FrontEndRoutes.LOGIN}>here.</Link></p>
            :
                <p>Don't have an account? Create one <Link to={FrontEndRoutes.REGISTER}>here.</Link></p>
            }
        </div>
    )
}