import { createSignal } from "solid-js"

import { Button } from "~/components/ui/button"
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
import DrawerPrimitive from "@corvu/drawer";

export function BaseDrawer() {
    const [goal, setGoal] = createSignal(250)

    const onClick = (change: number) => {
        setGoal(goal() + change)
    }

    return (
        <DrawerPrimitive contextId={'bd1'} dialogId="base-drawer-1" breakPoints={[0.75]} side={"right"}>
            <DrawerPrimitive.Trigger contextId={'bd1'} as={Button<"button">} variant="outline">
                Open Drawer
            </DrawerPrimitive.Trigger>
            <DrawerPrimitive.Content contextId={'bd1'}>
                <div class="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle contextId={'bd1'}>Move Goal</DrawerTitle>
                        <DrawerDescription contextId={'bd1'}>Set your daily activity goal.</DrawerDescription>
                    </DrawerHeader>
                    <div class="p-4 pb-0">
                        <div class="flex items-center justify-center space-x-2">
                            <Button
                                variant="outline"
                                size="icon"
                                class="size-8 shrink-0 rounded-full"
                                onClick={() => onClick(-10)}
                                disabled={goal() <= 200}
                            >

                                <span class="sr-only">Decrease</span>
                            </Button>
                            <div class="flex-1 text-center">
                                <div class="text-7xl font-bold tracking-tighter">{goal()}</div>
                                <div class="text-[0.70rem] uppercase text-muted-foreground">Calories/day</div>
                            </div>
                            <Button
                                variant="outline"
                                size="icon"
                                class="size-8 shrink-0 rounded-full"
                                onClick={() => onClick(10)}
                                disabled={goal() >= 400}
                            >
                                <span class="sr-only">Increase</span>
                            </Button>
                        </div>
                    </div>
                    <DrawerFooter >
                        <Button>Submit</Button>
                        <DrawerClose contextId={'bd1'} as={Button<"button">} variant="outline">
                            Cancel
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerPrimitive.Content>
        </DrawerPrimitive>
    )
}