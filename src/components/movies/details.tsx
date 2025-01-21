import {Component, For, Show} from "solid-js";
import {MOVIE, MOVIE_DETAIL, MoviesData} from "~/lib/store";
import {A} from "@solidjs/router";
import {Button} from "~/components/ui/button";

type PROPS = {
    details: MOVIE_DETAIL | undefined;
}

const MovieDetails: Component<PROPS> = props => {
    const movie = () => props.details?.movie;
    return (
        <ul class={'text-gray-11 space-y-4 text-center'}>
            <Show when={movie()} keyed>
                {(item: MOVIE) => (
                    <div class={'flex flex-col space-y-2 border border-cyan-normal p-1'}>
                        <p class={'border border-amber-normal bg-amber-action text-amber-dim p-1'}>{item.title}</p>
                        <p class={'border border-orange-normal bg-orange-action text-orange-dim p-1'}>{item.year} {item.runtime}</p>
                        <p class={'border border-red-normal bg-red-action text-red-dim p-1'}>
                            <For each={item?.genres}>
                                {(genre) => (
                                    <p class={'capitalize'}>{genre}</p>
                                )}
                            </For>
                        </p>

                    </div>
                )}
            </Show>
        </ul>
    );
};

export default MovieDetails;