import type {Component, ComponentProps, JSX, ValidComponent} from "solid-js"
import {splitProps} from "solid-js"

import type {
    ContentProps,
    DescriptionProps,
    DynamicProps,
    LabelProps,
    OverlayProps
} from "@corvu/drawer"
import DrawerPrimitive from "@corvu/drawer"

import {cn} from "~/lib/utils"

const Drawer = DrawerPrimitive

const DrawerTrigger = DrawerPrimitive.Trigger

const DrawerPortal = DrawerPrimitive.Portal

const DrawerClose = DrawerPrimitive.Close

type DrawerOverlayProps<T extends ValidComponent = "div"> = OverlayProps<T> & { contextId?: string, class?: string }

const DrawerOverlay = <T extends ValidComponent = "div">(
    props: DynamicProps<T, DrawerOverlayProps<T>>
) => {
    const [, rest] = splitProps(props as DrawerOverlayProps, ["contextId", "class"])
    const drawerContext = DrawerPrimitive.useContext()
    return (
        <DrawerPrimitive.Overlay
            contextId={props.contextId}
            class={cn(
                "fixed inset-0 z-50 data-[transitioning]:transition-colors data-[transitioning]:duration-300",
                props.class
            )}
            style={{
                "background-color": `rgb(0 0 0 / ${0.8 * drawerContext.openPercentage()})`
            }}
            {...rest}
        />
    )
}

type DrawerContentProps<T extends ValidComponent = "div"> = ContentProps<T> & {
    contextId?: string
    class?: string
    children?: JSX.Element
}

const DrawerContent = <T extends ValidComponent = "div">(
    props: DynamicProps<T, DrawerContentProps<T>>
) => {
    const [, rest] = splitProps(props as DrawerContentProps, ["contextId", "class", "children"])
    return (
        <DrawerPortal>
            <DrawerOverlay/>
            <DrawerPrimitive.Content
                contextId={props.contextId}
                class={cn(
                    "fixed right-0 bottom-0 z-50 w-screen md:max-w-lg mt-24 md:mt-0 flex h-auto flex-col rounded-t-[10px] md:rounded-none border bg-background after:absolute after:inset-x-0 after:top-full after:h-1/2 after:bg-inherit data-[transitioning]:transition-transform data-[transitioning]:duration-300 md:select-none",
                    props.class
                )}
                {...rest}
            >
                <div class="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted"/>
                {props.children}
            </DrawerPrimitive.Content>
        </DrawerPortal>
    )
}

const DrawerHeader: Component<ComponentProps<"div">> = (props) => {
    const [, rest] = splitProps(props, ["class" ])
    return <div class={cn("grid gap-1.5 p-4 text-center sm:text-left", props.class)} {...rest} />
}

const DrawerFooter: Component<ComponentProps<"div">> = (props) => {
    const [, rest] = splitProps(props, ["class"])
    return <div class={cn("t-auto flex flex-col gap-2 p-4", props.class)} {...rest} />
}

type DrawerTitleProps<T extends ValidComponent = "div"> = LabelProps<T> & { contextId?: string, class?: string }

const DrawerTitle = <T extends ValidComponent = "div">(
    props: DynamicProps<T, DrawerTitleProps<T>>
) => {
    const [, rest] = splitProps(props as DrawerTitleProps, ["contextId", "class"])
    return (
        <DrawerPrimitive.Label
            contextId={props.contextId}
            class={cn("text-lg font-semibold leading-none tracking-tight", props.class)}
            {...rest}
        />
    )
}

type DrawerDescriptionProps<T extends ValidComponent = "div"> = DescriptionProps<T> & {
    contextId?: string,
    class?: string
}

const DrawerDescription = <T extends ValidComponent = "div">(
    props: DynamicProps<T, DrawerDescriptionProps<T>>
) => {
    const [, rest] = splitProps(props as DrawerDescriptionProps, ["contextId", "class"])
    return (
        <DrawerPrimitive.Description
            contextId={props.contextId}
            class={cn("text-sm text-muted-foreground", props.class)}
            {...rest}
        />
    )
}

export {
    Drawer,
    DrawerPortal,
    DrawerOverlay,
    DrawerTrigger,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerFooter,
    DrawerTitle,
    DrawerDescription
}
