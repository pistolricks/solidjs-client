import {AccessorWithLatest, createAsync} from "@solidjs/router";
import {MoviesData} from "~/lib/store";
import {createEffect} from "solid-js";
import {getMovies} from "~/lib/movies";
import CategoryLayout from "~/components/layouts/category-layout";
import MoviesList from "~/components/movies/list";


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
            <CategoryLayout {...moviesData()}>
                <MoviesList movies={moviesData()}/>
            </CategoryLayout>
    );
}
