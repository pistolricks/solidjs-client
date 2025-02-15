import {Component, createSignal, onMount, ParentProps} from "solid-js";

type PROPS = ParentProps

const CategoryLayout: Component<PROPS> = props => {

    let headerHeight = import.meta.env.VITE_HEADER_HEIGHT
    let footerHeight = import.meta.env.VITE_FOOTER_HEIGHT

    const [getHeight, setHeight] = createSignal(window.innerHeight)

    onMount(() => {
        setHeight(() => window.innerHeight - (headerHeight) - (footerHeight))
    })

    return (

        <div style={{
            height: getHeight() + 'px'
        }} class="relative container mx-auto p-4 scrollbar-hide">
            {props.children}
        </div>

    );
};

export default CategoryLayout;