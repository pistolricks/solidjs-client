import {A, AccessorWithLatest, createAsync, useLocation} from "@solidjs/router";
import {MoviesData, USER} from "~/lib/store";
import {getMovies} from "~/lib/movies";
import {getUser} from "~/lib/users";
import {Show} from "solid-js";

export default function Nav() {
    const location = useLocation();

    const user: AccessorWithLatest<USER | undefined> = createAsync(async () => getUser());
    const active = (path: string) =>
        path == location.pathname ? "border-gray-normal" : "border-transparent hover:border-gray-dim";

    return (
        <nav class="bg-gray-ui">
            <ul class="container flex items-center p-3 text-gray-normal">
                <li class={`border-b-2 ${active("/")} mx-1.5 sm:mx-6`}>
                    <A href="/">Home</A>
                </li>
                <li class={`border-b-2 ${active("/about")} mx-1.5 sm:mx-6`}>
                    <A href={'/about'}>About</A>
                </li>
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
                    {(user: USER) => (
                        <li class={`mx-1.5 sm:mx-6`}>
                            <span>{user.name}</span>
                        </li>
                    )}
                </Show>
            </ul>
        </nav>
    );
}
