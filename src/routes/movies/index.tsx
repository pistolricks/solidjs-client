import {A, AccessorWithLatest, createAsync} from "@solidjs/router";
import {AUTHENTICATION_TOKEN, MOVIE, MoviesData, USER} from "~/lib/store";
import {getUser, getUserToken} from "~/lib/users";
import {createEffect, For} from "solid-js";
import {getMovies} from "~/lib/movies";
import Nav from "~/components/nav";
import AppLayout from "~/components/app-layout";


export const route = {
    preload() {
        getMovies();
    }
}

export default function Movies() {

    const moviesData: AccessorWithLatest<MoviesData | undefined> = createAsync(async () => getMovies());

    createEffect(() => {
        console.log("movies", moviesData())
    })
    return (
            <main class="text-center mx-auto p-4">
                <ul class={'text-gray-11'}>
                    <For each={moviesData()?.movies}>
                        {(movie: MOVIE, i  ) => (
                            <li class={'space-x-2'}>
                                <A href={`/movies/${i() + 1}`}>
                                    <span>{movie.title}</span>
                                    <span>{movie.year}</span>
                                    <span>{movie.runtime}</span>
                                    <span>{movie.genres}</span>
                                </A>

                            </li>
                        )}
                    </For>
                </ul>
            </main>
    );
}
