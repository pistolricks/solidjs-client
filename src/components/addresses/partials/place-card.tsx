import {Component, createEffect} from "solid-js";
import {Feature, Properties} from "~/lib/store";
import {CallIcon, ChatIcon, GlobeIcon, MapPin, RatingIcon} from "~/components/svg";
import {BBox, GeoJsonProperties, Geometry, Point} from "geojson";

type PROPS = {
    type: "Feature";
    geometry: Geometry;
    id?: string | number | undefined;
    properties: GeoJsonProperties;
    bbox?: BBox | undefined;
}


const PlaceCard: Component<PROPS> = props => {

    const type = () => props.type;
    const geometry = () => props.geometry;
    const id = () => props.id;
    const properties = () => props.properties;
    const bbox = () => props.bbox;

    createEffect(() => {
        console.log(geometry())
    })

    return (


        <div class="bg-white shadow rounded overflow-hidden">
            <div class="bg-cover bg-center h-16 p-4 flex justify-end items-center"
                 style="background-image: url(https://content.api.news/v3/images/bin/11990db1d540d5c13ea8ca3e01f2083c)">
                <button
                    class="uppercase tracking-widest text-sm text-gray-11 bg-gray-action py-1 px-1 rounded-full opacity-75 shadow-lg">
                    <MapPin class={'size-6 p-1'}/>
                </button>
            </div>
            <div class="px-4 pb-3 pt-4 border-b border-gray-2 bg-gray-1 flex justify-between">
                <div class={'flex justify-start items-center space-x-1'}>
                    <RatingIcon class={'size-4 stroke-amber-10 fill-amber-4'}/>
                    <RatingIcon class={'size-4 stroke-amber-10 fill-amber-4'}/>
                </div>
                <div class="text-xs uppercase font-bold text-gray-600 tracking-wide">{properties()?.loc?.address?.name}</div>
            </div>
            <div class="p-4 text-gray-700 flex justify-between items-start">
                <div class={'flex flex-col'}>
                    <p class="text-xl text-gray-900 leading-none my-1">

                    </p>
                    <p class="text-xs w-56 mt-2">Locally operated for 50 years</p>
                    <p class="text-xs w-56 mt-2">123 La Jolla Ave., Los Angeles, CA</p>
                </div>
            </div>
            <div class="flex justify-between items-center p-4 border-t border-gray-4 text-gray-600">
                <div class="flex items-center flex-col space-y-1">
                    <p class="text-xs w-full">401-123-1234</p>
                    <p class="text-xs w-full">Open - CLoses 11PM</p>
                </div>

                <div class="flex items-center justify-end space-x-4">
                    <div class={'flex items-center rounded-full bg-gray-action border border-gray-5 p-1'}>
                        <CallIcon class={'size-6 p-1'}/>
                    </div>
                    <div class={'flex items-center rounded-full bg-gray-action border border-gray-5 p-1'}>
                        <ChatIcon class={'size-6 p-1'}/>
                    </div>
                    <div class={'flex items-center rounded-full bg-gray-action border border-gray-5 p-1'}>
                        <GlobeIcon class={'size-6 p-1'}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaceCard;