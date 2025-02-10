import {Component, JSXElement} from "solid-js";

type PROPS = {
    title?: string
    imageSrc?: string
    children?: JSXElement
}

const FormLayout: Component<PROPS> = props => {

    const title = () => props.title ?? '';
    const imageSrc = () => props.imageSrc ?? import.meta.env.VITE_APP_LOGO;

    return (
        <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                <img class="mx-auto h-10 w-auto"
                     src={imageSrc()} alt="logo"/>
                <h2 class="mt-10 text-center text-2xl/9 tracking-tight text-blue-11 uppercase">
                    {title()}
                </h2>
            </div>

            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                {props.children}
            </div>
        </div>
    );
};

export default FormLayout;