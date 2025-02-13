import type { ComponentProps } from "solid-js"
import { createSignal, onMount, Show } from "solid-js"

import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "~/components/ui/dialog"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "~/components/ui/drawer"
import { TextField, TextFieldInput, TextFieldLabel } from "~/components/ui/text-field"
import DrawerPrimitive from "@corvu/drawer";

export function ResponsiveDialog() {
    const [open, setOpen] = createSignal(false)
    const [isDesktop, setIsDesktop] = createSignal(false)

    onMount(() => {
        setIsDesktop(window.innerWidth >= 768)
    })

    const MobileDialog = () => (
        <DrawerPrimitive contextId={'md1'} dialogId="responsive-drawer-1" open={open()} onOpenChange={setOpen}>
            <DrawerPrimitive.Trigger contextId={'md1'} as={Button<"button">} variant="outline">
                Edit Profile
            </DrawerPrimitive.Trigger>
            <DrawerPrimitive.Content contextId={'md1'}>
                <DrawerHeader class="text-left">
                    <DrawerTitle contextId={'md1'} >Edit profile</DrawerTitle>
                    <DrawerPrimitive.Description contextId={'md1'}>
                        Make changes to your profile here. Click save when you're done.
                    </DrawerPrimitive.Description>
                </DrawerHeader>
                <ProfileForm class="px-4" />
                <DrawerFooter class="pt-2">
                    <DrawerClose contextId={'md1'}  as={Button<"button">} variant="outline">
                        Cancel
                    </DrawerClose>
                </DrawerFooter>
            </DrawerPrimitive.Content>
        </DrawerPrimitive>
    )

    return (
        <Show when={isDesktop()} fallback={<MobileDialog />}>
            <Dialog id="responsive-dialog-1" open={open()} onOpenChange={setOpen}>
                <DialogTrigger as={Button} variant="outline">
                    Edit Profile
                </DialogTrigger>
                <DialogContent class="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <ProfileForm />
                </DialogContent>
            </Dialog>
        </Show>
    )
}

function ProfileForm(props: ComponentProps<"form">) {
    return (
        <form class={cn("grid items-start gap-4", props.class)}>
            <TextField class="grid gap-2">
                <TextFieldLabel>Email</TextFieldLabel>
                <TextFieldInput placeholder="shadcn@example.com" type="email" />
            </TextField>
            <TextField class="grid gap-2">
                <TextFieldLabel>Username</TextFieldLabel>
                <TextFieldInput placeholder="@shadcn" type="text" />
            </TextField>
            <Button type="submit">Save changes</Button>
        </form>
    )
}