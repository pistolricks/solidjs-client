import {Component, ParentProps} from "solid-js";

type PROPS = ParentProps

const CategoryLayout: Component<PROPS> = props => {

    return (

        <div class="container mx-auto p-4 h-[80dvh] overflow-y-auto scrollbar-hide">
            {props.children}
        </div>

    );
};

export default CategoryLayout;