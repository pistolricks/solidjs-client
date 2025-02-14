import {Component, createEffect, createSelector, createSignal, For, onMount, Show} from "solid-js";
import {CONTENT, ContentsData} from "~/lib/store";
import {ByteWithLocale} from "~/components/ui/format-byte";
import {ResponsiveDialog} from "~/components/ui/dialogs/responsive-dialog";
import DrawerPrimitive from "@corvu/drawer";
import Dialog from "@corvu/dialog";
import {Button} from "~/components/ui/button";
import {XMark} from "~/components/svg";

type PROPS = {
    contents: ContentsData | undefined;
}
/* TODO: NEED TO SETUP STATIC FILE SERVER ON GO PROJECT */
const ContentsList: Component<PROPS> = props => {
    const contents = () => props.contents;

    const [isDesktop, setIsDesktop] = createSignal(false)
    const [getContents, setContents] = createSignal(contents()?.contents)

    createEffect(() => {
        setContents(() => contents()?.contents)
        console.log(contents())
        console.log(getContents())
    })

    const [getSelectedId, setSelectedId] = createSignal<string>()
    const [getSelected, setSelected] = createSignal<CONTENT>()
    const isSelected = createSelector(getSelectedId)

    const handler = (data: CONTENT, event: Event) => {
        console.log("Data:", data, "Event:", event);
        setSelectedId(data.id)
        if (isSelected(data.id)) {
            setSelected(data)
        }

    };


    onMount(() => {
        setIsDesktop(window.innerWidth >= 768)
    })

    const MobileDialogContent = () => {
        return (
            <DrawerPrimitive.Content contextId={'dd1'}>
                <img
                    src={`http://localhost:4000/${getSelected()?.src}`}
                    alt=""
                    class="pointer-events-none h-full w-full object-contain group-hover:opacity-75"/>
                <DrawerPrimitive.Description contextId={'dd1'}>
                    Make changes to your profile here. Click save when you're done.
                </DrawerPrimitive.Description>

                <DrawerPrimitive.Close contextId={'dd1'} as={Button<"button">} variant="outline">
                    Cancel
                </DrawerPrimitive.Close>
            </DrawerPrimitive.Content>
        )
    }

    const GridImage = (props: {
        content: CONTENT
    }) => {

        const content = () => props.content;

        return (
            <>
                <div
                    class="group overflow-hidden rounded-lg focus-within:ring-2 focus-within:ring-blue-5 focus-within:ring-offset-2 focus-within:ring-offset-gray-1">
                    <img
                        src={`http://localhost:4000/${content().src}`}
                        alt=""
                        class="pointer-events-none aspect-[1/1] w-full object-cover group-hover:opacity-75"/>
                    <button type="button" class="absolute inset-0 focus:outline-none">
                        <span class="sr-only">{content().original}</span>
                    </button>
                </div>
                <p class="pointer-events-none mt-3 block truncate text-sm font-medium text-gray-11">{content().original}</p>
                <div class={'flex justify-between items-center text-accent'}>
                    <span class={'text-xs py-1'}>{content().type}</span>
                    <ByteWithLocale value={content().size}/>
                </div>
            </>
        )
    }

    return (
        <ResponsiveDialog isDesktop={isDesktop()}>
            <Show when={isDesktop()} fallback={<MobileDialogContent/>}>
                <Dialog.Content contextId={'dd1'} class="sm:max-w-[425px]">

                    <img src={`http://localhost:4000/${getSelected()?.src}`} alt=""
                         class="pointer-events-none h-full max-h-[78dvh] w-full object-contain group-hover:opacity-75"/>

                    <Dialog.Description contextId={'dd1'}>
                        <Dialog.Close contextId={'dd1'} as={Button<"button">}><XMark/></Dialog.Close>
                    </Dialog.Description>
                </Dialog.Content>
            </Show>
            <ul role="list"
                class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8 container">
                <For each={getContents()}>
                    {(content, i) => (
                        <Show when={isDesktop()} fallback={
                            <DrawerPrimitive.Trigger as={'li'} class={'relative'} contextId={'dd1'} onClick={[handler, content]}
                                            classList={{active: isSelected(content.id)}}>
                                <GridImage content={content}/>
                            </DrawerPrimitive.Trigger>
                        }>
                            <Dialog.Trigger as={'li'} class={'relative'} contextId={'dd1'} onClick={[handler, content]}
                                            classList={{active: isSelected(content.id)}}>
                                <GridImage content={content}/>
                            </Dialog.Trigger>
                        </Show>
                    )}
                </For>
            </ul>
        </ResponsiveDialog>
    );
};

export default ContentsList;