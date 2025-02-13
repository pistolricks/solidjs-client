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
            <h2 class="text-center text-xl/9 tracking-tight text-gray-11 uppercase">
                {title()}
            </h2>
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                {props.children}
            </div>
        </div>
    );
};

export default FormLayout;