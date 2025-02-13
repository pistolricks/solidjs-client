import {Component, For, Show} from "solid-js";
import {Feature, VENDOR} from "~/lib/store";
import {GeoJSON, GeoJsonObject, Geometry, GeometryCollection, GeometryObject, Point} from "geojson";

type PROPS = {
    details: Feature<Point, any, string> | undefined;
}


function VendorDetails (props: { details: Feature<Point, number, any> }){
    const vendor = () => props.details;
    return (
        <ul class={'text-gray-11 space-y-4 text-center'}>
            <Show when={vendor()}>
                    <div class={'flex flex-col space-y-2 border border-cyan-normal p-1'}>
                        <p class={'border border-amber-normal bg-amber-action text-amber-dim p-1'}>{vendor().id}</p>
                        <p class={'border border-orange-normal bg-orange-action text-orange-dim p-1'}>{vendor().geometry.coordinates}</p>
                        <p class={'border border-red-normal bg-red-action text-red-dim p-1'}>
                            {vendor().properties.type.vendor.title}
                        </p>
                        <For each={vendor()?.properties.type.vendor.genres}>
                            {(genre) => (
                                <p class={'capitalize'}>{genre}</p>
                            )}
                        </For>
                    </div>
            </Show>
        </ul>
    );
};

export default VendorDetails;