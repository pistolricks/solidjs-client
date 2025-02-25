import {Accessor, createContext, createSignal, JSX, onMount, Setter, useContext} from "solid-js";
import {Coordinate} from "ol/coordinate";
import {Feature} from "~/lib/store";

import {createStore, SetStoreFunction, Store} from "solid-js/store";
import {GeoJSONFeatureCollection} from "ol/format/GeoJSON";
import {FeatureCollection} from "geojson";
import Point from "ol/geom/Point.js";
import {mapPin} from "~/components/svg";


export type MenuItem = {
    title: string;
    href: string;
    description?: string;
    icon?: string;
}

type POSITION = [number, number]|undefined

type LayoutType = {
    getStoreCollection: Store<FeatureCollection>
    setStoreCollection: SetStoreFunction<FeatureCollection>
    getViewbox: Accessor<number[]|undefined>
    setViewbox: Setter<number[]|undefined>
    getMyLocation: Accessor<Feature|undefined>
    setMyLocation: Setter<Feature|undefined>
    getPosition: Accessor<POSITION>
    setPosition: Setter<POSITION>
    getHeight: Accessor<number>
    getIsDesktop: Accessor<boolean>
    getQuery: Accessor<string>
    setQuery: Setter<string>
    menu: MenuItem[]
    apps: MenuItem[]
}

let headerHeight = import.meta.env.VITE_HEADER_HEIGHT
let footerHeight = import.meta.env.VITE_FOOTER_HEIGHT


export const LayoutContext = createContext<LayoutType>();
export function LayoutProvider(props: { children: JSX.Element }) {



    const [getStoreCollection, setStoreCollection] = createStore<FeatureCollection>({
        type: "FeatureCollection",
        features: []
    })


        const [getPosition, setPosition] = createSignal<POSITION>(undefined)
    const [getMyLocation, setMyLocation] = createSignal<Feature|undefined>(undefined)
    const [getViewbox, setViewbox] = createSignal<number[]|undefined>(undefined)
    const [getHeight, setHeight] = createSignal(0)
    const [getQuery, setQuery] = createSignal("")

    const handleHeight = () => {
        setHeight(() => window.innerHeight - (headerHeight) - (footerHeight))
        setIsDesktop(window.innerWidth >= 726)

        console.log('height', getHeight())
    }

    const [getIsDesktop, setIsDesktop] = createSignal(false)



    const menu: MenuItem[] = [
        {title: "vendors", href: "/vendors"},
        {title: "places", href: "/places", icon: mapPin},
        {title: "contents", href: "/contents"},
        {title: "categories", href: "/categories"}
    ]

    const apps: MenuItem[] = [
        {title: "beauty", href: "categories/beauty"},
        {title: "car wash", href: "categories/car-wash"},
        {title: "cleaning", href: "categories/cleaning"},
        {title: "entertainment", href: "categories/entertainment"},
        {title: "handyman", href: "categories/handyman"},
        {title: "homemade food", href: "categories/homemade-food"},
    ]


    onMount(() => {

        handleHeight();


    })

    return (
        <LayoutContext.Provider value={{
            getStoreCollection,
            setStoreCollection,
            getQuery,
            setQuery,
            getViewbox,
            setViewbox,
            getMyLocation,
            setMyLocation,
            getPosition,
            setPosition,
            getHeight,
            getIsDesktop,
            menu,
            apps,
        }}>
            {props.children}
        </LayoutContext.Provider>
    );
}

export function useLayoutContext() {
    return useContext(LayoutContext)!
}