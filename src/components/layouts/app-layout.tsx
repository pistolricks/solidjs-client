import {AccessorWithLatest, createAsync, useLocation} from "@solidjs/router";
import {USER} from "~/lib/store";
import {Component, createEffect, JSXElement} from "solid-js";
import Nav from "~/components/layouts/partials/nav";
import {getUser, getUserToken} from "~/lib/users";
import {getMovies} from "~/lib/movies";

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
        <>
            <Nav user={userData()} path={location.pathname}/>


            {props.children}
        </>
    );
}

export default AppLayout;