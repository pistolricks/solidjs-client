import {createSignal, JSXElement, Show} from "solid-js"

import DrawerPrimitive from "@corvu/drawer";
import Dialog from "@corvu/dialog";

type PROPS = {
    isDesktop: boolean;
    children?: JSXElement
}

export function ResponsiveDialog(props: PROPS) {
    const [open, setOpen] = createSignal(false)
    const isDesktop = () => props.isDesktop;

    const children = () => props.children;


    const MobileDialog = () => (
        <DrawerPrimitive contextId={'dd1'} open={open()} onOpenChange={setOpen}>
            {children()}
        </DrawerPrimitive>
    )

    return (
        <Show when={isDesktop()} fallback={<MobileDialog/>}>
            <Dialog contextId={'dd1'} open={open()} onOpenChange={setOpen}>
                {children()}
            </Dialog>
        </Show>
    )
}