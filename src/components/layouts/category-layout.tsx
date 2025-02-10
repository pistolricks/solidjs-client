import {Component, ParentProps} from "solid-js";

type PROPS = ParentProps

const CategoryLayout: Component<PROPS> = props => {

    return (

        <main class="container mx-auto p-4 h-[88dvh] overflow-y-auto scrollbar-hide">
            {props.children}
        </main>

    );
};

export default CategoryLayout;