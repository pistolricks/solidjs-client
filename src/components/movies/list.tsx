import {Component, For} from "solid-js";
import {MoviesData} from "~/lib/store";
import {A} from "@solidjs/router";
import {Button} from "~/components/ui/button";

type PROPS = {
    movies: MoviesData | undefined;
}

const MoviesList: Component<PROPS> = props => {
    const movies = () => props.movies?.movies;
    return (
        <ul class={'text-gray-11 space-y-8 text-center'}>
            <For each={movies()}>
                {(movie, i) => (
                    <li class={''}>
                        <Button as={A} href={`/movies/${movie.id}`}>
                            <span class={'text-tomato-normal'}>{movie.title}</span>
                            <span>{movie.year}</span>
                            <span>{movie.runtime}</span>
                        </Button>
                        <div class={'space-x-1'}>
                            <For each={movie?.genres}>
                                {(genre) => (
                                    <span class={''}>{genre}</span>
                                )}
                            </For>
                        </div>
                    </li>
                )}
            </For>
        </ul>
    );
};

export default MoviesList;