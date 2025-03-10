import {Component, createEffect, createMemo, createSignal} from "solid-js";
import {Properties} from "~/lib/store";
import {CallIcon, EnvelopeIcon, GlobeIcon, MapPin, RatingIcon} from "~/components/svg";
import {A} from "@solidjs/router";

import Geometry from "ol/geom/Geometry";

export type PLACE_PROPS = {
    geometry: Geometry
    properties: Properties
    type: string
    id: string | number
    bbox?: any
}

const PlaceCard: Component<PLACE_PROPS> = props => {

    const type = () => props.type ?? null;
    const geometry = () => props.geometry;
    const id = () => props.id;
    const properties = () => props.properties?.loc ?? props.properties;
    const extraTags = () => properties()?.extratags;
    const address = () => properties()?.address;
    const bbox = () => props.bbox;

    const displayName = () => properties()?.display?.split(',');



    createEffect(() => {
        console.log("geometry", geometry())
        console.log("displayName", displayName())
        console.log("properties", properties())

    })
    /*housenumber, street, locality, district, postcode, city, county, state, country*/
    return (


        <div class="bg-white shadow rounded overflow-hidden">
            <div class="bg-cover bg-center h-16 p-4 flex justify-end items-center"
                 style="background-image: url(https://content.api.news/v3/images/bin/11990db1d540d5c13ea8ca3e01f2083c)">

                <div class="flex items-center justify-end space-x-2">
                    <A href={`tel:${extraTags()?.phone}`} target="_blank"
                       class={'flex items-center rounded-full bg-gray-action border border-gray-5 p-1'}>
                        <CallIcon class={'size-7 p-1'}/>
                    </A>
                    <A href={""} class={'flex items-center rounded-full bg-gray-action border border-gray-5 p-1'}>
                        <EnvelopeIcon class={'size-7 p-1'}/>
                    </A>
                    <A href={`${extraTags()?.website}`} target="_blank"
                       class={'flex items-center rounded-full bg-gray-action border border-gray-5 p-1'}>
                        <GlobeIcon class={'size-7 p-1'}/>
                    </A>
                    <button
                        type={'button'}
                        class="uppercase text-sm text-gray-11 bg-gray-action py-1 px-1 rounded-full shadow-lg">
                        <MapPin class={'size-7 p-1'}/>
                    </button>
                </div>
            </div>
            <div class="px-4 pb-3 pt-4 border-b border-gray-2 bg-gray-1 flex justify-between">
                <div class={'flex justify-start items-center space-x-1'}>
                    <RatingIcon class={'size-4 stroke-amber-10 fill-amber-4'}/>
                    <RatingIcon class={'size-4 stroke-amber-10 fill-amber-4'}/>
                </div>
                <div
                    class="text-xs uppercase font-bold text-gray-600 tracking-wide">{properties()?.loc?.address?.name}</div>
            </div>
            <div class="p-4 text-gray-700 flex justify-start items-center w-full">
                <div class={'items-center text-left'}>
                    <p class="text-xl text-gray-900 leading-none">
                        {displayName()?.[0]}
                    </p>
                    <p class="text-xs w-full mt-2"><span
                        class={'font-semibold capitalize'}>{properties()?.loc?.type}</span> {" | "} {displayName()?.[1]} {displayName()?.[2]}
                    </p>
                    <p class="text-xs w-full mt-2">{displayName()?.[2]}, {displayName()?.[3]}</p>
                </div>
            </div>
            <p class="text-xs py-2 w-full bg-gray-1 items-center text-center">{extraTags()?.opening_hours?.replaceAll(";", " |")}</p>
            <div class="flex justify-between items-center p-4 border-t border-gray-4 text-gray-600">
                <div class="flex items-center text-left flex-col space-y-1">
                    <p class="text-xs w-full">

                    </p>
                    <p class="text-xs w-full"></p>
                </div>

                <div class="flex items-center justify-end space-x-4">

                </div>
            </div>
        </div>
    );
};

export default PlaceCard;