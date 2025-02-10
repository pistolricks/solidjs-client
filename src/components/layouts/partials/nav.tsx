import {A, AccessorWithLatest, createAsync, RouteSectionProps, useLocation} from "@solidjs/router";
import {Component, lazy, Show} from "solid-js";
import {USER} from "~/lib/store";
import Drawer from "@corvu/drawer";
import {UserCircle} from "~/components/svg";
import {getUser} from "~/lib/users";
import PageHeading from "~/components/layouts/partials/page-heading";

export const route = {
    preload() {
        getUser();
    }
}


type PROPS = RouteSectionProps
const Nav: Component<PROPS> = props => {
    const location = useLocation();
    const user: AccessorWithLatest<USER | undefined> = createAsync(async () => getUser());
    const path = () => location.pathname;

    const active = (routePath: string) =>
        routePath == path() ? "border-gray-normal" : "border-transparent hover:border-gray-dim";

    return (
        <header class={"relative w-full bg-gray-ui"}>
            <nav class="container items-center w-full" aria-label="Global">
                <div class="flex justify-between items-center w-full p-3 text-gray-normal">
                    <ul class="flex justify-start items-center">
                        <li class={`${active("/")} mx-1.5 sm:mx-6`}>
                            <A href="/">{import.meta.env.VITE_APP_NAME}</A>
                        </li>
                    </ul>
                    <ul class="flex justify-end items-center mx-1.5 sm:mx-6">
                        <Show
                            fallback={
                                <>
                                    <li class={`border-b-1 ${active("/login")} mx-1.5 sm:mx-6`}>
                                        <A href={'/login'}>Login</A>
                                    </li>
                                    <li class={`border-b-1 ${active("/register")} mx-1.5 sm:mx-6`}>
                                        <A href={'/register'}>Register</A>
                                    </li>
                                </>
                            }
                            when={user()} keyed>
                            {(user) => (
                                <>
                                    <Drawer.Trigger as={"button"}>
                                        <UserCircle/>
                                    </Drawer.Trigger>

                                </>
                            )}

                        </Show>
                    </ul>
                </div>

            </nav>
            <div class={'bg-gray-app border-b border-gray-normal'}>
                <div class="container w-full">
                    <div class={'container'}>
                        <PageHeading path={path()}/>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Nav;