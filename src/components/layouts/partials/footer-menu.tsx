import {Component, JSXElement} from "solid-js";
import {Button} from "~/components/ui/button";
import {Sizes, Variants} from "~/lib/utils";

type PROPS = {
    title?: string|JSXElement
    titleClass?: string;
    variant?: Variants;
    size?: Sizes;
    sectionClass?: string;
    childClass?: string;
    children?: JSXElement

}

const FooterMenu: Component<PROPS> = props => {

    const title = () => props.title ?? "Menu";
    const titleClass = () => props.titleClass ?? "uppercase";
    const variant = () => props.variant ?? "default";
    const size = () => props.size ?? "sm";

    const sectionClass = () => props.sectionClass ?? "flex items-center justify-between w-full  space-x-2";
    const childClass = () => props.childClass ?? "items-center flex";
    const children = () => props.children;

    return (
        <footer class={'bg-gray-ui fixed inset-x-0  bottom-0 w-full p-2 rounded-none border-l border-t border-gray-normal'}>
                <div class={sectionClass()}>
                    <Button class={titleClass()} variant={variant()} size={size()}>{title()}</Button>
                    <div class={childClass()}>
                        {children()}
                    </div>
                </div>
        </footer>
    );
};

export default FooterMenu;