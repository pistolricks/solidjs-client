import {Component, createEffect, createSignal, Show} from "solid-js";
import {OsmOutput} from "~/lib/store";
import {actionPositionHandler, addressPositionHandler} from "~/lib/addresses";
import {useSubmission} from "@solidjs/router";
import {Button} from "~/components/ui/button";
import {MapPin} from "~/components/svg";

type PROPS = {}

const Geolocation: Component<PROPS> = props => {
    const submission = useSubmission(actionPositionHandler);

    let map;
    let marker;
    let watchID;
    const locationStatus = document.getElementById("locationStatus");

    const [getPosition, setPosition] = createSignal<[number, number]>()


    createEffect(() => {
        console.log('getPosition', getPosition())
    })

    function trackLocation() {
        if (navigator.geolocation) {
            watchID = navigator.geolocation.watchPosition(showPosition, showError, {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            });
        } else {

            if (locationStatus) {
                locationStatus.innerHTML = "Geolocation is not supported by your browser.";
            }
        }
    }

    function updatePosition(position: { coords: { latitude: number, longitude: number } }) {
        const {latitude, longitude} = position.coords;
        const locationStatus = document.getElementById("locationStatus");
        setPosition([latitude, longitude])
        if (locationStatus) {
            locationStatus.textContent = `Latitude: ${latitude}, Longitude: ${longitude}`;
        }
    }

    function showPosition(position: { coords: { latitude: number; longitude: number; }; }) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setPosition([latitude, longitude])

        const locationStatus = document.getElementById("locationStatus");
        if (locationStatus) {
            locationStatus.innerHTML = `${mapPin}`


        }
        // Additional code to integrate with mapping APIs can be added here.
    }

    function showError(error: any) {
        const locationStatus = document.getElementById("locationStatus");
        if (locationStatus) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    locationStatus.innerHTML = "Access to location was denied.";
                    break;
                case error.POSITION_UNAVAILABLE:
                    locationStatus.innerHTML = "Location information is currently unavailable.";
                    break;
                case error.TIMEOUT:
                    locationStatus.innerHTML = "The request to get location timed out.";
                    break;
                default:
                    locationStatus.innerHTML = "An unknown error occurred.";
                    break;
            }
        }
    }


    return (
        <form action={actionPositionHandler} method="post">
            <input class={'sr-only'} id={'lat'} name={'lat'} value={getPosition()?.[0]}/>
            <input class={'sr-only'} id={'lon'} name={'lon'} value={getPosition()?.[1]}/>
            <Show
                fallback={<Button<"button"> size={"icon"} variant={'outline'} onClick={trackLocation}><p id="locationStatus"/></Button>}
                when={!getPosition()}>
                <Button<"button"> size={"icon"} variant={'outline'} onClick={trackLocation}><p id="locationStatus"><MapPin class={"stroke-red-4 size-6"}/></p></Button>
            </Show>

            <div id="map"></div>

        </form>
    );
};

export default Geolocation;

export const mapPin = (`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>`)