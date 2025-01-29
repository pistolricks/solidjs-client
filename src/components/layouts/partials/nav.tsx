import {A} from "@solidjs/router";
import {Component, lazy, Show} from "solid-js";
import {USER} from "~/lib/store";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "~/components/ui/dropdown-menu";

const LogoutUserForm = lazy(() => import("~/components/users/forms/logout-user-form"));

type PROPS = {
    user?: USER
    path: string
}
const Nav: Component<PROPS> = props => {

    const user = () => props.user ?? undefined;
    const path = () => props.path;

    const active = (routePath: string) =>
        routePath == path() ? "border-gray-normal" : "border-transparent hover:border-gray-dim";

    return (
        <nav class="bg-gray-ui fixed top-0 inset-x-0 h-[50px]">
            <div class="container flex justify-between items-center p-3 text-gray-normal">
                <ul class="flex justify-start items-center">
                    <li class={`border-b-2 ${active("/")} mx-1.5 sm:mx-6`}>
                        <A href="/">Home</A>
                    </li>
                    <li class={`border-b-2 ${active("/about")} mx-1.5 sm:mx-6`}>
                        <A href={'/about'}>About</A>
                    </li>
                    <Show when={user()}>
                        <li class={`border-b-2 ${active("/movies")} mx-1.5 sm:mx-6`}>
                            <A href={'/movies'}>Movies</A>
                        </li>
                        <li class={`border-b-2 ${active("/vendors")} mx-1.5 sm:mx-6`}>
                            <A href={'/vendors'}>Vendors</A>
                        </li>
                    </Show>
                </ul>
                <ul class="flex justify-end items-center mx-1.5 sm:mx-6">
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
                        when={user()} keyed>
                        {(user) => (
                            <>
                                <DropdownMenu>
                                    <DropdownMenuTrigger class={""}>{user.name}</DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuSeparator/>
                                        <DropdownMenuItem>Profile</DropdownMenuItem>
                                        <DropdownMenuItem>Billing</DropdownMenuItem>
                                        <DropdownMenuItem>Team</DropdownMenuItem>
                                        <DropdownMenuItem></DropdownMenuItem>
                                        <DropdownMenuSeparator/>
                                        <LogoutUserForm/>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </>
                        )}

                    </Show>
                </ul>
            </div>
        </nav>
    );
}

export default Nav;