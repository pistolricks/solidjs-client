import {Component}                      from "solid-js";
import ViewUser                                          from "~/components/users/view";
import {createAsync, RouteDefinition, RouteSectionProps} from "@solidjs/router";
import {getStorageUser, getStorageUsers}                 from "~/lib/users";
import {USER} from "~/lib/store";

export const route = {
    preload({params}){
        getStorageUser(+params.id);
    }
} satisfies RouteDefinition

type PROPS = RouteSectionProps;

const View: Component<PROPS> = props => {

    const user : () => USER|undefined = createAsync(async () => getStorageUser(+props.params.id)
        
    )

    return (
        <ViewUser user={user()}/>
    );
};

export default View;