import type {JSX, ValidComponent} from "solid-js"
import {splitProps} from "solid-js"

import * as ButtonPrimitive from "@kobalte/core/button"
import type {PolymorphicProps} from "@kobalte/core/polymorphic"

import {Bases, cn, Sizes, Variants} from "~/lib/utils"


export type ButtonProps<T extends ValidComponent = "button"> = ButtonPrimitive.ButtonRootProps<T> &
    { base?: Bases; variant?: Variants; size?: Sizes; class?: string | undefined; children?: JSX.Element }

const Button = <T extends ValidComponent = "button">(
    props: PolymorphicProps<T, ButtonProps<T>>
) => {
    const [local, others] = splitProps(props as ButtonProps, ["base", "variant", "size", "class"])
    const base = () => local.base ?? "default";
    const variant = () => local.variant ?? "default"
    const size = () => local.size ?? "default"
    const className = () => local.class ?? ""

    let bases = {
        default: "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium outline-offset-background transition-colors focus-visible:outline-hidden focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
        custom: className()
    }[base()]

    let variants = {
        default: "bg-gray-action text-gray-normal",
        secondary: "bg-slate-action text-slate-dim",
        outline: "bg-gray-ghost text-gray-dim border border-gray-normal",
        ghost: "bg-gray-ui text-gray-dim",
        information: "bg-sky-action text-sky-normal",
        success: "bg-mint-action text-mint-normal",
        destructive: "bg-red-action text-red-12",
        warning: "bg-amber-action text-amber-normal",
        link: "text-blue-action hover:underline"
    }[variant()];

    let sizes = {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3 text-xs",
        lg: "h-11 px-8",
        wd: "h-10 w-full px-4 py-2",
        icon: "size-10"
    }[size()]

    return (
        <ButtonPrimitive.Root class={cn(
            bases,
            variants,
            sizes,
            className()
        )}
                              {...others}
        >
            {props.children}
        </ButtonPrimitive.Root>
    );
}

export {Button}

