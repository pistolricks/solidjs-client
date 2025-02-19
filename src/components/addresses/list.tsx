import {Component, For} from "solid-js";
import {Feature, Properties} from "~/lib/store";

import {Point} from "geojson";
import PlaceCard from "~/components/addresses/partials/place-card";
import {GeoJSONFeatureCollection} from "ol/format/GeoJSON";
import {useLayoutContext} from "~/context/layout-provider";

type PROPS = {
    places: GeoJSONFeatureCollection
}

const AddressesList: Component<PROPS> = props => {
    const places = () => props.places;
    return (
        <ul
            class={'text-gray-11 space-y-2 text-center h-full overflow-y-auto px-2'}>
            <For each={places()?.features}>
                {(place, i) => (

                        <PlaceCard {...place}/>

                )}
            </For>
        </ul>
    );
};

export default AddressesList;