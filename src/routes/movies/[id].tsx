import {Component, createEffect, Show} from "solid-js";
import ViewUser from "~/components/users/view";
import {createAsync, RouteDefinition, RouteSectionProps} from "@solidjs/router";
import {getMovie} from "~/lib/movies";
import {MOVIE, MOVIE_DETAIL} from "~/lib/store";

export const route = {
    preload({params}) {
        getMovie(+params.id);
    }
} satisfies RouteDefinition

type PROPS = RouteSectionProps;

const View: Component<PROPS> = props => {

    const movieData: () => MOVIE_DETAIL = createAsync(async () => getMovie(+props.params.id))

    const movie = () => movieData()?.movie;
    createEffect(() => console.log(movie()))



    return (
        <Show when={movie()} keyed>
            {(item: MOVIE) => (
                <div class={'text-red-dim'}>
                    {item.title} {item.runtime}
                </div>
            )}
        </Show>
    );
};

export default View;