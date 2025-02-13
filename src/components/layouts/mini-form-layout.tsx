import {Component, JSXElement} from "solid-js";

type PROPS = {
    title?: string
    imageSrc?: string
    children?: JSXElement
}

const FormLayout: Component<PROPS> = props => {

    const title = () => props.title ?? '';

    return (
        <div class="absolute bottom-0 w-full flex flex-col justify-center px-6 py-12 lg:px-8">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                {props.children}
            </div>
        </div>
    );
};

export default FormLayout;