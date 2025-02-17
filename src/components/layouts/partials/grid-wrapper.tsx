import {Component, ParentProps} from "solid-js";
import {useLayoutContext} from "~/context/layout-provider";

type PROPS = ParentProps

const GridWrapper: Component<PROPS> = props => {
    const {getHeight} = useLayoutContext();
    const children = () => props.children;


    return (
        <ul
            style={{
                height: getHeight() + 'px'
            }}
            role="list"
            class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8 p-4 overflow-y-auto scrollbar-hide container">
            {children()}
        </ul>
    );
};

export default GridWrapper;