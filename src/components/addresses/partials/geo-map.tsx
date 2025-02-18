import {Component, createEffect, createMemo, createSignal, onCleanup, onMount, Show} from "solid-js";
import {Map, Overlay, View} from "ol";
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
import {mapPin, MapPin, PositionIcon} from "~/components/svg";
import {useLayoutContext} from "~/context/layout-provider";
import {toLonLat} from 'ol/proj';
import {actionPositionHandler} from "~/lib/addresses";
import {useAction} from "@solidjs/router";
import {GeoJSONFeatureCollection} from "ol/format/GeoJSON";
import GeoJSON from 'ol/format/GeoJSON.js';
import {Circle} from "ol/style";
import Drawer from "@corvu/drawer";
import Link from 'ol/interaction/Link';
import ol from "ol/dist/ol";

type PROPS = {
    results: GeoJSONFeatureCollection
}

const GeoMap: Component<PROPS> = props => {
    const {getHeight, getPosition, setPosition, getViewbox, setViewbox} = useLayoutContext();
    const {open, setOpen} = Drawer.useDialogContext('map1')

    const [getSelected, setSelected] = createSignal()

    const selected = createMemo<any>(() => {
        console.log('s', getSelected())
        return getSelected()
    })

    const results = () => props.results;

    const submit = useAction(actionPositionHandler);
    const [getRef, setRef] = createSignal<HTMLFormElement | undefined>()


    const image = new CircleStyle({
        radius: 7,
        fill: new Fill({
            color: 'rgba(255,0,0,0.2)',
        }),
        stroke: new Stroke({color: 'red', width: 1}),
    });

    const styles = {
        'Point': new Style({
            image: image,
        }),
        'LineString': new Style({
            stroke: new Stroke({
                color: 'green',
                width: 1,
            }),
        }),
        'MultiLineString': new Style({
            stroke: new Stroke({
                color: 'green',
                width: 1,
            }),
        }),
        'MultiPoint': new Style({
            image: image,
        }),
        'MultiPolygon': new Style({
            stroke: new Stroke({
                color: 'yellow',
                width: 1,
            }),
            fill: new Fill({
                color: 'rgba(255, 255, 0, 0.1)',
            }),
        }),
        'Polygon': new Style({
            stroke: new Stroke({
                color: 'blue',
                lineDash: [4],
                width: 3,
            }),
            fill: new Fill({
                color: 'rgba(0, 0, 255, 0.1)',
            }),
        }),
        'GeometryCollection': new Style({
            stroke: new Stroke({
                color: 'magenta',
                width: 2,
            }),
            fill: new Fill({
                color: 'magenta',
            }),
            image: new CircleStyle({
                radius: 10,
                fill: undefined,
                stroke: new Stroke({
                    color: 'magenta',
                }),
            }),
        }),
        'Circle': new Style({
            stroke: new Stroke({
                color: 'red',
                width: 2,
            }),
            fill: new Fill({
                color: 'rgba(255,0,0,0.2)',
            }),
        }),
    };

    const view = new View({
        center: [0, 0],
        zoom: 2,
        projection: 'EPSG:4326',
    })

    const [getShowPosition, setShowPosition] = createSignal(false)

    const [getGeolocation, setGeolocation] = createSignal<Geolocation | undefined>()
    let map: Map;


    const features = createMemo(() => {
        if (results()) {
            return new GeoJSON()?.readFeatures(results())
        }
    })


    onMount(async () => {

        map = new Map({
            target: 'map',
            layers: [
                new TileLayer({
                    source: new OSM()
                }),
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


                console.log("coordinates", coordinates)

                // let lonLat = toLonLat(coordinates)

                let position = {
                    coords: {
                        latitude: coordinates[1],
                        longitude: coordinates[0]
                    }
                }


                map.getView().animate({
                    duration: 1400,
                    center: coordinates,
                    zoom: 12,
                })

                const extent = map.getView().calculateExtent();

                setViewbox(extent)

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

        console.log(selected())


        console.log('results-map', results())
        console.log('getShowPosition', getShowPosition())
        console.log(geolocation(), geolocation())

        console.log('getItemRef', getSelected())


        const styleFunction = function (feature: any) {
            return styles[feature?.getGeometry()?.getType() as keyof typeof styles];
        };


        if (results()) {


            const vectorSource = new VectorSource({
                features: features()

            });


            vectorSource.addFeature(new Feature(new Circle({
                    radius: 6,
                    fill: new Fill({
                        color: '#3399CC',
                    }),
                    stroke: new Stroke({
                        color: '#fff',
                        width: 2,
                    }),
                }),
            ));


            const vectorLayer = new VectorLayer({
                source: vectorSource,
                style: styleFunction,

            })


            const status = document.getElementById('status') as HTMLElement | null;

            map.on('singleclick', function (e: any) {
                setOpen(true)
                if (selected() !== null) {

                }

                map.forEachFeatureAtPixel(e.pixel, function (f: any) {
                    setSelected(() => f)
                    f.setStyle(styleFunction);
                    console.log('f', f?.values_)



                    map.getView().animate({
                        duration: 1400,
                        center: f?.values_?.geometry?.flatCoordinates,
                        zoom: 12,
                    })

                    return true;
                });

                if (status) {
                    if (selected()) {
                        status.innerHTML = selected()?.values_?.loc
                    } else {
                        status.innerHTML = '&nbsp;';
                    }
                }
            });


            map.addLayer(vectorLayer)
          /*  map.addInteraction(new Link()) */

        }
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
                top: 110 + 'px',
                bottom: 64 + 'px'
            }}
            class={'fixed inset-0'}>
            <div
                style={{
                    height: getHeight() + 'px',
                    width: '100%'
                }}
                id="map" class="map"/>

            <span id="status">&nbsp;</span>



            <form
                ref={setRef}
                class={'absolute bottom-0 right-0 z-50'} action={actionPositionHandler}
                method="post">
                <input class={'sr-only'} id={'lat'} name={'lat'} type={'text'} value={getPosition()?.[0]}/>
                <input class={'sr-only'} id={'lon'} name={'lon'} type={'text'} value={getPosition()?.[1]}/>

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


