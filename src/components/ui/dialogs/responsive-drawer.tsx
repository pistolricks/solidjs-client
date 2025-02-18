import type {ParentProps} from "solid-js"
import {createSignal, onMount, Show} from "solid-js"
import {Drawer} from "~/components/ui/drawer"
import DrawerPrimitive from "@corvu/drawer";

export function ResponsiveDrawer(props: ParentProps & { contentId?: string, side?: 'top' | 'right' | 'bottom' | 'left' }) {
    const [open, setOpen] = createSignal(false)
    const [isDesktop, setIsDesktop] = createSignal(false)

    const side = () => props.side ?? 'right'
    const contextId = () => props.contentId ?? 'rmd1'

    const children = () => props.children;

    onMount(() => {
        setIsDesktop(window.innerWidth >= 768)
    })

    const MobileDrawer = () => (
        <DrawerPrimitive contextId={contextId()} breakPoints={[0.75]} defaultSnapPoint={0.25} dialogId="responsive-drawer-mobile" open={open()} onOpenChange={setOpen}>
            {children()}
        </DrawerPrimitive>
    )

    return (
        <Show when={isDesktop()} fallback={<MobileDrawer/>}>
            <DrawerPrimitive contextId={contextId()} breakPoints={[0.4]} side={side()} dialogId="responsive-drawer-desktop" open={open()} onOpenChange={setOpen}>
                {children()}
            </DrawerPrimitive>
        </Show>
    )
}
