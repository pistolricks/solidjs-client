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

export function ResponsiveDrawer() {
    const [open, setOpen] = createSignal(false)
    const [isDesktop, setIsDesktop] = createSignal(false)

    onMount(() => {
        setIsDesktop(window.innerWidth >= 768)
    })

    const MobileDrawer = () => (
        <Drawer breakPoints={[0.75]} dialogId="responsive-drawer-mobile" open={open()} onOpenChange={setOpen}>
            <DrawerTrigger as={Button<"button">} variant="outline">
                Edit Profile
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader class="text-left">
                    <DrawerTitle>Edit profile</DrawerTitle>
                    <DrawerDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DrawerDescription>
                </DrawerHeader>
                <ProfileForm class="px-4" />
                <DrawerFooter class="pt-2">
                    <DrawerClose as={Button<"button">} variant="outline">
                        Cancel
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )

    return (
        <Show when={isDesktop()} fallback={<MobileDrawer />}>
            <Drawer  breakPoints={[0.75]} side={"right"} dialogId="responsive-drawer-desktop" open={open()} onOpenChange={setOpen}>
                <DrawerTrigger as={Button<"button">} variant="outline">
                    Edit Profile
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader class="text-left">
                        <DrawerTitle>Edit profile</DrawerTitle>
                        <DrawerDescription>
                            Make changes to your profile here. Click save when you're done.
                        </DrawerDescription>
                    </DrawerHeader>
                    <ProfileForm class="px-4" />
                    <DrawerFooter class="pt-2">
                        <DrawerClose as={Button<"button">} variant="outline">
                            Cancel
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
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