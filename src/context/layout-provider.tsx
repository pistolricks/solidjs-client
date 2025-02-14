import {Accessor, createContext, createSignal, JSX, onMount, useContext} from "solid-js";

export type MenuItem = {
    title: string;
    href: string;
    description?: string;
    icon?: string;
}

type LayoutType = {
    getIsDesktop: Accessor<boolean>
    menu: MenuItem[]
    apps: MenuItem[]
}

export const LayoutContext = createContext<LayoutType>();
export function LayoutProvider(props: { children: JSX.Element }) {
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
        setIsDesktop(window.innerWidth >= 768)
    })

    return (
        <LayoutContext.Provider value={{
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