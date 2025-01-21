import {Component}                      from "solid-js";
import ViewUser                                          from "~/components/users/view";
import {createAsync, RouteDefinition, RouteSectionProps} from "@solidjs/router";
import {getUser}                 from "~/lib/users";
import {USER} from "~/lib/store";

export const route = {
    preload({params}){
        getUser();
    }
} satisfies RouteDefinition

type PROPS = RouteSectionProps;

const View: Component<PROPS> = props => {

    const user : () => USER|undefined = createAsync(async () => getUser()
        
    )

    return (
        <ViewUser user={user()}/>
    );
};

export default View;