import {Component, createEffect, onCleanup, onMount} from "solid-js";
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


    onMount(() => {
        map = new Map({
            target: 'map',
            layers: [
                new TileLayer({
                    source: new OSM()
                })
            ],
            view: new View({
                center: [0, 0],
                zoom: 2
            })
        });
    });




    onCleanup(() => {
        // Perform cleanup for the map
        map.setTarget(undefined);
        // Add any additional cleanup here
    });

    let zoomOut = document.getElementById('ol-zoom-out');
    let zoomIn = document.getElementById('zoom-in')

    if(zoomOut)
    zoomOut.onclick = function () {
        const view = map.getView();
        const zoom = view.getZoom();
        if(zoom)
        view.setZoom(zoom - 1);
    };

    if(zoomIn)
    zoomIn.onclick = function () {
        const view = map.getView();
        const zoom = view.getZoom();
        if(zoom)
        view.setZoom(zoom + 1);
    };

    return (
        <>
            <div id="map" class="map"/>
        </>
    );
};

export default GeoMap;