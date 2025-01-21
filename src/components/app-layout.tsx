import {AccessorWithLatest, createAsync, useLocation} from "@solidjs/router";
import {USER} from "~/lib/store";
import {Component, createEffect, JSXElement} from "solid-js";
import Nav from "~/components/nav";
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

    const user = () => userData() ?? {
        id: 0,
        name: "",
        email: "",
        activated: false,
        created_at: "",
    }

    createEffect(() => console.log(user()))

    return (
        <>
            <Nav user={user()} path={location.pathname}/>


            {props.children}
        </>
    );
}

export default AppLayout;