import {Component, JSXElement} from "solid-js";
import {Button} from "~/components/ui/button";

type PROPS = {
    title?: string
    children?: JSXElement
}

const FooterMenu: Component<PROPS> = props => {

    const title = () => props.title ?? "Menu";

    const children = () => props.children;

    return (
        <footer class={'bg-gray-ui fixed inset-x-0 bottom-0 w-full rounded-none border-l border-t border-gray-normal'}>
                <div class="py-2 flex items-center justify-between px-2">
                    <Button class={'uppercase'} variant={'default'} size={'sm'}>{title()}</Button>
                    <div class="space-x-2">
                        {children()}
                    </div>
                </div>
        </footer>
    );
};

export default FooterMenu;