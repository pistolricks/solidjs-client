import {AccessorWithLatest, createAsync, useLocation} from "@solidjs/router";
import {USER} from "~/lib/store";
import {Component, createEffect, JSXElement, lazy} from "solid-js";
const Nav = lazy(() => import('~/components/layouts/partials/nav'));
import {getUser} from "~/lib/users";

type PROPS = {
    children: JSXElement

}

export const route = {
    preload() {
        getUser();
    }
}

const AppLayout: Component<PROPS> = props => {
    const location = useLocation();

    const userData: AccessorWithLatest<USER | undefined> = createAsync(async () => getUser());

    const user = () => userData() ?? undefined;

    createEffect(() => console.log('activate', user()))
    return (
        <div class={''}>
            <header class={"relative h-[50px] w-full"}>
                <Nav user={userData()} path={location.pathname}/>
            </header>

            {props.children}
        </div>
    );
}

export default AppLayout;