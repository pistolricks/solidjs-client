import {createSignal, JSXElement, onMount, Show} from "solid-js"
import {Button} from "~/components/ui/button"

import DrawerPrimitive from "@corvu/drawer";
import Dialog from "@corvu/dialog";

type PROPS = {
    children?: JSXElement
}

export function ResponsiveDialog(props: PROPS) {
    const [open, setOpen] = createSignal(false)
    const [isDesktop, setIsDesktop] = createSignal(false)

    const children = () => props.children;

    onMount(() => {
        setIsDesktop(window.innerWidth >= 768)
    })

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