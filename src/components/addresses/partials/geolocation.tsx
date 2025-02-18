import {Component, createEffect, createSignal, onMount, Show} from "solid-js";
import {actionPositionHandler} from "~/lib/addresses";
import {useAction} from "@solidjs/router";
import {Button} from "~/components/ui/button";
import {MapPin, PositionIcon} from "~/components/svg";
import {showToast} from "~/components/ui/toast";
import {useLayoutContext} from "~/context/layout-provider";


type PROPS = {}
let watchID: number;
const Geolocation: Component<PROPS> = props => {
    const {getPosition, setPosition} = useLayoutContext();
    const submit = useAction(actionPositionHandler);
    const locationStatus = document.getElementById("locationStatus");
    const [getLocationAccess, setLocationAccess] = createSignal<"denied" | "granted" | "prompt">();
    const [getRef, setRef] = createSignal<HTMLFormElement | undefined>()



    createEffect(async() => {
        console.log('getPosition', getPosition())


        await navigator.permissions.query({ name: 'geolocation' }).then((permissionStatus) => {
            permissionStatus.onchange = () => {
                setLocationAccess(permissionStatus.state)
                if (permissionStatus.state) {

                }
            };
        });
        console.log(getLocationAccess())
    })

    async function trackLocation() {
        if (navigator.geolocation) {
            watchID = navigator.geolocation.watchPosition(showPosition, showError, {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            });
        } else {
            if (locationStatus) {
                showToast({
                    variant: "error",
                    title: "Error",
                    description: "Geolocation is not supported by your browser."
                })
            }
        }
    }
    async function showPosition(position: { coords: { latitude: number; longitude: number; }; }) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setPosition([latitude, longitude])
        const formData = new FormData(getRef());
        submit(formData).then((r) => console.log("action", r))

        const locationStatus = document.getElementById("locationStatus");
        if (locationStatus) {
            locationStatus.innerHTML = `${mapPin}`
        }
    }

    function clearPosition() {
        if (getPosition()) {
            navigator.geolocation.clearWatch(watchID);
        }
        setPosition([0,0])

        showToast({
            variant: "error",
            title: "Location Services",
            description: "Services have been turned off"
        })
    }


    function showError(error: any) {
        const locationStatus = document.getElementById("locationStatus");
        if (locationStatus) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    showToast({
                        variant: "error",
                        title: "Error",
                        description: "Access to location was denied."
                    })
                    break;
                case error.POSITION_UNAVAILABLE:
                    showToast({
                        variant: "error",
                        title: "Error",
                        description: "Location information is currently unavailable."
                    })
                    break;
                case error.TIMEOUT:
                    showToast({
                        variant: "error",
                        title: "Error",
                        description: "The request to get location timed out. You may need to refresh the page"
                    })
                    break;
                default:
                    showToast({
                        variant: "error",
                        title: "Error",
                        description: "An unknown error occurred."
                    })
                    break;
            }
        }
    }

onMount(async() => {
   await navigator.permissions.query({ name: 'geolocation' }).then((permissionStatus) => {
        setLocationAccess(permissionStatus.state)

        permissionStatus.onchange = () => {
            setLocationAccess(permissionStatus.state)
        };
    });
})


    return (
        <form ref={setRef} id={"geo-form"} action={actionPositionHandler} method="post">
            <input class={'sr-only'} id={'lat'} name={'lat'} type={'string'} value={getPosition()?.[0]}/>
            <input class={'sr-only'} id={'lon'} name={'lon'} type={'string'} value={getPosition()?.[1]}/>
                <Show
                    fallback={
                        <Button<"button"> size={"icon"} variant={'destructive'} onClick={trackLocation}>
                            <PositionIcon class={"p-1 fill-amber-1 stroke-red-11"}/>
                        </Button>
                    }
                    when={getPosition()}>
                    <Button<"button"> size={"icon"} variant={'success'} onClick={clearPosition}>
                        <MapPin class={"p-1 animate-pulse stroke-green-11"}/>
                    </Button>

                </Show>
        </form>
    );
};

export default Geolocation;

export const mapPin = (`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="stroke-green-11">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>`)