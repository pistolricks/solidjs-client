import {Component, ParentProps} from "solid-js";
import {useLayoutContext} from "~/context/layout-provider";

type PROPS = ParentProps

const ListWrapper: Component<PROPS> = props => {
    const {getHeight} = useLayoutContext();
    const children = () => props.children;


    return (
        <ul
            style={{
                height: getHeight() + 'px'
            }}
            role="list"
            class="overflow-y-auto scrollbar-hide container p-4"
        >
            {children()}
        </ul>
    );
};

export default ListWrapper;