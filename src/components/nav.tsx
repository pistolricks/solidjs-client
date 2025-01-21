import {A} from "@solidjs/router";
import {Component, Show} from "solid-js";
import {USER} from "~/lib/store";

type PROPS = {
    user: USER
    path: string
}
const Nav: Component<PROPS> = props => {

    const user = () => props.user;
    const path = () => props.path;

    const active = (routePath: string) =>
        routePath == path() ? "border-gray-normal" : "border-transparent hover:border-gray-dim";

    return (
        <nav class="bg-gray-ui">
            <div class="container flex justify-between items-center p-3 text-gray-normal">
                <ul class="flex justify-start items-center">
                    <li class={`border-b-2 ${active("/")} mx-1.5 sm:mx-6`}>
                        <A href="/">Home</A>
                    </li>
                    <li class={`border-b-2 ${active("/about")} mx-1.5 sm:mx-6`}>
                        <A href={'/about'}>About</A>
                    </li>
                </ul>
                <ul class="flex justify-end items-center">
                    <Show
                        fallback={
                            <>
                                <li class={`border-b-2 ${active("/login")} mx-1.5 sm:mx-6`}>
                                    <A href={'/login'}>Login</A>
                                </li>
                                <li class={`border-b-2 ${active("/register")} mx-1.5 sm:mx-6`}>
                                    <A href={'/register'}>Register</A>
                                </li>
                            </>
                        }
                        when={user().activated}>
                            <li class={`border-b-2 mx-1.5 sm:mx-6`}>
                                {user().name}
                            </li>
                    </Show>
                </ul>
            </div>
        </nav>
    );
}

export default Nav;