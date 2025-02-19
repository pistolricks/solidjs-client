import {Accessor, createContext, createSignal, JSX, onMount, Setter, useContext} from "solid-js";
import {Coordinate} from "ol/coordinate";
import {Feature} from "~/lib/store";

import {createStore, SetStoreFunction, Store} from "solid-js/store";
import {GeoJSONFeatureCollection} from "ol/format/GeoJSON";
import {FeatureCollection} from "geojson";
import Point from "ol/geom/Point.js";


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
        {title: "addresses", href: "/addresses"},
        {title: "contents", href: "/contents"}
    ]

    const apps: MenuItem[] = [
        {title: "messages", href: "/messages"},
        {title: "friends", href: "/friends"},
        {title: "tasks", href: "/task"},
        {title: "notifications", href: "/notification"}
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