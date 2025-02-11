import {A, AccessorWithLatest, createAsync, RouteSectionProps, useLocation} from "@solidjs/router";
import {Component, lazy, ParentProps, Show} from "solid-js";
import {USER} from "~/lib/store";
import Drawer from "@corvu/drawer";
import {UserCircle} from "~/components/svg";
import {getUser} from "~/lib/users";
import Breadcrumbs from "~/components/layouts/partials/breadcrumbs";
import SideNavMenu from "~/components/layouts/partials/side-nav-menu";
import {getVendors} from "~/lib/vendors";




type PROPS = {
    user?: USER;
    path?: string;
}
const Nav: Component<PROPS> = props => {

    const user = () => props.user;
    const path = () => props.path;
    const active = (routePath: string) =>
        routePath == path() ? "border-gray-normal" : "border-transparent hover:border-gray-dim";

    return (
        <>
        <header class={"relative w-full bg-gray-ui"}>
            <nav class="container items-center w-full" aria-label="Global">
                <div class="flex justify-between items-center w-full py-3 text-gray-normal">
                    <ul class="flex justify-start items-center">
                        <li class={`${active("/")}`}>
                            <A href="/">{import.meta.env.VITE_APP_NAME}</A>
                        </li>
                    </ul>
                    <ul class="flex justify-end items-center">
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
                        <Breadcrumbs path={path()}/>
                </div>
            </div>
        </header>
            <Drawer.Content class={"w-screen sm:max-w-lg"}>

                <SideNavMenu user={user()}/>

                {/*
                            <p class="hidden_frog">🐸 You found froggy!</p>
                           */}
            </Drawer.Content>
            </>
    );
}

export default Nav;