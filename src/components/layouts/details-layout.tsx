import {Component, JSXElement} from "solid-js";

type PROPS = {
    children?: JSXElement
}

const DetailsLayout: Component<PROPS> = props => {

    return (
        <main class="container flex justify-center text-center mx-auto p-4">
                {props.children}
        </main>
    );
};

export default DetailsLayout;