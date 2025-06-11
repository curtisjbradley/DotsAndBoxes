interface IViewProfileProps {
    user: string;
}
export function ViewProfile(props: IViewProfileProps) {
    return <p>{props.user}</p>;
}
