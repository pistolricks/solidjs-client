import {Component, createEffect, createMemo, createSignal, onCleanup, onMount, Show,} from "solid-js";
import {Map, View} from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import Feature from "ol/Feature.js";
import Geolocation from "ol/Geolocation.js";
import Point from "ol/geom/Point.js";
import VectorLayer from "ol/layer/Vector.js";
import VectorSource from "ol/source/Vector.js";
import CircleStyle from "ol/style/Circle.js";
import Fill from "ol/style/Fill.js";
import Stroke from "ol/style/Stroke.js";
import Style from "ol/style/Style.js";
import GeoJSON, {GeoJSONFeatureCollection} from "ol/format/GeoJSON.js";
import {useLayoutContext} from "~/context/layout-provider";
import Drawer from "@corvu/drawer";
import {useAction} from "@solidjs/router";
import {actionPositionHandler} from "~/lib/addresses";
import {MapPin} from "~/components/svg";
import List from "~/components/addresses/list";
import SearchForm from "~/components/ui/search-form";
import { cn } from "~/lib/utils";

type PROPS = {
    featureCollection: GeoJSONFeatureCollection;
};

// Moved styles definition outside the component to avoid recreation on every render.
const styles = {
    Point: new Style({
        image: new CircleStyle({
            radius: 7,
            fill: new Fill({
                color: "rgba(255,0,0,0.2)",
            }),
            stroke: new Stroke({
                color: "red",
                width: 1,
            }),
        }),
    }),
    LineString: new Style({
        stroke: new Stroke({
            color: "green",
            width: 1,
        }),
    }),
    MultiLineString: new Style({
        stroke: new Stroke({
            color: "green",
            width: 1,
        }),
    }),
    MultiPoint: new Style({
        image: new CircleStyle({
            radius: 7,
            fill: new Fill({
                color: "rgba(255,0,0,0.2)",
            }),
            stroke: new Stroke({
                color: "red",
                width: 1,
            }),
        }),
    }),
    MultiPolygon: new Style({
        stroke: new Stroke({
            color: "yellow",
            width: 1,
        }),
        fill: new Fill({
            color: "rgba(255, 255, 0, 0.1)",
        }),
    }),
    Polygon: new Style({
        stroke: new Stroke({
            color: "blue",
            lineDash: [4],
            width: 3,
        }),
        fill: new Fill({
            color: "rgba(0, 0, 255, 0.1)",
        }),
    }),
    GeometryCollection: new Style({
        stroke: new Stroke({
            color: "magenta",
            width: 2,
        }),
        fill: new Fill({
            color: "magenta",
        }),
        image: new CircleStyle({
            radius: 10,
            stroke: new Stroke({
                color: "magenta",
            }),
        }),
    }),
    Circle: new Style({
        stroke: new Stroke({
            color: "red",
            width: 2,
        }),
        fill: new Fill({
            color: "rgba(255,0,0,0.2)",
        }),
    }),
};

