import type {ParentProps} from "solid-js"
import {createSignal, onMount, Show} from "solid-js"
import {Drawer} from "~/components/ui/drawer"

export function ResponsiveDrawer(props: ParentProps) {
    const [open, setOpen] = createSignal(false)
    const [isDesktop, setIsDesktop] = createSignal(false)

    const children = () => props.children;

    onMount(() => {
        setIsDesktop(window.innerWidth >= 768)
    })

    const MobileDrawer = () => (
        <Drawer breakPoints={[0.75]} dialogId="responsive-drawer-mobile" open={open()} onOpenChange={setOpen}>
            {children()}
        </Drawer>
    )

    return (
        <Show when={isDesktop()} fallback={<MobileDrawer/>}>
            <Drawer breakPoints={[0.75]} side={"right"} dialogId="responsive-drawer-desktop" open={open()}
                    onOpenChange={setOpen}>
                {children()}
            </Drawer>
        </Show>
    )
}
