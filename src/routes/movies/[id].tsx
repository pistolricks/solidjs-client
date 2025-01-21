import {Component, createEffect, Show} from "solid-js";
import ViewUser from "~/components/users/view";
import {createAsync, RouteDefinition, RouteSectionProps} from "@solidjs/router";
import {getMovie} from "~/lib/movies";
import {MOVIE, MOVIE_DETAIL} from "~/lib/store";
import DetailsLayout from "~/components/layouts/details-layout";
import MovieDetails from "~/components/movies/details";

export const route = {
    preload({params}) {
        getMovie(+params.id);
    }
} satisfies RouteDefinition

type PROPS = RouteSectionProps;

const View: Component<PROPS> = props => {

    const movieData: () => MOVIE_DETAIL = createAsync(async () => getMovie(+props.params.id))

    const details = () => movieData();
    createEffect(() => console.log(details()))



    return (
        <DetailsLayout>
            <MovieDetails details={details()} />
        </DetailsLayout>
    );
};

export default View;