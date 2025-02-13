import {Component, JSXElement} from "solid-js";
import {Button} from "~/components/ui/button";
import {Sizes, Variants} from "~/lib/utils";

type PROPS = {
    title?: string|JSXElement
    class?: string;
    variant?: Variants;
    size?: Sizes;
    children?: JSXElement

}

const FooterMenu: Component<PROPS> = props => {

    const title = () => props.title ?? "Menu";
    const className = () => props.class ?? "uppercase";
    const variant = () => props.variant ?? "default";
    const size = () => props.size ?? "sm";
    const children = () => props.children;

    return (
        <footer class={'bg-gray-ui fixed inset-x-0  bottom-0 w-full p-2 rounded-none border-l border-t border-gray-normal'}>
                <div class="flex items-center justify-between w-full  space-x-2">
                    <Button class={className()} variant={variant()} size={size()}>{title()}</Button>
                    <div class="items-center flex">
                        {children()}
                    </div>
                </div>
        </footer>
    );
};

export default FooterMenu;