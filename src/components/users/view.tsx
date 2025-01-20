import {Component, Show} from "solid-js";
import {USER}            from "~/lib/store";

type PROPS = {
 user: USER|undefined
}

const ViewUser: Component<PROPS> = props => {

    const user: () => USER|undefined = () => props.user;

    return (
        <Show when={user()} keyed>
            {(item: USER) => (
                <>
                    {item.id} | {item.name}
                </>
            )}
        </Show>
    );
};

export default ViewUser;