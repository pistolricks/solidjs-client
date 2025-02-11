import {Component, JSXElement} from "solid-js";

type PROPS = {
    children?: JSXElement
}

const DetailsLayout: Component<PROPS> = props => {

    return (
        <div class="container flex justify-center text-center mx-auto p-4">
                {props.children}
        </div>
    );
};

export default DetailsLayout;