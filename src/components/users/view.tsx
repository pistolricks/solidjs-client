import {Component, Show} from "solid-js";
import {USER}            from "~/lib/store";

type PROPS = USER

const ViewUser: Component<PROPS> = props => {

    const user = () => props;

    return (
        <Show when={user()} keyed>
            {(item: USER) => (
                <>
                    {item.id} | {item.firstName} {item.lastName} | {item.age}
                </>
            )}
        </Show>
    );
};

export default ViewUser;