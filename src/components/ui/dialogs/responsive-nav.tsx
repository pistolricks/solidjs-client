import {Component, createSignal, For, ParentProps, Show} from "solid-js"

import {useLayoutContext} from "~/context/layout-provider";

import {MenuItem} from "~/components/layouts/partials/side-nav-menu";

import Drawer from "@corvu/drawer";
import Popover from "@corvu/popover";
import {A} from "@solidjs/router";



type PROPS = ParentProps & { title: string }

const ResponsiveNav: Component<PROPS> = props => {
    const {menu, getIsDesktop} = useLayoutContext()
    const [open, setOpen] = createSignal(false)


    const title = () => props.title;

    const children = () => props.children;

    return (

            <Popover
                floatingOptions={{
                    offset: 19,
                    flip: true,
                    shift: true,
                }}
            >
                <Popover.Trigger class="rounded-full bg-corvu-100 transition-all duration-100 hover:bg-corvu-200 active:translate-y-0.5">
                    {children()}
                    <span class="sr-only">{title()}</span>
                </Popover.Trigger>
                <Popover.Portal>
                    <Popover.Content class="z-50 ml-2 rounded-md bg-slate-2 px-3 py-2 shadow-md data-open:animate-in data-open:fade-in-50% data-open:slide-in-from-top-1 data-closed:animate-out data-closed:fade-out-50% data-closed:slide-out-to-top-1">
                    <ul class="relative">
                                <For each={menu}>
                                    {(item) => (
                                        <Show when={title() !== item?.title}>
                                        <li class="px-3">
                                            <A href={item?.href} class="block p-2 hover:text-amber-dim uppercase">{item.title}</A>
                                        </li>
                                        </Show>
                                    )}
                                </For>
                        </ul>

                    </Popover.Content>
                </Popover.Portal>
            </Popover>

    )
}

export default ResponsiveNav