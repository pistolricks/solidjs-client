import {Component, For} from "solid-js";
import {USER}           from "~/lib/store";
import {A}              from "@solidjs/router";

type PROPS = {
    users: USER[]|undefined;
}

const UserList: Component<PROPS> = props => {
    const users = () => props.users ?? [];
    return (
        <ul>
            <For each={users()}>
                {user => (
                    <li>
                        <A href={`/users/${user.id}`}>
                            {user.id} | {user.firstName} {user.lastName} | {user.age}
                        </A>
                    </li>
                )}
            </For>
        </ul>
    );
};

export default UserList;