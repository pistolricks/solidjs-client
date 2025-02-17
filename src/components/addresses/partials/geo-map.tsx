import {Component, createEffect, createMemo, onCleanup, onMount} from "solid-js";
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

type PROPS = {}

const GeoMap: Component<PROPS> = props => {
    let map: Map;

    const view = createMemo(() => {
        return new View({
            center: [0, 0],
            zoom: 2,
        });
    })

    onMount(() => {
        map = new Map({
            target: 'map',
            layers: [
                new TileLayer({
                    source: new OSM()
                })
            ],
            view: view(),
        });
    });


    createEffect(() => {
        const geolocation = new Geolocation({
            // enableHighAccuracy must be set to true to have the heading value.
            trackingOptions: {
                enableHighAccuracy: true,
            },
            projection: view().getProjection(),
        });


        geolocation.setTracking(true);

// handle geolocation error.

        const accuracyFeature = new Feature();
        geolocation.on('change:accuracyGeometry', function () {
            let acc = geolocation.getAccuracyGeometry();
            if(acc)
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

        geolocation.on('change:position', function () {
            if (!geolocation.getPosition()) {
                return;
            }
                const coordinates = geolocation.getPosition();
            if(coordinates) {
                positionFeature.setGeometry(new Point(coordinates));
                }
        });

        new VectorLayer({
            map: map,
            source: new VectorSource({
                features: [accuracyFeature, positionFeature],
            }),
        });
    })

    onCleanup(() => {
        // Perform cleanup for the map
        map.setTarget(undefined);
        // Add any additional cleanup here
    });

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

    return (
        <>
            <div id="map" class="map"/>
        </>
    );
};

export default GeoMap;