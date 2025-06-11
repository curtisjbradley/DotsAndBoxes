interface IEditProfileProps {
    user: string;
}
export function EditableProfile(props: IEditProfileProps) {
    return <p> Edit! {props.user}</p>;
}
