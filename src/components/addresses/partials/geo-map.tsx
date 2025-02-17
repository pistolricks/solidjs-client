import {Component, onCleanup, onMount} from "solid-js";
import {Map, View} from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

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