const GeoMap: Component<PROPS> = (props) => {
    const {getHeight, setViewbox} = useLayoutContext();
    const {open, setOpen} = Drawer.useDialogContext('map1')

    const [getSelected, setSelected] = createSignal()
    const [getShowPosition, setShowPosition] = createSignal(false);
    const [getGeolocation, setGeolocation] = createSignal<Geolocation | undefined>();

    const [mapElement, setMapElement] = createSignal<HTMLDivElement | undefined>();

    const featureCollection = () => props.featureCollection;

    let map: Map | undefined;


    const [getMap, setMap] = createSignal(map)
    const submit = useAction(actionPositionHandler);


    // Memoized results for features
    const features = createMemo(() => {
        console.log(featureCollection())
        if (featureCollection()) {
            return new GeoJSON().readFeatures(featureCollection());
        }
        return [];
    });

    // Initialize and clean up the map
    onMount(() => {
        if (!mapElement()) return;

        const view = new View({
            center: [-118.249999, 34.0499998],
            zoom: 6,
            projection: "EPSG:4326",
        });

        map = new Map({
            target: mapElement(),
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
            ],
            view,
        });

        setMap(() => map)


        const geolocation = new Geolocation({
            trackingOptions: {
                enableHighAccuracy: true,
            },
            projection: view.getProjection(),
        });

        setGeolocation(geolocation);

        const accuracyFeature = new Feature();
        const positionFeature = new Feature();

        // Style the geolocation marker
        positionFeature.setStyle(
            new Style({
                image: new CircleStyle({
                    radius: 10,
                    fill: new Fill({
                        color: "#3399CC",
                    }),
                    stroke: new Stroke({
                        color: "#fff",
                        width: 2,
                    }),
                }),
            })
        );

        // Bind events for geolocation
        geolocation.on("change:accuracyGeometry", () => {
            const accuracy = geolocation.getAccuracyGeometry();
            if (accuracy) accuracyFeature.setGeometry(accuracy);
        });

        geolocation.on("change:position", () => {
            const coordinates = geolocation.getPosition();
            if (coordinates) {
                positionFeature.setGeometry(new Point(coordinates));
                view.animate({center: coordinates, duration: 1000, zoom: 12});
                const extent = view.calculateExtent();
                setViewbox(extent);

                let lat = coordinates[1];
                let lon = coordinates[0]

                const formData = new FormData();
                formData.append("lat", String(lat));
                formData.append("lon", String(lon));


                submit(formData).then(r => console.log(r))


            }
        });


        const vectorLayer = new VectorLayer({
            source: new VectorSource({
                features: [accuracyFeature, positionFeature],
            }),
        });


        map.addLayer(vectorLayer);


        createEffect(() => {

            setOpen(featureCollection()?.features?.length > 0)

            console.log(getMap(), getSelected())
            const styleFunction = function (feature: any) {
                return styles[feature?.getGeometry()?.getType() as keyof typeof styles];
            };
            // Attach features to the map
            if (features()?.length > 0) {
                const vectorSource = new VectorSource({
                    features: features(),
                });

                const vectorLayer = new VectorLayer({
                    source: vectorSource,
                    style: styleFunction
                });

                getMap()?.addLayer(vectorLayer);
            }

            getMap()?.on('singleclick', function (e: any) {
                if (getSelected() !== null) {

                }

                getMap()?.forEachFeatureAtPixel(e.pixel, function (f: any) {
                    setSelected(() => f)
                    console.log('f', f?.values_)


                    getMap()?.getView().animate({
                        duration: 1400,
                        center: f?.values_?.geometry?.flatCoordinates,
                        zoom: 12,
                    })
                });

            })

        })

        // Cleanup on component unmount
        onCleanup(() => {
            map?.dispose();
            geolocation.setTracking(false);
            map = undefined;
        });
    });


    const toggleGeolocation = (enabled: boolean) => {
        const geolocation = getGeolocation();
        if (geolocation) geolocation.setTracking(enabled);
        setShowPosition(enabled);
    };


    return (
        <div
            style={{
                height: getHeight() + 'px',
            }}
            class={'relative w-screen'}>
            <div ref={setMapElement} class={'absolute inset-0 w-full h-full'}/>

            <div class={'absolute right-5 top-5 z-30'}>
                <Show when={getShowPosition()}>
                    <button onClick={() => toggleGeolocation(false)}>
                        <MapPin class={'stroke-green-11 size-10'}/>

                    </button>
                </Show>
                <Show when={!getShowPosition()}>
                    <button onClick={() => toggleGeolocation(true)}>
                        <MapPin class={'stroke-red-11 size-10'}/>
                    </button>
                </Show>
            </div>

            <Drawer.Content
                contextId={'map1'}
                class={cn(
                "fixed inset-x-0 bottom-0 z-50 w-screen h-screen sm:max-w-md  mt-0 flex flex-col rounded-t-[10px] border bg-background after:absolute after:inset-x-0 after:top-full after:h-1/2 after:bg-inherit data-[transitioning]:transition-transform data-[transitioning]:duration-300 md:select-none",
            )}>
                <div class="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
                <SearchForm contextId={'map1'} class={'absolute inset-x-0 top-0 py-3 px-2.5'}/>
                <div
                    style={{
                        height: getHeight() + 'px',
                    }}
                    class={'relative mt-8'}
                >


                    <List places={featureCollection()}/>


                </div>
            </Drawer.Content>


        </div>
    );
};

export default GeoMap;