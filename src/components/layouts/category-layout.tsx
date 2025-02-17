import {Component, ParentProps} from "solid-js";
import {useLayoutContext} from "~/context/layout-provider";

type PROPS = ParentProps

const CategoryLayout: Component<PROPS> = props => {

    const {getHeight} = useLayoutContext();

    return (

        <div style={{
            height: getHeight() + 'px'
        }} class="relative container mx-auto overflow-hide">
            {props.children}
        </div>

    );
};

export default CategoryLayout;