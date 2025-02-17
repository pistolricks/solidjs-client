import {Component, createEffect, createSelector, createSignal, For, onMount, Show} from "solid-js";
import {CONTENT, ContentsData} from "~/lib/store";
import {ByteWithLocale} from "~/components/ui/format-byte";
import {ResponsiveDialog} from "~/components/ui/dialogs/responsive-dialog";
import DrawerPrimitive from "@corvu/drawer";
import Dialog from "@corvu/dialog";
import {Button} from "~/components/ui/button";
import {XMark} from "~/components/svg";
import {useLayoutContext} from "~/context/layout-provider";
import GridWrapper from "~/components/layouts/partials/grid-wrapper";

type PROPS = {
    contents: ContentsData | undefined;
}

const ContentsList: Component<PROPS> = props => {
    const {getIsDesktop, getHeight} = useLayoutContext()
    const contents = () => props.contents;
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


    const MobileDialogContent = () => {
        return (
            <DrawerPrimitive.Content contextId={'dd1'}>
                <img
                    src={`http://localhost:4000/${getSelected()?.src}`}
                    alt=""
                    class="pointer-events-none h-full max-h-[90dvh] w-full object-contain group-hover:opacity-75"/>
                <DrawerPrimitive.Description class={'p-4 text-pretty'} contextId={'dd1'}>
                    {getSelected()?.original}
                </DrawerPrimitive.Description>

                <div class={'flex justify-end items-center p-1'}>
                    <DrawerPrimitive.Close contextId={'dd1'} as={Button<"button">} size={'icon'}
                                           variant="outline">
                        <XMark/>
                    </DrawerPrimitive.Close>
                </div>
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
                        class="pointer-events-none aspect-[1/1] w-full object-cover group-hover:opacity-75 rounded-sm"/>
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
        <ResponsiveDialog isDesktop={getIsDesktop()}>
            <Show when={getIsDesktop()} fallback={<MobileDialogContent/>}>
                <Dialog.Content contextId={'dd1'} class="sm:max-w-[425px]">

                    <img src={`http://localhost:4000/${getSelected()?.src}`} alt=""
                         class="pointer-events-none h-full max-h-[78dvh] w-full object-contain group-hover:opacity-75 rounded-sm"/>

                    <Dialog.Description contextId={'dd1'}>
                        <Dialog.Close contextId={'dd1'} as={Button<"button">} size={'icon'}><XMark
                            class={'stroke-sky-8 fill-sky-4'}/></Dialog.Close>
                    </Dialog.Description>
                </Dialog.Content>
            </Show>

            <GridWrapper>
                <For each={getContents()}>
                    {(content, i) => (
                        <Show when={getIsDesktop()} fallback={
                            <DrawerPrimitive.Trigger as={'li'} class={'relative'} contextId={'dd1'}
                                                     onClick={[handler, content]}
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
            </GridWrapper>
        </ResponsiveDialog>
    );
};

export default ContentsList;