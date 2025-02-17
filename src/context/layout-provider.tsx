import {Accessor, createContext, createSignal, JSX, onMount, Setter, useContext} from "solid-js";

export type MenuItem = {
    title: string;
    href: string;
    description?: string;
    icon?: string;
}

type POSITION = [number, number]|undefined

type LayoutType = {
    getPosition: Accessor<POSITION>
    setPosition: Setter<POSITION>
    getHeight: Accessor<number>
    getIsDesktop: Accessor<boolean>
    menu: MenuItem[]
    apps: MenuItem[]
}

let headerHeight = import.meta.env.VITE_HEADER_HEIGHT
let footerHeight = import.meta.env.VITE_FOOTER_HEIGHT


export const LayoutContext = createContext<LayoutType>();
export function LayoutProvider(props: { children: JSX.Element }) {

    const [getPosition, setPosition] = createSignal<POSITION>(undefined)
    const [getHeight, setHeight] = createSignal(window.innerHeight)

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
        setHeight(() => window.innerHeight - (headerHeight) - (footerHeight))
        setIsDesktop(window.innerWidth >= 768)
    })

    return (
        <LayoutContext.Provider value={{
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