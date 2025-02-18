import {Component, createEffect, createMemo, createSignal, onCleanup, onMount, Show} from "solid-js";
import {Map, View} from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import Feature from 'ol/Feature.js';
import Geolocation from 'ol/Geolocation.js';
import Point from 'ol/geom/Point.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import CircleStyle from 'ol/style/Circle.js';
import Fill from 'ol/style/Fill.js';
import Stroke from 'ol/style/Stroke.js';
import Style from 'ol/style/Style.js';
import {Button} from "~/components/ui/button";
import {PositionIcon} from "~/components/svg";
import {useLayoutContext} from "~/context/layout-provider";
import {toLonLat} from 'ol/proj';
import {actionPositionHandler} from "~/lib/addresses";
import {useAction} from "@solidjs/router";

type PROPS = {}

const GeoMap: Component<PROPS> = props => {
    const {getHeight, getPosition, setPosition, setMyLocation} = useLayoutContext();

    const submit = useAction(actionPositionHandler);
    const [getRef, setRef] = createSignal<HTMLFormElement | undefined>()


    const view = new View({
        center: [0, 0],
        zoom: 2,
    })

    const [getShowPosition, setShowPosition] = createSignal(false)

    const [getGeolocation, setGeolocation] = createSignal<Geolocation | undefined>()
    let map: Map;


    onMount(async () => {
        map = new Map({
            target: 'map',
            layers: [
                new TileLayer({
                    source: new OSM()
                })
            ],
            view: view,
        });


    });

    const geolocation = createMemo(() => {
        const geolocation = new Geolocation({
            // enableHighAccuracy must be set to true to have the heading value.
            trackingOptions: {
                enableHighAccuracy: true,
            },
            projection: view.getProjection(),
        });

        setGeolocation(geolocation)

        console.log(getGeolocation())

        console.log(getShowPosition())

        getGeolocation()?.setTracking(getShowPosition());

        const accuracyFeature = new Feature();
        getGeolocation()?.on('change:accuracyGeometry', function () {
            let acc = getGeolocation()?.getAccuracyGeometry();
            if (acc)
                accuracyFeature.setGeometry(acc);
        });

        const positionFeature = new Feature();
        positionFeature.setStyle(
            new Style({
                image: new CircleStyle({
                    radius: 6,
                    fill: new Fill({
                        color: '#3399CC',
                    }),
                    stroke: new Stroke({
                        color: '#fff',
                        width: 2,
                    }),
                }),
            }),
        );


        getGeolocation()?.on('change:position', function () {
            if (!getGeolocation()?.getPosition()) {
                return;
            }
            const coordinates = getGeolocation()?.getPosition();
            if (coordinates) {
                console.log('coordinates', coordinates)

                positionFeature.setGeometry(new Point(coordinates));

                console.log(toLonLat(coordinates))

                let lonLat = toLonLat(coordinates)

                let position = {
                    coords: {
                        latitude: lonLat[1],
                        longitude: lonLat[0]
                    }
                }

                map.getView().animate({
                    duration: 1400,
                    center: coordinates,
                    zoom: 12
                })

                showPosition(position).then((r: any) => console.log(r?.results))
            }
        });

        getGeolocation()?.on('change', function () {
            console.log(getGeolocation()?.getAccuracy() + ' [m]');
            console.log(getGeolocation()?.getAltitude() + ' [m]');
            console.log(getGeolocation()?.getAltitudeAccuracy() + ' [m]');
            console.log(getGeolocation()?.getHeading() + ' [rad]');
        });


        new VectorLayer({
            map: map,
            source: new VectorSource({
                features: [accuracyFeature, positionFeature],
            }),
        });

        return getGeolocation();

    })

    const showPositionHandler = (show: boolean, event: Event) => {
        console.log(show)
        setShowPosition(show)

    };


    createEffect(() => {

        console.log('getShowPosition', getShowPosition())
        console.log(geolocation(), geolocation())


    })


    let zoomOut = document.getElementById('ol-zoom-out');
    let zoomIn = document.getElementById('zoom-in')

    if (zoomOut)
        zoomOut.onclick = function () {
            const view = map.getView();
            const zoom = view.getZoom();
            if (zoom)
                view.setZoom(zoom - 1);
        };

    if (zoomIn)
        zoomIn.onclick = function () {
            const view = map.getView();
            const zoom = view.getZoom();
            if (zoom)
                view.setZoom(zoom + 1);
        };

    const showPosition = async (position: { coords: { latitude: number; longitude: number; }; }) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setPosition([latitude, longitude])
        const formData = new FormData(getRef());
        submit(formData).then((r) => console.log("action", r))

    }


    onCleanup(() => {
        // Perform cleanup for the map
        map.setTarget(undefined);
        // Add any additional cleanup here
    });


    return (
        <div
            style={{
                height: getHeight() + 'px',
                top: 110 + 'px'
            }}
            class={'fixed inset-0'}>
            <div
                style={{
                    height: getHeight() + 'px',
                    width: '100%'
                }}
                id="map" class="map"/>


            <form
                ref={setRef}
                class={'absolute bottom-0 right-0 z-50 p-2'} action={actionPositionHandler}
                method="post">
                <input class={'sr-only'} id={'lat'} name={'lat'} type={'string'} value={getPosition()?.[0]}/>
                <input class={'sr-only'} id={'lon'} name={'lon'} type={'string'} value={getPosition()?.[1]}/>

                <Show
                    fallback={
                        <Button<"button"> size={"icon"} variant={'link'} onClick={[showPositionHandler, true]}>
                            <PositionIcon class={"p-1 fill-amber-1 stroke-red-11"}/>
                        </Button>
                    }
                    when={getShowPosition()}>
                    <Button<"button"> size={"icon"} variant={'link'} onClick={[showPositionHandler, false]}>
                        <PositionIcon class={"p-1 animate-pulse stroke-green-11"}/>
                    </Button>
                </Show>
            </form>
        </div>
    );
};

export default GeoMap;