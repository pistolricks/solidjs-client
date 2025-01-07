import {Component}                      from "solid-js";
import ViewUser                         from "~/components/users/view";
import {createAsync, RouteSectionProps} from "@solidjs/router";

type PROPS = RouteSectionProps;


const View: Component<PROPS> = props => {

    const user = createAsync(async () =>
        await fetch(`http://localhost:${import.meta.env.VITE_CLIENT_PORT}/api/users/${props.params.id}`).then(res => res.json())
    )

    return (
        <ViewUser {...user()}/>
    );
};

export default View;