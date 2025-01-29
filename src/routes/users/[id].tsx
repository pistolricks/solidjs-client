import {Component, lazy} from "solid-js";
import {createAsync, RouteDefinition, RouteSectionProps} from "@solidjs/router";
import {getUser}                 from "~/lib/users";
import {USER} from "~/lib/store";
const ViewUser = lazy(() => import("~/components/users/view"));
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