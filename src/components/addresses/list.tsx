import {Component, For} from "solid-js";
import PlaceCard, {PLACE_PROPS} from "~/components/addresses/partials/place-card";

type PROPS = {
    features: PLACE_PROPS[]
}

const AddressesList: Component<PROPS> = props => {
    const features = () => props.features;
    return (
        <ul
            class={'text-gray-11 space-y-2 text-center h-full overflow-y-auto px-2'}>
            <For each={features()}>
                {(feature, i) => (

                    <PlaceCard {...feature} />

                )}
            </For>
        </ul>
    );
};

export default AddressesList;